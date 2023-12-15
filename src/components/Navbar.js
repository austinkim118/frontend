import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/navbar.css'
import { userLogout } from '../utils/api'


export default function Navbar(props) {
    const navigate = useNavigate()
    const { token } = props
    async function handleLogout() {
        console.log("user logging out")
        console.log(token)
        const user_status = await userLogout(token)
        console.log(user_status)

        // open Spotify Logout page '_blank' menas in new tab
        const logoutTab = window.open('https://accounts.spotify.com/en/logout', '_blank')
        // closes the tab in 0.5 seconds
        setTimeout(() => {
            logoutTab.close();
          }, 100);

        navigate('/')
    }

    return (
        <nav>
            <button className='navbar-button' onClick={handleLogout}>Log Out</button>
        </nav>
    )
}