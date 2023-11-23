import React, { useState } from "react"
import { isAuthenticatedSpotify, authenticateSpotify, getCsrfToken, getSpotifyTokens } from "../utils/api"

export default function Welcome() {
    const [status, setStatus] = useState(false)

    async function handleClick(event) {
        event.preventDefault()

        await authenticateSpotify()

        // setStatus(isAuthenticatedSpotify())

        // if (!status) {
        //     authenticateSpotify()
        // }
    }

    return (
        <div className="welcome-container">
            <h1>Welcome!</h1>
            <button onClick={handleClick}>
                Start Session
            </button>
        </div>
    )
}