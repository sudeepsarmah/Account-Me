import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

Deno.serve(async (req) => {
    const payload = await req.json()
    const task = payload.record

    // only run when status changes to checkedIn
    if (task.status !== "checkedIn") {
        return new Response("Not a check-in event", { status: 200 })
    }

    // create supabase admin client to bypass RLS
    const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    // find the partnership to get the partner's user_id
    const { data: partnership, error: partnershipError } = await supabase
        .from("partnerships")
        .select("partner_id")
        .eq("doer_id", task.user_id)
        .eq("status", "accepted")
        .single()

    if (partnershipError || !partnership) {
        console.log("No partnership found:", partnershipError?.message)
        return new Response("No partnership found", { status: 200 })
    }

    // get partner's email from profiles
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("email")
        .eq("id", partnership.partner_id)
        .single()

    if (profileError || !profile) {
        console.log("No profile found:", profileError?.message)
        return new Response("No profile found", { status: 200 })
    }

    // send email via Resend
    const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Deno.env.get("RESEND_API_KEY")}`
        },
        body: JSON.stringify({
            from: "Accountable <onboarding@resend.dev>",
            to: profile.email,
            subject: "Your partner just checked in!",
            html: `<p>Your partner has checked in on their task: <strong>${task.title}</strong></p>`
        })
    })

    const data = await res.json()
    console.log("Resend response:", data)

    return new Response(JSON.stringify(data), { status: 200 })
})