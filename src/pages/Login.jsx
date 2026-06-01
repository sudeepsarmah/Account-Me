import { useState } from "react"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"


export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const navigate = useNavigate()

    const updateEmail = (e) => {
        setEmail(e.target.value)
    }
    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // here the authentication method is "signInWithPassword" since this is a login page, so the user has to enter the email and password he entered while creating the account
        const { error } = await supabase.auth.signInWithPassword({ email, password })
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
                <h1 className="text-center font-serif text-3xl font-extrabold md:text-5xl">
                    Please enter your login details below
                </h1>

                <p className="mt-4 mb-10 text-center text-zinc-600 md:text-lg">
                    Continue your accountability journey.
                </p>
                <form className="flex flex-col items-center gap-y-4" onSubmit={handleSubmit}>
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
                    <button type="submit"
                        className="w-full max-w-sm rounded-2xl px-8 py-4 bg-lime-400 text-md font-extrabold uppercase  text-white shadow-[0_4px_0_rgb(212,212,212)] transition-all active:translate-y-0.5 active:shadow-none cursor-pointer hover:bg-lime-300">Login</button>
                </form>
                <div className="flex flex-col items-center mt-4">
                    <button
                        onClick={() => navigate('/signup')}
                        className="w-full max-w-sm rounded-2xl px-8 py-4 bg-indigo-500 text-md font-extrabold uppercase  text-white shadow-[0_4px_0_rgb(212,212,212)] transition-all active:translate-y-0.5 active:shadow-none cursor-pointer hover:bg-indigo-400">Create a new account</button>
                    {message && <p>{message}</p>}
                </div>
            </section>
        </>
    )
}