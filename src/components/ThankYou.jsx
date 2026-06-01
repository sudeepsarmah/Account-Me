export default function ThankYou({ onClose }) {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">

                <h2 className="mb-4 text-3xl font-extrabold text-lime-500">
                    Thank You!
                </h2>

                <p className="mb-8 font-mono text-zinc-600">
                    Your message has been successfully sent.
                </p>

                <button
                    onClick={onClose}
                    className="
                rounded-2xl
                bg-lime-500
                px-8
                py-3
                font-bold
                text-white
                shadow-[0_4px_0_rgb(74,124,0)]
                hover:bg-lime-400
            "
                >
                    Close
                </button>

            </div>
        </div>
    )
}