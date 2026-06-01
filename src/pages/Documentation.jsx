import { useNavigate } from "react-router-dom"
import ContactForm from "../components/ContactForm"

export default function DocumentationBox() {
    const navigate = useNavigate()
    return (
        <>

            <section className="mx-auto max-w-6xl px-12 py-12">

                {/* Hero */}
                <div className="mb-20">
                    <h1 className="mb-6 text-center font-serif text-4xl font-extrabold tracking-wide md:text-7xl">
                        Everything you need to get started.
                    </h1>

                    <p className="mx-auto max-w-4xl text-center text-2xl text-zinc-600">
                        Learn how Account-Me works, discover available features,
                        and stay up to date with upcoming improvements.
                    </p>
                </div>

                {/* How It Works */}
                <div className="mb-24">
                    <h2 className="mb-12 text-4xl font-extrabold text-lime-500">
                        How it works
                    </h2>

                    <div className="space-y-12">

                        <div>
                            <h3 className="mb-3 text-2xl font-bold">
                                1. Create your account
                            </h3>

                            <p className="max-w-4xl font-mono text-lg">
                                Sign up and create your profile to begin your
                                accountability journey.
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-3 text-2xl font-bold">
                                2. Invite a partner
                            </h3>

                            <p className="max-w-4xl font-mono text-lg">
                                Send an invite link to a trusted friend, colleague,
                                or family member who can help keep you accountable.
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-3 text-2xl font-bold">
                                3. Create and complete tasks
                            </h3>

                            <p className="max-w-4xl font-mono text-lg">
                                Add tasks, deadlines, and goals. Your partner can
                                monitor your progress and help you stay on track.
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-3 text-2xl font-bold">
                                4. Build your streak
                            </h3>

                            <p className="max-w-4xl font-mono text-lg">
                                Consistency matters. Complete tasks on time and
                                maintain your streak to develop lasting habits.
                            </p>
                        </div>

                    </div>
                </div>

                {/* Features */}
                <div className="mb-24">
                    <h2 className="mb-12 text-4xl font-extrabold text-lime-500">
                        Current Features
                    </h2>

                    <div className="grid gap-8 md:grid-cols-2">

                        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition duration-400 hover:bg-lime-100">
                            <h3 className="mb-4 text-2xl font-bold">
                                Partner System
                            </h3>

                            <p className="font-mono text-lg">
                                Connect with a trusted accountability partner who
                                can review your progress and encourage consistency.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition duration-400 hover:bg-amber-100">
                            <h3 className="mb-4 text-2xl font-bold">
                                Task Tracking
                            </h3>

                            <p className="font-mono text-lg">
                                Create tasks, set deadlines, and monitor completion
                                status in one place.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition duration-400 hover:bg-sky-100">
                            <h3 className="mb-4 text-2xl font-bold">
                                Accountability Check-ins
                            </h3>

                            <p className="font-mono text-lg">
                                Submit updates and keep your partner informed about
                                your progress.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition duration-400 hover:bg-pink-100">
                            <h3 className="mb-4 text-2xl font-bold">
                                Streak Tracking
                            </h3>

                            <p className="font-mono text-lg">
                                Build momentum through consistency and maintain your
                                task completion streak.
                            </p>
                        </div>

                    </div>
                </div>

                {/* Roadmap */}
                <div className="mb-24">
                    <h2 className="mb-12 text-4xl font-extrabold text-amber-500">
                        Roadmap
                    </h2>

                    <div className="space-y-10 border-l-4 border-amber-300 pl-8">

                        <div>
                            <h3 className="text-2xl font-bold text-amber-500">
                                Version 1.0
                            </h3>

                            <p className="mt-2 font-mono text-lg">
                                User authentication, task creation, partner
                                invitations, and accountability tracking.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-amber-500">
                                Coming Soon
                            </h3>

                            <p className="mt-2 font-mono text-lg">
                                Google Sign-In support for faster onboarding and
                                easier account management.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-amber-500">
                                Planned Features
                            </h3>

                            <p className="mt-2 font-mono text-lg">
                                Notifications, reminders, streak analytics,
                                productivity insights, and enhanced partner tools.
                            </p>
                        </div>

                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <h2 className="mb-8 text-4xl font-extrabold text-lime-500">
                        Ready to start?
                    </h2>

                    <p className="mx-auto mb-10 max-w-3xl font-mono text-lg">
                        Find an accountability partner today and start completing
                        tasks consistently.
                    </p>

                    <button
                        onClick={() => navigate('/signup')}
                        className="
                        w-full max-w-xs
                        rounded-2xl
                        bg-yellow-400
                        px-8
                        py-4
                        text-md
                        font-extrabold
                        uppercase
                        text-zinc-700
                        shadow-[0_4px_0_rgb(212,212,212)]
                        transition-all
                        hover:bg-yellow-300
                        active:translate-y-0.5
                        active:shadow-none
                        cursor-pointer
                    "
                    >
                        Get Started
                    </button>
                </div>

            </section>


            <ContactForm />
        </>
    )
}

