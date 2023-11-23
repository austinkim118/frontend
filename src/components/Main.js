import React, { useState, useEffect } from "react"
import { getCsrfToken } from "../utils/api"
import { useParams } from "react-router-dom"

export default function Main() {
    // extract 'code' from return URL
    const { code } = useParams()

    const [formData, setFormData] = useState({
        minutes: "", 
        seconds: "", 
        genre: ""
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [csrfToken, setCsrfToken] = useState("")
    const[createPlaylist, setCreatePlaylist] = useState(true)

    // fetch CSRF Token from backend to make POST requests
    useEffect(() => {
        async function fetchCsrfToken() {
            const token = await getCsrfToken()
            setCsrfToken(token)
        }

        fetchCsrfToken()
    }, [])

    // update user inputs
    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    // create plyalist
    function handleCreate() {
        setCreatePlaylist(prevCreatePlaylist => prevCreatePlaylist ? false : prevCreatePlaylist)
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
    function handleSubmit(event) {
        event.preventDefault()
        // this prevents web to refresh as default

        if (createPlaylist && isFormDataValid(formData)) {
            // submitToApi(formData) --> this function will send data to backend and create playlist,
            // then create & display another button that contains deeplink to open and play the playlist on Spotify

            // JUST A SIMULATION

            // In a real scenario, this would be replaced with an actual API call
            const playlistData = {
                playlistId: "1",
                playlistName: "playlist"
                // Other playlist details
            }
            
            handleApiResponse(playlistData)

            handleCreate()
        }
    }

    function handleApiResponse(data) {
        const { playlistId, playlistName } = data

        // Create an anchor element with the link you want to open
        const link = document.createElement('a')
        link.href = 'https://open.spotify.com' // in the final product, will be a deep link

        // Create a button to play the playlist
        const playButton = document.createElement('button')
        playButton.textContent = 'Play ' + playlistName + ' on Spotify'
        // playButton.className = 'play-button' --> so I can apply css

        // Create a deep link URL using the playlistId
        playButton.addEventListener('click', () => {
            const deeplink = `spotify:playlist:${playlistId}`
            // In a real scenario, you'd use a method to open this link in the Spotify app
            console.log('Opening Spotify...', deeplink)
        })

        // Append the "Play" button to the document body
        link.appendChild(playButton)
        document.body.appendChild(link)
    }

            // End of Simulation Code

    return (
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
            <button>Create playlist</button>
        </form>
    )
}
