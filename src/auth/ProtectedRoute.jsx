import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

// 'children' is being passed as a prop, it's automatically what will be placed between <ProtectedRoute></ProtectedRoute>, here children = <Dashboard />; So { children } in the function parameter is just destructuring that prop — same concept as destructuring { data, error } from Supabase
export default function ProtectedRoute({ children }) {

    const [session, setSession] = useState(undefined)

    // here useEffect is used, the empty array [] at the end means "only run this once when the component first loads" — not on every re-render.
    useEffect(() => {
        // This asks Supabase "is there a currently logged in user?" It returns a Promise, then { data } is destructuring the response, and data.session is either a session object or null
        supabase.auth.getSession().then(({ data }) => {
            // this updates the session variable
            setSession(data.session)
        })
    }, [])

    // then we check the status of the session, and redirect the user if needed
    if (session === undefined) return <p>Loading..</p> && console.log("Loading")
    if (session === null) return <Navigate to='/login' />

    // If session exists → renders the dashboard normally via return children
    return children

}