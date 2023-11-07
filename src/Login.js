import React, { useState } from "react"

export default function Login() {
    // example login info to use in isloginInfoValid()
    const loginData = {
        username: "Austin",
        password: "Kim"
    }

    const [loginInfo, setLoginInfo] = useState(
        {
            username: "",
            password: ""
        }
    )

    function handleChange(event) {
        const { name, value } = event.target
        setLoginInfo(prevLoginInfo => ({
            ...prevLoginInfo,
            [name]: value
        }))
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
        const warning = document.createElement('div')
        warning.innerHTML = errorMessage
        document.body.appendChild(warning)

        // Set a timeout to remove the error message after a certain duration (e.g., 5 seconds)
        setTimeout(() => {      // built-in function --> syntax = setTimeout(function, delay) --> 
                                // function - function to be executed after specified delay (in miliseconds, 1000 = 1sec) 
            document.body.removeChild(warning)
        }, 2000)
    }

    function handleSubmit(event) {
        event.preventDefault()

        console.log(loginInfo.username)
        console.log(loginInfo.password)

        if (isloginInfoValid(loginInfo)) {
            console.log("login successful")
            return true
        } else {
            console.log("login failed")
            return false
        }
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
            <button>Log In</button>
        </form>
    )
}