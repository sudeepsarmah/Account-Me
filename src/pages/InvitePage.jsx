import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import { useParams, useNavigate } from "react-router-dom"

export default function InvitePage() {
    const [message, setMessage] = useState("")
    const [sentInviteStatus, setSentInviteStatus] = useState("")
    const [partnershipId, setPartnerShipId] = useState("")
    const [isValidInvite, setIsValidInvite] = useState(false)
    const [doerId, setDoerId] = useState(null)

    // If the URL is /invite/abc123, then code will be "abc123"
    const { code } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchInvites = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            // data from select is always an array
            const { data, error } = await supabase
                .from("partnerships")
                .select("*")
                .eq("invite_link", code)
            if (error) {
                setMessage("The request for pending invites could not be fetched, please try again")
                console.log(error.message)
            } else if (data[0].status !== "pending") {
                setMessage("This invite has already been responded to.")
            } else {
                setMessage(`You have an invite from ${data[0].doer_id}`)
                setPartnerShipId(data[0].id)
                setDoerId(data[0].id)
                setIsValidInvite(true)
                const { error: updateError } = await supabase
                    .from('partnerships')
                    .update({ partner_id: user.id })
                    .eq("invite_link", code)
                if (updateError) {
                    console.log("Error setting partner", updateError.message)
                }
            }
        }
        const fetchSentInvites = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            const { data, error } = await supabase
                .from("partnerships")
                .select("*")
                .eq("doer_id", user.id)
            if (error) {
                setSentInviteStatus("Couldn't fetch your sent invite status, please try again")
                console.log(error.message)
            } else {
                setSentInviteStatus(`Your sent invites status: ${data[0].status}`)
            }
        }
        fetchInvites()
        fetchSentInvites()
    }, [code])

    const handleAccept = async () => {
        const { data: { user } } = await supabase.auth.getUser()

        const { data: existing } = await supabase
            .from("partnerships")
            .select("id")
            .eq("doer_id", user.id)

        if (existing.length >= 1) {
            setMessage("You already has a partner")
            return
        }
        const { error } = await supabase
            .from('partnerships')
            .update({ status: "accepted" })
            .eq("id", partnershipId)

        if (error) {
            console.log("Error updating invite status", error.message)
        } else {
            setMessage("You have no pending invites")
            const { error: reverseError } = await supabase
                .from("partnerships")
                .insert({
                    doer_id: user.id,
                    partner_id: doerId,
                    status: "accepted"
                })

            if (reverseError) {
                console.log("Error creating reverse partnership", reverseError.message)
                return
            }
            navigate('/dashboard')
        }
    }

    const handleReject = async () => {

        const { error } = await supabase
            .from('partnerships')
            .update({ status: "rejected" })
            .eq("id", partnershipId)

        if (error) {
            console.log("Error updating invite status", error.message)
        } else {
            setMessage("You have no pending invites")
            navigate('/dashboard')
        }
    }


    return (
        <section class="flex flex-col gap-y-6 items-center">
            <h1 class="font-serif text-5xl font-extrabold text-center mb-4">{message}</h1>
            {isValidInvite && (
                <div class="flex flex-col gap-y-4">
                    <button
                        onClick={handleAccept}
                        class="w-full max-w-sm rounded-2xl px-8 py-4 bg-lime-400 text-md font-extrabold uppercase  text-white shadow-[0_4px_0_rgb(212,212,212)] transition-all active:translate-y-0.5 active:shadow-none cursor-pointer hover:bg-lime-300" >Accept Invite</button>
                    <button
                        onClick={handleReject}
                        class="w-full max-w-sm rounded-2xl px-8 py-4 bg-red-500 text-md font-extrabold uppercase  text-white shadow-[0_4px_0_rgb(212,212,212)] transition-all active:translate-y-0.5 active:shadow-none cursor-pointer hover:bg-red-400" >Reject Invite</button>
                </div>
            )}
            <h2 class="font-serif text-2xl font-bold text-center mb-4">{sentInviteStatus}</h2>
        </section>
    )
}