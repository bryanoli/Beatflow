import React, { useEffect, useState } from "react";
import "../styles/components/Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import { LibraryMusic } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "../DataLayer";
import { spotifyApi } from "react-spotify-web-playback";



function Sidebar({accessToken}) {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [{ user }, dispatch] = useDataLayerValue();
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const selectPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  useEffect(() => {
    const spotifyApi = new SpotifyWebApi({
      clientId: "3bf93ed47f8d4e1cb7181a0336888a7e",
      accessToken: accessToken, // Set the accessToken here
    });

    console.log("Access Token:", accessToken);

    if (accessToken) {
      // Set the access token in the SpotifyWebApi instance
      spotifyApi.setAccessToken(accessToken);
  
      // Fetch user information
      spotifyApi.getMe().then((userData) => {
        console.log("User Info:", userData);
        // Set user data in the data layer
        dispatch({
          type: "SET_USER",
          user: userData,
        });
      });

      // Get the current user's playlists.
      spotifyApi.getUserPlaylists().then((userPlaylistsData) => {
        setUserPlaylists(userPlaylistsData.items);
      });
    }
  }, [accessToken, dispatch]);
  return (
    <div className="sidebar">
      <h1 className="sidebar__logo">BeatFlow</h1>
      <Avatar src={user?.avatar_url} alt={user?.display_name} />
      <h4>{user?.display_name}</h4>
      <SidebarOption title="Home" Icon={HomeIcon} />
      <SidebarOption title="Search" Icon={SearchIcon} />
      <SidebarOption title="Your Library" Icon={LibraryMusic} />
      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      {userPlaylists.map((playlist) => (
        <SidebarOption
          key={playlist.id}
          title={playlist.name}
          id={playlist.id}
          accessToken={accessToken}
          selectPlaylist={selectPlaylist}
          
        />
      ))
      }
    </div>
  );
}

export default Sidebar;