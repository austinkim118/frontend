import { isAuthenticatedSpotify, authenticateSpotify } from "../utils/api"

export default function Welcome() {
    async function handleClick(event) {
        event.preventDefault()

        const isAuthenticated = await isAuthenticatedSpotify()
        if (isAuthenticated) {
            authenticateSpotify()
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