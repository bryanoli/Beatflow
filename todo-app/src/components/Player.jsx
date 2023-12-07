import React from "react";
import "../styles/components/Player.css";
import Sidebar from "../components/Sidebar";
import Body from "../components/Body";
import Footer from "../components/Footer";

function Player({ spotify }) {
  return (
    <div className="player">
      <div className="player__body">
        <Sidebar spotify={ spotify } />
        <Body spotify={spotify} />
      </div>
      <Footer />
    </div>
  );
}

export default Player;