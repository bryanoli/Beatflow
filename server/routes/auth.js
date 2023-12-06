const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { Op } = require('sequelize');
require('dotenv').config();
const querystring = require('querystring');
const  axios  = require('axios');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;


// Registration
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({  where: {
      [Op.or]: [{ username }, { email }],
    }, });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password before storing it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login request payload:', req.body);
    // Find the user by username
    const user = await User.findOne({ where: { username } });
    console.log('Found user:', user);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the provided password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('User:', user.username);
    console.log('Stored hashed password:', password);
    console.log('Stored hashed password:', user.password);
    console.log('Password match:', passwordMatch);
    if (!passwordMatch) {
      console.log('Password does not match');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    //return user;
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    console.log('code:', code)
    const authOptions = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        code: code,
        redirect_uri: "http://localhost:3000",
        grant_type: 'authorization_code'
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
      },
    };

    try {
      // Make the POST request to exchange code for access token using axios
      const response = await axios(authOptions);
      
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;
      console.log('access_token:', access_token);
      console.log('refresh_token:', refresh_token);
      console.log('response.data:', response.data);
      // You can use the access_token to make requests to the Spotify API on behalf of the user
      // Save the access_token and refresh_token securely in your database or session
      // Redirect or respond as needed
      res.redirect('/#' +
        querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token
        }));
    } catch (error) {
      console.log('Inside error');
      // Handle the error appropriately
      console.error('Error during token exchange:', error.message);
      res.redirect('/#' +
        querystring.stringify({
          error: 'invalid_token'
        }));
    }
  }
});


function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

router.get('/login-spotify', (req, res) => {
  if (!client_id || !client_secret) {
    return res.status(500).send('CLIENT_ID or CLIENT_SECRET is not defined in the environment.');
  }

  const redirect_uri = 'http://localhost:3000';
  const scope = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-library-read',
    'user-library-modify',
    'user-read-currently-playing',
    'user-read-recently-played',
  ].join('%20');
  const state = generateRandomString(16);

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}`;
  console.log('AUTH_URL:', AUTH_URL);
  // Redirect the user to Spotify's authorization endpoint
  res.redirect(AUTH_URL);
});


router.get('/refresh_token', async (req, res) => {
  try {
    const refresh_token = req.body.refresh_token;
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64')
      },
      data: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      })
    };

    const response = await axios.post(authOptions.url, authOptions.data, {
      headers: authOptions.headers
    });

    const { access_token, refresh_token: newRefreshToken } = response.data;

    // Save the new access token and refresh token to the user in your database
    if (newRefreshToken) {
      const user = await User.findOne({ where: { spotifyRefreshToken: refresh_token } });
      if (user) {
        user.update({
          spotifyAccessToken: access_token,
          spotifyRefreshToken: newRefreshToken
        });
      }
    }

    res.send({
      'access_token': access_token,
      'refresh_token': newRefreshToken || refresh_token  // Use the new refresh token if provided, or fallback to the original
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;