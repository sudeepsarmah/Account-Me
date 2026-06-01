import { NavLink } from "react-router-dom"
import { FaGithub, FaBook } from "react-icons/fa"

export default function Navbar() {
    return (
        <nav className="border-b bg-white">

            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-12">

                {/* Brand */}
                <NavLink
                    to="/"
                    end
                    className="
                        font-serif
                        text-2xl
                        font-extrabold
                        tracking-tight
                        text-slate-900
                        md:text-4xl
                    "
                >
                    Account<span className="text-lime-500">-Me</span>
                </NavLink>

                {/* Navigation */}
                <div className="flex items-center gap-6 md:gap-10">

                    <a
                        href="https://github.com/sudeepsarmah/Account-Me"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            flex items-center gap-2
                            text-sm md:text-lg
                            font-semibold
                            text-zinc-500
                            transition-all
                            hover:text-zinc-900"
                    >
                        <FaGithub size={18} />
                        <span className="hidden md:inline">Github</span>
                    </a>

                    <NavLink
                        to="/documentation"
                        className={({ isActive }) =>
                            `
                            flex items-center gap-2
                            text-sm md:text-lg
                            font-semibold
                            transition-all
                            ${isActive
                                ? "text-sky-500"
                                : "text-zinc-500 hover:text-zinc-900"
                            }
                        `
                        }
                    >
                        <FaBook size={18} />
                        <span className="hidden md:inline">Documentation</span>
                    </NavLink>

                </div>

            </div>

        </nav>
    )
}