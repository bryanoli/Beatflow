import React, { useState } from 'react';

export const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userName, email, password);
    // Add your logic for handling form submission (e.g., making an API request for registration)
  };

  return (
    <div className='auth-form-container'>
        <h2>Register</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input
          value={userName}
          onChange={handleUserNameChange} // Add onChange handler
          placeholder="Full Name"
          id="name"
          name="name"
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
