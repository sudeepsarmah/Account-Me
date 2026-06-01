import { format } from 'date-fns'
import { FaGithub, FaBook } from "react-icons/fa"

export default function Footer() {
    const year = format(new Date(), "yyyy")


    return (
        <footer className="mt-16 border-t bg-sky-100">

            <div
                className="
                    mx-auto
                    flex
                    max-w-6xl
                    flex-col
                    items-center
                    justify-between
                    gap-6

                    px-4
                    py-6

                    md:flex-row
                    md:px-12
                "
            >

                <div className="text-center md:text-left">
                    <h4 className="font-semibold text-slate-800">
                        © {year} Sudeepta Sarmah
                    </h4>

                    <p className="text-sm text-zinc-500">
                        Account-Me
                    </p>
                </div>

                <div className="flex items-center gap-6">

                    <a
                        href="https://github.com/sudeepsarmah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            flex
                            items-center
                            gap-2

                            text-zinc-700

                            transition

                            hover:text-sky-600
                        "
                    >
                        <FaGithub size={18} />
                        Github
                    </a>

                    <a
                        href="https://github.com/sudeepsarmah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            flex
                            items-center
                            gap-2

                            text-zinc-700

                            transition

                            hover:text-sky-600
                        "
                    >
                        <FaBook size={18} />
                        Portfolio
                    </a>

                </div>

            </div>

        </footer>
    )
}