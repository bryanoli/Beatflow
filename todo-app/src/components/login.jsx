import React, { useState } from 'react';

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    // Add your logic for handling form submission (e.g., making an API request for login)
  };

  return (
    <div className='auth-form-container'>
        <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
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
        <button type="submit">Log in</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch('register')}>
        Don't have an account? Register here
      </button>
    </div>
  );
};
