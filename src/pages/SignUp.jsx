import { useState } from "react"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"

export default function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    const [username, setUsername] = useState("")

    const updateEmail = (e) => {
        setEmail(e.target.value)
    }
    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    const updateUsername = (e) => {
        setUsername(e.target.value)
    }

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { username } }
        })
        // proper way to write the above LOC
        //  const { data, error } = await supabase.auth.signUp({ email, password })
        // to immediately grab the user's ID after signup and store it somewhere, or redirect them
        // instead of writing
        // const result = await supabase.auth.signUp({ email, password });
        // const data = result.data;
        // const error = result.error;
        // we destruct it in a single line
        // destructuring — it's just a shorthand way of pulling both values out of that object in one line
        if (error) {
            setMessage(error.message);
        } else {
            setMessage("Login successful!");
            navigate("/dashboard")
        }
    }

    return (
        <>
            <section className="mx-auto max-w-2xl px-4 py-8 md:px-8 md:py-12">
                <h1 className="mb-4 text-center font-serif text-3xl font-extrabold md:text-5xl">
                    Create a new account today
                </h1>
                <p className="mb-10 text-center text-zinc-600 md:text-lg">
                    Start your accountability journey and achieve your goals.
                </p>
                <form className="flex flex-col items-center gap-y-4" onSubmit={handleSubmit}>
                    <input type="text"
                        placeholder="Please enter a username"
                        value={username}
                        onChange={updateUsername}
                        id="username"
                        required
                        className="w-full max-w-sm border-2 rounded-2xl border-zinc-300 px-5 py-3 text-lg font-medium outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100" />
                    <input type="email"
                        placeholder="Please enter your email"
                        value={email}
                        onChange={updateEmail}
                        id="email"
                        required
                        className="w-full max-w-sm border-2 rounded-2xl border-zinc-300 px-5 py-3 text-lg font-medium outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100" />
                    <input type="password"
                        value={password}
                        onChange={updatePassword}
                        id="password"
                        placeholder="Password"
                        required
                        className="w-full max-w-sm border-2 rounded-2xl border-zinc-300 px-5 py-3 text-lg font-medium outline-none transition-all focus:border-sky-400 focus:ring-4 focus:ring-sky-100" />
                    <button
                        type='submit'
                        className="w-full max-w-sm rounded-2xl px-8 py-4 bg-indigo-500 text-md font-extrabold uppercase  text-white shadow-[0_4px_0_rgb(212,212,212)] transition-all active:translate-y-0.5 active:shadow-none cursor-pointer hover:bg-indigo-400">Submit</button>
                </form>
                <div className="flex flex-col items-center mt-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full max-w-sm rounded-2xl px-8 py-4 bg-lime-400 text-md font-extrabold uppercase  text-white shadow-[0_4px_0_rgb(212,212,212)] transition-all active:translate-y-0.5 active:shadow-none cursor-pointer hover:bg-lime-300">
                        I already have an account</button>
                </div>

                {message && <p>{message}</p>}
            </section>
        </>
    )
}