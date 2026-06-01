import { supabase } from "../supabaseClient"
import { useState, useEffect } from "react"
import Badge from "../components/Badge"
import { useNavigate } from "react-router-dom"
import "starability/starability-css/starability-basic.css"

export default function PartnerDashboard() {
    const [errorMessage, setErrorMessage] = useState("")
    const [partnerTasksData, setPartnerTasksData] = useState([])
    const [expandedTasks, setExpandedTasks] = useState({})
    const [selectedRatings, setSelectedRatings] = useState({})
    const [ratingsMessages, setRatingsMessages] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const handlePartnerTasks = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            const { data: partnershipsData, error: partnershipsError } = await supabase
                .from("partnerships")
                .select("doer_id")
                .eq("partner_id", user.id)

            if (partnershipsError || partnershipsData.length === 0) {
                setErrorMessage("You don't have any partners currently, please add a partner to view their tasks")
                return
            }


            const { data: tasksData, error: tasksError } = await supabase
                .from("tasks")
                .select("title, status, task_key, evidence_path, check_in_time, due_date, actual_check_in_time, score")
                .eq("user_id", partnershipsData[0].doer_id)
            if (tasksError) {
                setErrorMessage("Unable to fetch partner's tasklist, please try again")
                console.log(tasksError.message)
            }

            // tasksData.map() with an async function returns an array of Promises — one per task. Promise.all waits for all of them to resolve before moving on. Without it you'd get an array of unresolved Promises instead of actual data.
            const tasksWithUrls = await Promise.all(tasksData.map(async (task) => {
                if (!task.evidence_path) return task  // no evidence yet, skip
                const { data } = await supabase.storage
                    .from('evidence')
                    .createSignedUrl(task.evidence_path, 3600)
                return { ...task, signedUrl: data?.signedUrl || null }
            }))
            setPartnerTasksData(tasksWithUrls)
        }
        handlePartnerTasks()



    }, [])

    const toggleExpand = (taskKey) => {
        setExpandedTasks(prev => ({
            ...prev,
            [taskKey]: !prev[taskKey]
        }))
    }

    const handleRatings = (e, taskKey) => {
        setSelectedRatings(prev => ({
            ...prev,
            [taskKey]: e.target.value
        }))
        console.log(e.target.value)
    }

    const handleRatingsSubmit = async (e, task) => {
        e.preventDefault()

        const { error: ratingsSubmitError } = await supabase
            .from("tasks")
            .update({ score: +selectedRatings[task.task_key] })
            .eq("task_key", task.task_key)
            .select()

        if (ratingsSubmitError) {
            console.log(ratingsSubmitError.message)
            setRatingsMessages(prev => ({
                ...prev, [task.task_key]: "Unable to submit ratings"
            }))
            return
        } else {
            setRatingsMessages(prev => ({
                ...prev, [task.task_key]: "Ratings Submitted!!"
            }))
        }

        setPartnerTasksData(partnerTasksData.map(t =>
            t.task_key === task.task_key
                ? { ...t, score: +selectedRatings[task.task_key] }
                : t
        ))


    }

    return (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-12 py-12">
            <div className="mb-12">
                <h1 className="font-serif text-5xl font-extrabold tracking-wide">
                    Check your partner's task details here.
                </h1>
                <p className="mt-4 max-w-4xl font-mono text-lg text-zinc-600">
                    Keep them accountable, rate their evidence and help them complete their tasks on time.
                </p>
            </div>
            <button onClick={() => navigate('/dashboard')}
                className="w-full max-w-xs
                        rounded-2xl
                        bg-amber-500
                        px-8
                        py-4
                        mb-8
                        font-extrabold
                        uppercase
                        text-white
                        shadow-[0_4px_0_rgb(74,124,0)]
                        cursor-pointer
                        transition-all
                        hover:bg-amber-400">Go back to Dashboard</button>

            <ul className="space-y-6">
                {partnerTasksData.map((task) => {
                    // gives the 00:00 part
                    const checkInTime = task.check_in_time.slice(11, 16)
                    // gives the entire thing - Mon May 11 2026 00:01:45 GMT+0530 (India Standard Time)
                    const now = new Date()
                    const dueDate = new Date(task.due_date)
                    // gives an integer -2053968306
                    const timeLeft = dueDate - now
                    // gives the time -24
                    const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
                    const actualCheckInTime = task.actual_check_in_time?.slice(11, 16) || null
                    return (
                        <li key={task.task_key}
                            className="
                        rounded-3xl
                            border
                            border-zinc-200
                            bg-white
                            p-6
                            shadow-sm
                            transition-all">
                            {/* Collapsed header — always visible, except in expanded view */}
                            {!expandedTasks[task.task_key] && (
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="min-w-0 flex-1">
                                        <h3
                                            className="text-xl font-bold wrap-break-word"
                                        >
                                            {task.title}
                                        </h3>

                                        <p className="mt-1 text-sm text-zinc-500">
                                            Due: {task.due_date}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge status={task.status} />
                                        <button
                                            onClick={() => toggleExpand(task.task_key)}
                                            className="
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center

                                            cursor-pointer
                                            rounded-full

                                            bg-lime-500
                                            text-xl
                                            font-bold
                                            text-white

                                            shadow-[0_3px_0_rgb(74,124,0)]

                                            hover:bg-lime-400"
                                        >
                                            {expandedTasks[task.task_key] ? "−" : "+"}
                                        </button>
                                    </div>
                                </div>
                            )}
                            {expandedTasks[task.task_key] && (
                                <div className="space-y-6">

                                    {/* Header */}
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-extrabold wrap-break-word">
                                                {task.title}
                                            </h3>

                                            <div className="mt-3 space-y-1 text-zinc-500">
                                                <p>Due: {task.due_date}</p>
                                                <p>Check-in: {checkInTime}</p>

                                                {actualCheckInTime && (
                                                    <p>Submitted: {actualCheckInTime}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">

                                            <Badge status={task.status} />

                                            <button
                                                onClick={() => toggleExpand(task.task_key)}
                                                className="
                                                    flex
                                                    h-10
                                                    w-10
                                                    items-center
                                                    justify-center

                                                    cursor-pointer
                                                    rounded-full
                                                    bg-zinc-300

                                                    text-xl
                                                    font-bold

                                                    transition

                                                    hover:bg-zinc-200"
                                            >
                                                −
                                            </button>

                                        </div>

                                    </div>

                                    {/* Bottom Section */}
                                    <div className="grid gap-6 md:grid-cols-2">

                                        {/* Days Left */}
                                        <div className="rounded-2xl bg-zinc-50 p-6">

                                            <h4 className="mb-3 font-bold">
                                                Task Status
                                            </h4>

                                            {daysLeft > 0 ? (
                                                <p className="text-lg font-semibold text-lime-600">
                                                    {daysLeft} days left
                                                </p>
                                            ) : daysLeft === 0 ? (
                                                <p className="text-lg font-semibold text-amber-500">
                                                    Due today
                                                </p>
                                            ) : (
                                                <p className="text-lg font-semibold text-red-500">
                                                    {Math.abs(daysLeft)} days overdue
                                                </p>
                                            )}

                                        </div>

                                        {/* Evidence */}
                                        <div className="rounded-2xl border border-zinc-200 p-5">
                                            <h4 className="mb-4 text-lg font-bold">
                                                {task.status === "pending" ? "Not checked-in yet" : "Evidence"}
                                            </h4>
                                            {task.status === "checkedIn" && !task.signedUrl && (
                                                <div className="
                                            rounded-xl
                                            bg-amber-50
                                            p-4
                                            text-amber-700">
                                                    No Photo Uploaded Yet
                                                </div>)}
                                            {task.signedUrl && (
                                                <img src={task.signedUrl}
                                                    alt="evidence"
                                                    className="w-full max-w-full max-h-96 rounded-2xl border object-contain" />)}
                                        </div>



                                        {/* Rating Area */}
                                        <div>

                                            {task.score !== null && (
                                                <div className="rounded-2xl bg-lime-50 p-6">

                                                    <h4 className="mb-3 font-bold text-lime-700">
                                                        Your Rating
                                                    </h4>

                                                    <p
                                                        className="starability-result"
                                                        data-rating={task.score}
                                                    >
                                                    </p>

                                                </div>
                                            )}

                                            {task.score == null && task.status === "checkedIn" && (
                                                <div className="rounded-2xl border border-sky-200 bg-sky-50 p-6">

                                                    <h3 className="mb-4 text-lg font-bold text-sky-700">
                                                        Rate This Check-In
                                                    </h3>

                                                    <div
                                                        role="group"
                                                        className="starability-basic "
                                                        onChange={(e) =>
                                                            handleRatings(e, task.task_key)
                                                        }
                                                    >

                                                        <legend className="mb-3">
                                                            Select a rating:
                                                        </legend>

                                                        <input
                                                            type="radio"
                                                            id={`no-rate-${task.task_key}`}
                                                            className="input-no-rate"
                                                            name={`rating-${task.task_key}`}
                                                            defaultChecked
                                                            aria-label="No rating."
                                                        />

                                                        <input
                                                            type="radio"
                                                            id={`rate1-${task.task_key}`}
                                                            name={`rating-${task.task_key}`}
                                                            value="1"
                                                        />
                                                        <label htmlFor={`rate1-${task.task_key}`}>
                                                            1 star
                                                        </label>

                                                        <input
                                                            type="radio"
                                                            id={`rate2-${task.task_key}`}
                                                            name={`rating-${task.task_key}`}
                                                            value="2"
                                                        />
                                                        <label htmlFor={`rate2-${task.task_key}`}>
                                                            2 stars
                                                        </label>

                                                        <input
                                                            type="radio"
                                                            id={`rate3-${task.task_key}`}
                                                            name={`rating-${task.task_key}`}
                                                            value="3"
                                                        />
                                                        <label htmlFor={`rate3-${task.task_key}`}>
                                                            3 stars
                                                        </label>

                                                        <input
                                                            type="radio"
                                                            id={`rate4-${task.task_key}`}
                                                            name={`rating-${task.task_key}`}
                                                            value="4"
                                                        />
                                                        <label htmlFor={`rate4-${task.task_key}`}>
                                                            4 stars
                                                        </label>

                                                        <input
                                                            type="radio"
                                                            id={`rate5-${task.task_key}`}
                                                            name={`rating-${task.task_key}`}
                                                            value="5"
                                                        />
                                                        <label htmlFor={`rate5-${task.task_key}`}>
                                                            5 stars
                                                        </label>

                                                        <div className="mt-14">
                                                            <button
                                                                onClick={(e) =>
                                                                    handleRatingsSubmit(e, task)
                                                                }
                                                                className="rounded-2xl bg-lime-500  px-6 py-3 font-bold text-white shadow-[0_3px_0_rgb(74,124,0)] transition-all hover:bg-lime-400 active:translate-y-0.5 active:shadow-none"
                                                            >
                                                                Submit Rating
                                                            </button>
                                                        </div>

                                                    </div>

                                                </div>
                                            )}

                                        </div>

                                    </div>

                                    {/* Rating Message */}
                                    {ratingsMessages[task.task_key] && (
                                        <div className="rounded-2xl bg-lime-50 p-4">
                                            <p>{ratingsMessages[task.task_key]}</p>
                                        </div>
                                    )}

                                </div>
                            )}

                        </li>
                    )
                })}

                <span>{errorMessage}</span>
            </ul>
        </section>

    )
}