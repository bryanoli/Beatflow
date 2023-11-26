import React, { useState } from 'react';
import axios from 'axios';

export const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:3000/auth/register", {
          username:username,    
          email:email,
          password:password,
        },   
        {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        if (response.data === "Found") {
            alert("User already exists");
        } else if (response.data === "Does not exist") {
            alert("User has not signed up yet");
        }
    } catch (error) {
        alert("Wrong details");
        console.error(error);
    }
}

  return (
    <div className='auth-form-container'>
        <h2>Register</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          onChange={handleUserNameChange} // Add onChange handler
          placeholder="Username"
          id="username"
          name="username"
        />
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={handleEmailChange} // Add onChange handler
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
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
        <button type="submit">Register</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('login')}>
        If you have an account click here
      </button>
    </div>
  );
};
