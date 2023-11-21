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

export async function isAuthenticatedSptify() {
    const response = await fetch(`${BASE_URL}/spotify/is-authenticated/`, {
        method: 'GET',
        credentials: 'include'
    })
    const data = await response.json()
    return data.status
}

export async function authenticateSpotify() {
    const response = await fetch(`${BASE_URL}/spotify/get-auth-url/`, {
        method: 'GET',
        credentials: 'include'
    })
    const data = await response.json()
    window.location.replace(data.url)
}