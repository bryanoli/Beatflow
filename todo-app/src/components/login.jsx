import React, { useState } from 'react';
import '../styles/components/login.css';
import { useAuth } from '../authentication/auth.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginUrl } from "../authentication/spotifyconfig.jsx";

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

// export const Login = (props) => {
  // const AUTH_URL = "http://localhost:3001/auth/login-spotify";
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const navigate = useNavigate();


  // const handleUserNameChange = (e) => {
  //   setUsername(e.target.value);
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:3001/auth/login", {
  //       username,
  //       password,
  //     },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //     if (response.data.message === "Login successful") {
  //       alert("Login successful");
  //       login();
  //       navigate('/Discover');

  //     } else {
  //       alert("Invalid credentials");
  //     }
  //   } catch (error) {
  //     alert("Wrong details");
  //     console.error(error);
  //   }

  //   console.log(username, password);
  // };

    // <div className='auth-form-container'>
    //   <h2>Login</h2>
    //   <form className="login-form" onSubmit={handleSubmit}>
    //     <label htmlFor="username">Username</label>
    //     <input
    //       value={username}
    //       onChange={handleUserNameChange} // Add onChange handler
    //       type="username"
    //       placeholder="username"
    //       id="username"
    //       name="username"
    //     />
    //     <label htmlFor="password">Password</label>
    //     <input
    //       value={password}
    //       onChange={handlePasswordChange} // Add onChange handler
    //       type="password"
    //       placeholder="*******"
    //       id="password"
    //       name="password"
    //     />
    //     <button type="submit">Log in</button>
    //   </form>
    //   <a className="link-btn" href={AUTH_URL}>Spotify Login</a> 
    //   <button className="link-btn" onClick={() => props.onFormSwitch('register')}>
    //     Don't have an account? Register here
    //   </button>
    // </div>
//   );
// };
