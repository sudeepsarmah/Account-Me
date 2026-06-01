import { useState, useRef } from "react"
import ThankYou from "./ThankYou"
import ReCAPTCHA from "react-google-recaptcha"

export default function ContactForm() {
    const [showModal, setShowModal] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const recaptchaRef = useRef(null)
    const [text, setText] = useState("")
    const maxChars = 250

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        if (form["bot-field"].value) return

        const token = recaptchaRef.current.getValue()
        if (!token) {
            alert("Please complete the reCAPTCHA")
            return
        }
        const formData = new FormData(form)
        formData.append("g-recaptcha-response", token)

        try {
            const res = await fetch("https://formspree.io/f/mwvzzjbn", {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            })

            if (res.ok) {
                form.reset()
                setShowModal(true)
                setIsVerified(false)
                recaptchaRef.current.reset()
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                })
            } else {
                alert("Something went wrong, please try again.")
            }
        } catch (err) {
            console.error("Form submission error:", err)
            alert("Submission failed. Please try again later.")
        }
    }



    return (
        <>
            <section className="mt-24 border-t border-zinc-200 py-20">
                <div className="mx-auto max-w-3xl px-8">

                    {/* Heading */}
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-5xl font-extrabold text-lime-500">
                            Feedback & Ideas
                        </h2>

                        <p className="font-mono text-lg text-zinc-600">
                            Found a bug? Have a feature request? Want to suggest
                            an improvement? We'd love to hear from you.
                        </p>
                    </div>
                    {/* Form */}
                    <form
                        id="contactForm"
                        method="POST"
                        onSubmit={onSubmit}
                        className="space-y-6"
                    >
                        {/* Honeypot */}
                        <input
                            type="text"
                            name="bot-field"
                            style={{ display: "none" }}
                        />

                        {/* Name */}
                        <div>
                            <label
                                htmlFor="firstName"
                                className="mb-2 block text-lg font-bold text-zinc-700"
                            >
                                Name
                            </label>

                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                required
                                placeholder="Your name"
                                className="
                                w-full
                                rounded-2xl
                                border-2
                                border-zinc-300
                                bg-white
                                px-5
                                py-4
                                text-lg
                                outline-none
                                transition-all

                                focus:border-sky-400
                                focus:ring-4
                                focus:ring-sky-100
                            "
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label
                                htmlFor="message"
                                className="mb-2 block text-lg font-bold text-zinc-700"
                            >
                                Message
                            </label>

                            <textarea
                                maxLength={maxChars}
                                value={text}
                                onChange={handleChange}
                                name="message"
                                id="message"
                                rows="6"
                                required
                                placeholder="Tell us about a bug, feature idea, or feedback..."
                                className="
                                w-full
                                resize-none
                                rounded-2xl
                                border-2
                                border-zinc-300
                                bg-white
                                px-5
                                py-4
                                text-lg
                                outline-none
                                transition-all

                                focus:border-sky-400
                                focus:ring-4
                                focus:ring-sky-100
                            "
                            />
                        </div>
                        <div className="flex justify-center">
                            <ReCAPTCHA
                                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                onChange={() => setIsVerified(true)}
                                onExpired={() => setIsVerified(false)}
                                ref={recaptchaRef}
                            /></div>



                        {/* Character Counter */}
                        <div className="flex justify-end">
                            <p className="font-semibold text-zinc-500">
                                <span
                                    className={
                                        maxChars - text.length < 25
                                            ? "font-bold text-red-500"
                                            : "font-bold text-amber-500"
                                    }
                                >
                                    {maxChars - text.length}
                                </span>{" "}
                                characters remaining
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center pt-4">
                            <button
                                type="submit"
                                disabled={!isVerified}
                                className="
                                w-80
                                rounded-2xl
                                bg-lime-500
                                px-8
                                py-4

                                text-md
                                font-extrabold
                                uppercase
                                text-white

                                shadow-[0_4px_0_rgb(74,124,0)]

                                transition-all

                                hover:bg-lime-400
                                active:translate-y-0.5
                                active:shadow-none

                                disabled:cursor-not-allowed
                                disabled:opacity-50

                                cursor-pointer
                            "
                            >
                                Send Feedback
                            </button>
                        </div>
                    </form>

                    {/* Thank You Modal */}
                    {showModal && (
                        <ThankYou
                            onClose={() => setShowModal(false)}
                        />
                    )}
                </div>
            </section>
        </>
    )
}
