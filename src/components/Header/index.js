import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

function Header() {
  return <div className="navbar">
    <div className="links">
    <Link to="/">SignUp</Link>
    <Link to="/podcasts">Podcasts</Link>
    <Link to="/start-a-podcast">Start a Podcast</Link>
    <Link to="/profile">Profile</Link>
    </div>
  </div>;
}

export default Header;
