import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

Deno.serve(async (req) => {
    // create supabase admin client to bypass RLS
    const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )
    // get all tasks where status=pending & check_in_time is in the past
    const {data:tasksData, error:tasksError} = await supabase
    .from("tasks")
    .select("title, user_id")
    .eq("status", "pending")
    .lt("check_in_time", new Date().toISOString())

    if (tasksError || !tasksData.length) {
        console.log("No tasks found:", tasksError?.message)
        return new Response("No tasks found", { status: 200 })
    }

    await supabase
    .from("tasks")
    .update({ status: "missed" })
    .lt("check_in_time", new Date().toISOString())
    .eq("status", "pending")

    const tasksByUser: Record<string, any[]> = {}
    tasksData.forEach(task => {
    if (!tasksByUser[task.user_id]) {
        tasksByUser[task.user_id] = []
    }
    tasksByUser[task.user_id].push(task)
    })
    
    // Looping over each user:
    for (const userId of Object.keys(tasksByUser)) {
    const userTasks = tasksByUser[userId]
    const taskTitles = userTasks.map(t => `<li>${t.title}</li>`).join("")
    
    // fetch doer email, partner email, send both emails here

    // find the partnership to get the partner's user_id
    const { data: partnership, error: partnershipError } = await supabase
        .from("partnerships")
        .select("partner_id")
        .eq("doer_id", userId)
        .eq("status", "accepted")
        .single()

    if (partnershipError || !partnership) {
        console.log("No partnership found:", partnershipError?.message)
        continue
    }

    // get partner's email from profiles
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("email")
        .eq("id", partnership.partner_id)
        .single()

    if (profileError || !profile) {
        console.log("No profile found:", profileError?.message)
        continue
    }
    // get doer's email from profiles
    const { data: doerProfile, error: doerProfileError } = await supabase
        .from("profiles")
        .select("email")
        .eq("id", userId)
        .single()

    if (doerProfileError || !doerProfile) {
        console.log("No profile found:", doerProfileError?.message)
        continue
    }

        // send email via Resend to "Doer"
    const doerRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`
        },
        body: JSON.stringify({
            from: "Accountable <onboarding@resend.dev>",
            to: doerProfile.email,
            subject: "You missed your tasks",
            html: `<p>You missed the following tasks:</p><ul>${taskTitles}</ul>`
        })
    })

    // send email via Resend to "Partner"
    const partnerRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`
        },
        body: JSON.stringify({
            from: "Accountable <onboarding@resend.dev>",
            to: profile.email,
            subject: "Your partner missed their tasks!!",
            html: `<p>Your partner missed the following tasks:</p><ul>${taskTitles}</ul>`
        })
    })

    const doerData = await doerRes.json()
    const partnerData = await partnerRes.json()
    console.log("Doer email response:", doerData)
    console.log("Partner email response:", partnerData)
}

    return new Response("Missed tasks processed", { status: 200 })
})