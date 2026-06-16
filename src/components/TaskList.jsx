import Badge from "./Badge"
import { useState } from "react"
import '../styles/Tasklist.css'
import "starability/starability-css/starability-basic.css"

export default function TaskList({ tasks, onCheckIn, taskMessages }) {

    const [selectedFiles, setSelectedFiles] = useState({})
    const [expandedTasks, setExpandedTasks] = useState({})

    const handleImageUpload = (e, taskKey) => {
        // [taskKey] with square brackets — this is computed property syntax. It uses the value of taskKey as the key, not the literal string "taskKey"
        setSelectedFiles({ ...selectedFiles, [taskKey]: e.target.files[0] })
    }

    const toggleExpand = (taskKey) => {
        setExpandedTasks(prev => ({
            ...prev,
            [taskKey]: !prev[taskKey]
        }))
    }
    return (
        <ul className="space-y-6 mb-8" id="task-list">
            {/* We already have a state variable called 'tasks' and so the parameter needs to be renamed to task (singular) */}
            {tasks.map((task) => {
                // tasks is an array so tasks.check_in_time is undefined — you can't call .slice() on it. This calculation needs to happen inside the .map() for each individual task object.
                const checkInTime = task.check_in_time.slice(11, 16)
                const dueDate = new Date(task.due_date)
                const today = new Date()
                // Zero out time components for a pure date comparison
                dueDate.setHours(0, 0, 0, 0)
                today.setHours(0, 0, 0, 0)
                const timeLeft = dueDate - today
                const daysLeft = Math.round(timeLeft / (1000 * 60 * 60 * 24))
                return (
                    /* Multiple id attributes on repeated elements is incorrect - id is meant to be unique on a page — only one element should have a given id. Since you're rendering multiple tasks, you'll end up with multiple elements sharing */

                    <li
                        key={task.task_key}
                        className="
                        rounded-3xl
                        border
                        border-zinc-200
                        bg-white
                        p-6
                        shadow-sm
                        transition-all
                        hover:border-zinc-600
                        "
                    >

                        {/* Compact View */}
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
                                        rounded-full
                                        bg-lime-500
                                        text-xl
                                        font-bold
                                        text-white

                                        shadow-[0_3px_0_rgb(74,124,0)]

                                        transition-all

                                        hover:bg-lime-400
                                        active:translate-y-0.5
                                        active:shadow-none
                                        cursor-pointer
                        "
                                    >
                                        +
                                    </button>
                                </div>

                            </div>
                        )}

                        {/* Expanded View */}
                        {expandedTasks[task.task_key] && (
                            <div className="space-y-6">

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-extrabold wrap-break-word">
                                            {task.title}
                                        </h3>

                                        <p className="mt-2 text-zinc-500">
                                            Due: {task.due_date}
                                        </p>

                                        <p className="text-zinc-500">
                                            Check-in: {checkInTime}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">

                                        <Badge status={task.status} />

                                        <button
                                            onClick={() =>
                                                toggleExpand(task.task_key)
                                            }
                                            className="
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center

                                            rounded-full
                                            bg-zinc-300

                                            text-xl
                                            font-bold
                                            
                                            transition

                                            hover:bg-zinc-200
                                            cursor-pointer
            "
                                        >
                                            −
                                        </button>

                                    </div>

                                </div>

                                <div className="rounded-2xl bg-zinc-50 p-4">

                                    {daysLeft > 0 ? (
                                        <p className="font-semibold text-lime-600">
                                            {daysLeft} days left
                                        </p>
                                    ) : daysLeft === 0 ? (
                                        <p className="font-semibold text-amber-500">
                                            Due today
                                        </p>
                                    ) : (
                                        <p className="font-semibold text-red-500">
                                            {Math.abs(daysLeft)} days overdue
                                        </p>
                                    )}

                                </div>

                                {task.signedUrl && (
                                    <div>
                                        <h4 className="mb-3 font-bold">
                                            Latest Evidence
                                        </h4>

                                        <img
                                            src={task.signedUrl}
                                            alt="evidence"
                                            className="w-full max-w-full max-h-96 rounded-2xl border object-contain"
                                        />
                                    </div>
                                )}

                                <div className="rounded-2xl border border-zinc-200 p-4">

                                    <label
                                        htmlFor={`file-${task.task_key}`}
                                        className="
                                        flex
                                        cursor-pointer
                                        flex-col
                                        items-center
                                        justify-center

                                        rounded-2xl
                                        border-2
                                        border-dashed
                                        border-sky-300

                                        bg-sky-50

                                        px-6
                                        py-8

                                        text-center

                                        transition-all

                                        hover:border-sky-500
                                        hover:bg-sky-100
                                    "
                                    >
                                        <span className="mb-2 text-lg font-bold text-sky-700">
                                            Upload Evidence
                                        </span>

                                        <span className="text-sm text-zinc-500">
                                            Click here to select an image
                                        </span>

                                        {selectedFiles[task.task_key] && (
                                            <img
                                                src={URL.createObjectURL(
                                                    selectedFiles[task.task_key]
                                                )}
                                                alt="preview"
                                                className="
                                                mt-4
                                                max-h-48
                                                rounded-2xl
                                                border
                                                object-cover
                                            "
                                            />
                                        )}
                                    </label>

                                    <input
                                        type="file"
                                        id={`file-${task.task_key}`}
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleImageUpload(e, task.task_key)
                                        }
                                        className="hidden"
                                    />

                                    <button
                                        onClick={() =>
                                            onCheckIn(task, selectedFiles)
                                        }
                                        className="
                                        rounded-2xl
                                        bg-sky-500
                                        px-6
                                        py-3
                                        mt-4

                                        font-bold
                                        text-white

                                        shadow-[0_3px_0_rgb(3,105,161)]

                                        transition-all

                                        hover:bg-sky-400
                                        active:translate-y-0.5
                                        active:shadow-none

                                        cursor-pointer
                        "
                                    >
                                        Check In
                                    </button>

                                </div>

                                {task.score !== null && (
                                    <div className="rounded-2xl bg-amber-50 p-4">

                                        <h3 className="mb-2 font-bold">
                                            Partner Rating
                                        </h3>

                                        <p
                                            className="starability-result"
                                            data-rating={task.score}
                                        >
                                        </p>

                                    </div>
                                )}

                                {taskMessages[task.task_key] && (
                                    <div className="rounded-2xl bg-lime-50 p-4">
                                        <p>{taskMessages[task.task_key]}</p>
                                    </div>
                                )}

                            </div>
                        )}
                    </li>
                )
            })}
        </ul >
    )

    // wrong version

    //     <>
    //         {tasks.map((task) => {
    //             const checkInTime = task.check_in_time.slice(11, 16)
    //             return (
    //                     <p className="task-title" >Task Title - {task.title}</p>
    //                     <p className="task-due-date">Task Due Date - {task.due_date}</p>
    //                     <p className="task-checkIn-time">Task Check In Time - {checkInTime}</p>
    //                 </ul>
    //             )
    //         })}
    //     </>
    // The key is in the wrong place, putting key on <ul> but React is seeing the <ul> elements as children of the fragment <> in TaskList — so the key needs to be on the outermost element returned by the map, which in our case should be a <div> or the <ul> itself.
    // Actually the real issue is structural — using <ul> inside a map and putting <li> items for each field inside it is semantically wrong. Each task should be a single list item, not a whole new list.

}