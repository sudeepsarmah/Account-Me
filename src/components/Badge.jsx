import '../styles/Badge.css'
export default function Badge({ status }) {
    const colors = {
        checkedIn: "bg-lime-100 text-lime-700",
        pending: "bg-amber-100 text-amber-700",
        missed: "bg-red-100 text-red-700",
    }
    return (
        <span
            className={`rounded-full px-4 py-2 text-sm font-bold ${colors[status]}`}
        >
            {status}
        </span>
    )
}