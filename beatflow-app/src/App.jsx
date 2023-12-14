import "bootstrap/dist/css/bootstrap.min.css"
import Login from "./components/login"
import Dashboard from "./components/Body"
import SpotifyWebApi from 'spotify-web-api-js';
import React, { useEffect } from 'react';
import { getAccessTokenFromUrl } from "./authentication/spotifyconfig";
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebApi();

const code = new URLSearchParams(window.location.search).get("code")

function App() {
    const [{ token }, dispatch] = useDataLayerValue();

    useEffect(() => {
        const hash = getAccessTokenFromUrl();
        window.location.hash = '';
        const _token = hash['access_token'];
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


    return code ? <Dashboard code={code} spotify={spotify} /> : <Login />
    
}

export default App