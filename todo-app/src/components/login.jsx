import React, { useState } from 'react';
import '../styles/components/login.css';
import { useAuth } from '../authentication/auth.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginUrl } from "../authentication/spotifyconfig.jsx";

export const Login = (props) => {
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


  return (
    <div className="login">
      <img
        src="https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg"
        alt="Spotify logo"
      />
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
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
  );
};
