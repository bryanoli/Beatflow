require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const lyricsFinder = require('lyrics-finder');
const SpotifyWebApi = require("spotify-web-api-node")
const { getLyrics } = require('genius-lyrics-api');

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  })

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

app.post("/login", (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      res.sendStatus(400)
    })
})



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