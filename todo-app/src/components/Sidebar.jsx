import React from "react";
import "../styles/components/Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import { LibraryMusic } from "@material-ui/icons";
import { useDataLayerValue } from "../DataLayer";

function Sidebar({spotify}) {
  const [{ playlists }] = useDataLayerValue();

  return (
    <div className="sidebar">
      <h1 className="sidebar__logo">BeatFlow</h1>

      <SidebarOption title="Home" Icon={HomeIcon} />
      <SidebarOption title="Search" Icon={SearchIcon} />
      <SidebarOption title="Your Library" Icon={LibraryMusic} />
      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((playlist) => (
        <SidebarOption spotify={spotify} title={playlist.name} id={playlist.id} key={playlist.id}/>
      ))}
    </div>
  );
}

export default Sidebar;