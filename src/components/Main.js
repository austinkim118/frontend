import React, { useState, useEffect } from "react"
import { getCsrfToken, createPlaylist, getUsername } from "../utils/api"
import '../styles/main.css'
import Navbar from './Navbar'

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

    const [username, setUsername] = useState("")

    useEffect(() => {
        async function fetchUsername() {
            const username = await getUsername()
            setUsername(username)
        }

        fetchUsername()
    }, [])

    // STATES
    const defaultFormData = {
        minutes: "",
        seconds: "",
        genre: ""
    };

    const [formData, setFormData] = useState(defaultFormData)
    const [errorMessage, setErrorMessage] = useState("")
    const [playlistUrl, setPlaylistUrl] = useState("")
    const [isButtonClicked, setIsButtonClicked] = useState(false)

    // reset Form data
    function resetFormData() {
        setFormData(defaultFormData)
    }

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
        if (!genre || !minutes) {
            displayError('Please fill in the required fields')
            return false
        } else if (!Number(minutes) || Number(minutes) > 60) {
            displayError('Invalid input. Please try again')
            resetFormData()
            return false
        } else if (Number(seconds) !== 0 && Number(seconds) > 60) {
            displayError('Invalid input. Please try again')
            resetFormData()
            return false
        } else if (Number(minutes) <= 5) {
            displayError('Playlist must be longer than 5 minutes')
            resetFormData()
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

        if (!isButtonClicked) {
            if (isFormDataValid(formData)) {
                try {
                    const { minutes, seconds } = formData
                    const duration = Number(minutes) * 60000 + Number(seconds) * 1000
    
                    const newPlaylistUrl = await createPlaylist(duration, csrfToken);
                    console.log(newPlaylistUrl)

                    setIsButtonClicked(true)
                    
                    // Update playlistUrl using the callback form of setPlaylistUrl
                    setPlaylistUrl(prevUrl => {
                        console.log("New playlist:", newPlaylistUrl);
                        return newPlaylistUrl;
                    });
                    resetFormData()
                } catch (error) {
                    console.error("Error creating playlist:", error);
                }
            }
        } else {
            displayError('Playlist already created')
        }
    }

    // opens playlist on spotify in new tab
    // resets playlisturl so the button disappears
    // window.location.href = 'url' ==> replaced by window.open(playlistUrl, '_blank)
    function handlePlaylist() {
        setIsButtonClicked(false)
        window.open(playlistUrl, '_blank')
        setPlaylistUrl("")
    }

    return (
        <div>
            <Navbar token={csrfToken} />
            <form onSubmit={handleSubmit} className="main-container">
                <h1>Hello, {username}! </h1>
                <div className="main-genre">
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
                </div>
                <div className="main-time">
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
                <button className="main-button">Create Playlist</button>
            </form>
            
            {playlistUrl && <button onClick={handlePlaylist} className="main-button">Play on Spotify</button>}
            {/* <button onClick={spotifyPlaylistDuration} className="main-button">Playlist Duration</button> */}
        </div>
    )
}