import React from "react"
import { loginUrl } from "../authentication/spotifyconfig"
import '../styles/components/login.css';

function Login() {
    return (
        <div className="login">
            <img
                src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
                alt=""/>
            <a href={ loginUrl }>Login with Spotify</a>
        </div>
    )
}

export default Login
