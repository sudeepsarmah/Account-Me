import { NavLink, useNavigate } from "react-router-dom"
import inviteScreenshot from "../assets/InviteScreenshot.png"
import tasksRating from "../assets/TasksRating.png"
import streaks from "../assets/Streaks.png"

export default function LandingPage() {
    const navigate = useNavigate()

    return (
        <>
            <section className="flex flex-col px-4 py-8 md:px-24 md:py-12">
                <div className=" mb-4 ">
                    <h1 className="mb-6 text-center font-serif text-4xl font-extrabold tracking-wide md:text-7xl">It's easier when we have someone looking out for us.</h1>
                    <div className="flex flex-col gap-8 md:flex-row md:justify-between">
                        <p className="flex items-center italic text-center text-lg md:max-w-164 md:px-8 md:text-3xl md:font-semibold">Having difficulty finishing your tasks? Can't find to hold yourself accountable? Long list of pending tasks?</p>
                        <div>
                            <h2 className="mb-4 text-center text-2xl md:px-8 md:text-2xl">Find yourself a partner today to keep yourself held accountable today.</h2>
                            <div className="flex flex-col items-center gap-y-6 mb-8">
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="w-full max-w-xs rounded-2xl px-8 py-4 bg-lime-500 text-md font-extrabold uppercase  text-white shadow-[0_4px_0_rgb(74,124,0)] transition-all active:translate-y-0.5 active:shadow-none cursor-pointer hover:bg-lime-400">
                                    Find yourself a partner</button>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="w-full max-w-xs rounded-2xl px-8 py-4 bg-zinc-200 text-md font-extrabold uppercase  text-zinc-900 shadow-[0_4px_0_rgb(212,212,212)] transition-all active:translate-y-0.5 active:shadow-none cursor-pointer hover:bg-zinc-100">
                                    I already have an account</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-12 py-12">

                    {/* Feature 1 */}
                    <div className="grid grid-cols-1 gap-8 items-center py-12 lg:grid-cols-2">

                        <img
                            className="block w-full max-w-70 sm:max-w-sm mx-auto rounded-2xl shadow-lg object-contain"
                            src={inviteScreenshot}
                            alt="screenshot1"
                        />

                        <div className="text-2xl sm:text-3xl font-extrabold text-lime-500 wrap-break-word">

                            <h3 className="max-w-full px-4 text-center lg:text-left">
                                Ask your friend to be your helper.
                            </h3>

                            <p className="mt-6 text-zinc-900 md:text-lg leading-relaxed wrap-break-word font-mono">
                                Send your friend an invite link, ask them to accept, once they do,
                                they can track your tasks, help you get through the rough phases
                                and finally finish all your tasks on time.
                            </p>

                        </div>

                    </div>

                    {/* Feature 2 */}
                    <div className="grid grid-cols-1 gap-8 items-center py-12 lg:grid-cols-2">

                        <div className="text-2xl sm:text-3xl font-extrabold text-lime-500 wrap-break-word">

                            <h3 className="max-w-full px-4 text-center lg:text-left">
                                Get rated on your tasks after you check-in.
                            </h3>

                            <p className="mt-6 text-zinc-900 md:text-lg leading-relaxed wrap-break-word font-mono">
                                Your partners get notified if you completed your task on time
                                (or if you missed it), get marks for your tasks and look to
                                improve over time.
                            </p>

                        </div>

                        <img
                            className="block w-full max-w-70 sm:max-w-sm mx-auto rounded-2xl shadow-lg object-contain"
                            src={tasksRating}
                            alt="screenshot2"
                        />

                    </div>

                    {/* Feature 3 */}
                    <div className="grid grid-cols-1 gap-8 items-center py-12 lg:grid-cols-2">

                        <img
                            className="block w-full max-w-70 sm:max-w-sm mx-auto rounded-2xl shadow-lg object-contain"
                            src={streaks}
                            alt="screenshot3"
                        />

                        <div className="text-2xl sm:text-3xl font-extrabold text-lime-500 wrap-break-word">

                            <h3 className="max-w-full px-4 text-center lg:text-left">
                                Earn and maintain your streak!!
                            </h3>

                            <p className="mt-6 text-zinc-900 md:text-lg leading-relaxed wrap-break-word font-mono">
                                Complete on time and don't miss a day, otherwise your streak
                                will be lost in the abyss.
                            </p>

                        </div>

                    </div>

                </div>
                <h2 className="text-center text-3xl font-extrabold text-lime-500 md:text-4xl">Start your journey today and slash tasks on time.</h2>
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full max-w-xs rounded-2xl px-8 py-4 bg-yellow-400 text-md font-extrabold uppercase  text-zinc-700 shadow-[0_4px_0_rgb(212,212,212)] transition-all active:translate-y-0.5 active:shadow-none cursor-pointer hover:bg-yellow-300">
                        Get started</button>
                </div>

            </section>
        </>
    )
}