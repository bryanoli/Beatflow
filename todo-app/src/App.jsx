import React, {Component, useState, useEffect} from 'react'
import Nav from './components/nav';
import Home from "./pages/Home";
import Discover from "./user-pages/Discover";
import Favorites from "./user-pages/Favorites";
import Settings from "./user-pages/Settings";
import {Route, Routes} from "react-router-dom";
import { getTokenFromUrl } from "./authentication/spotifyconfig.jsx";
import { Login } from "./components/login";
import Player from "./components/Player";
import { useDataLayerValue } from "./DataLayer.jsx";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      console.log("[token]", token);
      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user,
        });
      });
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });
      spotify.getPlaylist("37i9dQZF1E34Ucml4HHx1w").then((playlist) => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: playlist,
        });
      });
    }
  }, []);

  return (
    <div className="App">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;