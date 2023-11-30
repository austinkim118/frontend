const BASE_URL = 'http://localhost:8000'

export async function getCsrfToken() {
    try {
        const response = await fetch(`${BASE_URL}/api/csrf-token/`, {
            method: 'GET',
            credentials: 'include'
        })
        const data = await response.json()
        return data.csrf_token
    } catch (error) {
        console.log('Error fetching CSRF token:', error)
        throw error
    }
}

export async function authenticateUser(username, password, csrfToken) {
    try {
        const response = await fetch(`${BASE_URL}/api/authenticate/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        })

        if (!response.ok) {
            console.log(response)
            console.error(`Authentication failed with status ${response.status}: ${response.statusText}`);
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.log('Error authenticating user:', error)
        throw error
    }
}

// check if user has been authenticated, meaning not first time user. Retrieve info from database
export async function isAuthenticatedSpotify() {
    const response = await fetch(`${BASE_URL}/spotify/is-authenticated/`, {
        method: 'GET',
        credentials: 'include'
    })
    const data = await response.json()
    return data.status
}

// if first time user, authenticate the user and store in database
export async function authenticateSpotify() {
    const response = await fetch(`${BASE_URL}/spotify/get-auth-url/`, {
        method: 'GET',
        credentials: 'include'
    })
    const data = await response.json()
    window.location.replace(data.url)
}

// Run when 'Create Playlist' buttons clicked -- triggers playlist creation in backend
//// IMPORTANT -- should be a PUSH request -- pushing user inputs (most importantly Minutes and Seconds / but later many genres)
export async function createPlaylist() {
    const response = await fetch(`${BASE_URL}/spotify/create-playlist`, {
        method: 'GET',
        credentials: 'include'
    })
    const data = await response.json()
    return data.url
}