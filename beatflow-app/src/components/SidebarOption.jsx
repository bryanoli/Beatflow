import React, { useEffect, useState } from "react";
import { useDataLayerValue } from "../DataLayer";
import "../styles/components/SidebarOption.css";
import SpotifyWebApi from "spotify-web-api-js";

function SidebarOption({accessToken, title, id, Icon, selectPlaylist}) {
  const [{}, dispatch] = useDataLayerValue();
  const [playlist, setPlaylist] = useState(null);
  const spotifyApi = new SpotifyWebApi({
    clientId: "3bf93ed47f8d4e1cb7181a0336888a7e",
    accessToken: accessToken, 
  });

  const changePlaylist = (id, e) => {
      dispatch({
          type: 'SET_CURRENT_PLAYLIST',
          id: id
      });

      spotifyApi.getPlaylistTracks(id).then((response) => {
        setPlaylist(response);
          dispatch({
              type: 'SET_TRACKS',
              tracks: response
          })
      }) [id, accessToken]
  }
  const handleClick = () => {
    console.log("Playlist Clicked:", id); 
    selectPlaylist(id);
  };

  return (
      <div className='sidebarOption' onClick={handleClick}>
        
          {Icon && <Icon className='sidebarOption__icon'/>}
          {Icon ? <h4>{title}</h4> : <p onClick={(e) => changePlaylist(id, e)}>{title}</p>}
      </div>
  )
}

export default SidebarOption