import { supabase } from "../supabaseClient"
import { useEffect, useState } from "react"


export default function StatsBar({ refreshKey }) {

    const [currentStreak, setCurrentStreak] = useState(0)
    const [longestStreak, setLongestStreak] = useState(0)
    const [completedOnTime, setCompletedOnTime] = useState(0)
    const [pendingCount, setPendingCount] = useState(0)


    useEffect(() => {
        const calculateStreak = async () => {

            const { data: { user } } = await supabase.auth.getUser()


            const { data: tasksData, error: tasksError } = await supabase
                .from("tasks")
                .select("status, check_in_time, actual_check_in_time, due_date")
                .eq("user_id", user.id)

            if (tasksError || !tasksData.length) {
                console.log("No tasks found:", tasksError?.message)
                return
            }

            // simple stats
            setPendingCount(tasksData.filter(t => t.status === "pending").length)
            setCompletedOnTime(tasksData.filter(t => t.status === "checkedIn" && t.actual_check_in_time <= t.check_in_time).length)

            // streak calculation — use relevantTasks (past tasks only)
            // const now = new Date().toISOString()
            const relevantTasks = tasksData.filter(t =>
                t.status === "checkedIn" &&
                t.actual_check_in_time !== null &&
                t.actual_check_in_time <= t.check_in_time)

            // group tasks by date
            // each key is a date string like "2026-06-20"
            // each value os an array of tasks on that date
            const tasksByDate = {}
            relevantTasks.forEach(task => {
                const date = task.actual_check_in_time.slice(0, 10)
                if (!tasksByDate[date]) tasksByDate[date] = []
                tasksByDate[date].push(task)
            })
            // for each date, determine if it was a "good" day or "bad" day
            // good = all tasks checked in on time
            // bad = any task missed or checked in late
            const dayResults = {}
            Object.keys(tasksByDate).forEach(date => {
                dayResults[date] = true
            })

            // sort dates in descending order (newest first)
            const sortedDates = Object.keys(dayResults).sort((a, b) => b.localeCompare(a))

            // calculate current streak
            // walk backwards through dates that had tasks
            // stop when we hit a bad day
            let current = 0
            for (const date of sortedDates) {
                if (dayResults[date]) {
                    current++
                } else {
                    break
                }
            }
            setCurrentStreak(current)

            // calculate longest streak
            // walk through all dates in ascending order
            // track the longest unbroken run of good days
            const ascendingDates = [...sortedDates].reverse()
            let longest = 0
            let runningStreak = 0
            for (const date of ascendingDates) {
                if (dayResults[date]) {
                    runningStreak++
                    if (runningStreak > longest) longest = runningStreak
                } else {
                    runningStreak = 0
                }
            }
            setLongestStreak(longest)
        }
        calculateStreak()
    }, [refreshKey])



    return (
        <>
            <div className="mb-12 grid grid-cols-2 gap-6">
                <div className="rounded-2xl bg-white p-6 shadow-sm border">
                    <h3 className="text-sm uppercase text-zinc-500">
                        Current Streak
                    </h3>

                    <p className="mt-2 text-4xl font-extrabold text-lime-500">
                        {currentStreak}
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm border">
                    <h3 className="text-sm uppercase text-zinc-500">
                        Best Streak
                    </h3>

                    <p className="mt-2 text-4xl font-extrabold text-sky-500">
                        {longestStreak}
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm border">
                    <h3 className="text-sm uppercase text-zinc-500">
                        Completed
                    </h3>

                    <p className="mt-2 text-4xl font-extrabold text-amber-500">
                        {completedOnTime}
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm border">
                    <h3 className="text-sm uppercase text-zinc-500">
                        Pending
                    </h3>

                    <p className="mt-2 text-4xl font-extrabold text-red-500">
                        {pendingCount}
                    </p>
                </div>
            </div >
        </>
    )
}