import React from 'react'
import { useNavigate } from 'react-router-dom'
import { isAuthenticatedSpotify, authenticateSpotify } from "../utils/api"

export default function Welcome() {
    const navigate = useNavigate()

    async function handleClick(event) {
        event.preventDefault()

        const isAuthenticated = await isAuthenticatedSpotify()
        console.log(isAuthenticated)
        if (!isAuthenticated) {
            authenticateSpotify()
        } else {
            navigate('/main')
        }
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