require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const SpotifyWebApi = require("spotify-web-api-node")
const { getLyrics } = require('genius-lyrics-api');

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.REDIRECT_URI,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
})

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken
  spotifyApi.setRefreshToken(refreshToken)
  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.post("/login", async (req, res) => {
  const code = req.body.code;

  try {
    // Authorization Code Grant
    const authorizationData = await spotifyApi.authorizationCodeGrant(code);

    // Set access token
    const accessToken = authorizationData.body.access_token;
    spotifyApi.setAccessToken(accessToken);

    // Get user information
    const userData = await spotifyApi.getMe();

    // Respond with access token, refresh token, and user data
    res.json({
      accessToken: accessToken,
      refreshToken: authorizationData.body.refresh_token,
      expiresIn: authorizationData.body.expires_in,
      userData: {
        display_name: userData.body.display_name,
        email: userData.body.email,
        image_url: userData.body.images[0].url,
        product: userData.body.product,
      },
    });
  } catch (err) {
    console.log('Error during login:', err.message);
    res.sendStatus(400);
  }
});

app.get("/lyrics", async (req, res) => {
  const options = {
    apiKey: 'dhU9TKmpCS26gTeFkfOrlYx_LggLypelThHexva8XUGsbSyb5aRH9J9y_s_D_fK7',
    title: req.query.track,
    artist: req.query.artist,
    optimizeQuery: true
  };
  try {
    const lyrics = await getLyrics(options)
    res.json({ lyrics });
  } catch (error) {
    console.error("Error fetching lyrics:", error)
    res.status(500).json({ error: "Lyrics fetch failed" })
  }
});



app.listen(3001)