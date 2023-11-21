import React, { useState } from "react"
import { isAuthenticatedSptify, authenticateSpotify } from "./api"

export default function Welcome() {
    const [status, setStatus] = useState(false)

    function handleClick(event) {
        event.preventDefault()

        authenticateSpotify()

        // setStatus(isAuthenticatedSptify())

        // if (status) {
        //     authenticateSpotify()
        // }
    }

    return (
        <div>
            <h1>Welcome!</h1>
            <button onClick={handleClick}>
                Start Session
            </button>
        </div>
    )
}