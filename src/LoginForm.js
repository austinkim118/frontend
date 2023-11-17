import React, { useState, useEffect } from "react"
import { getCsrfToken, authenticateUser } from "./api"

export default function LoginForm() {
    // example login info to use in isloginInfoValid()
    const loginData = {
        username: "Austin",
        password: "Kim"
    }

    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = useState("")
    const [csrfToken, setCsrfToken] = useState("")

    function handleChange(event) {
        const { name, value } = event.target
        setLoginInfo(prevLoginInfo => ({
            ...prevLoginInfo,
            [name]: value
        }))
    }

    useEffect(() => {
        async function fetchCsrfToken() {
            const token = await getCsrfToken()
            setCsrfToken(token)
        }

        fetchCsrfToken()
    }, [])

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            const response = await authenticateUser(loginInfo.username, loginInfo.password, csrfToken);
      
            // Handle authentication response
            if (response.authenticated) {
              console.log('Login Successful!');
              // Perform actions for authenticated user
            } else {
              console.log('Login failed...');
              // Handle authentication failure
            }
          } catch (error) {
            console.error('API call error:', error);
          }

        // console.log(loginInfo.username)
        // console.log(loginInfo.password)
        
        // // authenticateUser() in api.js -- onLogin passed in as props from App.js
        // // onLogin(loginInfo)

        // if (isloginInfoValid(loginInfo)) {
        //     console.log("login successful")
        // } else {
        //     console.log("login failed")
        // }
    }

    function isloginInfoValid(loginInfo) {
        const { username, password } = loginInfo
        if (username === "" || password === "") {
            displayError('Please fill in the required fields')
            return false
        } else if (username !== loginData.username || password !== loginData.password) {
            displayError('Login Failed...Please try again')
            setLoginInfo(() => ({
                username: "",
                password: ""
            }))
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

    return (
        <form onSubmit={handleSubmit}>
            <h2>Log In</h2>
            <div>
                <label htmlFor="username">Username</label>
                <br />
                <input 
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    onChange={handleChange}
                    name="username"
                    value={loginInfo.username}
                    autoComplete="off"
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <br />
                <input 
                    type="text" // "password" to mask it
                    id="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    name="password"
                    value={loginInfo.password}
                    autoComplete="off"
                />
            </div>
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
            <button>Log In</button>
        </form>
    )
}