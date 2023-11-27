import React, { useState } from 'react';
import { useAuth } from '../authentication/auth.jsx';
import axios from 'axios';


export const Login = (props) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUserNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.message === "Login successful") {
        alert("Login successful");
        login();

      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Wrong details");
      console.error(error);
    }

    console.log(username, password);
  };


  return (
    <div className='auth-form-container'>
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          onChange={handleUserNameChange} // Add onChange handler
          type="username"
          placeholder="username"
          id="username"
          name="username"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={handlePasswordChange} // Add onChange handler
          type="password"
          placeholder="*******"
          id="password"
          name="password"
        />
        <button type="submit">Log in</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('register')}>
        Don't have an account? Register here
      </button>
    </div>
  );
};
