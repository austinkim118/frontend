import React, { useState, useEffect } from "react"
import { getCsrfToken, createPlaylist } from "../utils/api"

export default function Main() {
    // fetch CSRF Token from backend to make POST requests
    const [csrfToken, setCsrfToken] = useState("")

    useEffect(() => {
        async function fetchCsrfToken() {
            const token = await getCsrfToken()
            setCsrfToken(token)
        }

        fetchCsrfToken()
    }, [])

    // STATES
    const [formData, setFormData] = useState({
        minutes: "", 
        seconds: "", 
        genre: ""
    })
    const [errorMessage, setErrorMessage] = useState("")
    const [playlistUrl, setPlaylistUrl] = useState("")

    // update user inputs
    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    // Check if User input is valid -- all fields filled
    function isFormDataValid(formData) {
        const { genre, minutes, seconds } = formData
        if (!genre || !minutes || !seconds) {
            displayError('Please fill in the required fields')
            return false
        }
        return true
    }

    function displayError(errorMessage) {
        setErrorMessage(errorMessage)

        // Set a timeout to remove the error message after a certain duration (e.g., 5 seconds)
        setTimeout(() => {      // built-in function --> syntax = setTimeout(function, delay) --> 
                                // function - function to be executed after specified delay (in miliseconds, 1000 = 1sec) 
            setErrorMessage("")
        }, 2000)
    }

    // 
    async function handleSubmit(event) {
        event.preventDefault()
        // this prevents web to refresh as default

        if (isFormDataValid(formData)) {
            try {
                const newPlaylistUrl = await createPlaylist();
                
                // Update playlistUrl using the callback form of setPlaylistUrl
                setPlaylistUrl(prevUrl => {
                    console.log("New playlist:", newPlaylistUrl);
                    return newPlaylistUrl;
                });
            } catch (error) {
                console.error("Error creating playlist:", error);
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="main-container">
                <h1>My First Project</h1>
                <label htmlFor="genre">Which genre(s) do you want to explore?</label>
                <br />
                <select 
                    id="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    name="genre"
                >
                    <option value="">--Choose Genre--</option>
                    <option value="hiphop">Hip-Hop</option>
                    <option value="kpop">K-Pop</option>
                    <option value="classical">Classical</option>
                    <option value="jazz">Jazz</option>
                </select>
                <div>
                    <label htmlFor="time">Set Time</label>
                    <br />
                    <input 
                        type="text"
                        id="time"
                        placeholder="Minutes"
                        onChange={handleChange}
                        name="minutes"
                        value={formData.minutes}
                        autoComplete="off"  // If on, when click on input box, previous inputs pop up as suggestions or autofill
                    />
                    <input 
                        type="text"
                        placeholder="Seconds"
                        onChange={handleChange}
                        name="seconds"
                        value={formData.seconds}
                        autoComplete="off"
                    />
                </div>
                {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
                <button>Create Playlist</button>
            </form>
            {playlistUrl && <button onClick={() => window.location.href = playlistUrl}>Play on Spotify</button>}
        </div>
    )
}
