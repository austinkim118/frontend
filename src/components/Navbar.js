import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/navbar.css'


export default function Navbar() {
    const navigate = useNavigate()
    function handleLogout() {
        console.log("user logging out")
        navigate('/')
    }

    return (
        <nav>
            <button className='navbar-button' onClick={handleLogout}>Log Out</button>
        </nav>
    )
}