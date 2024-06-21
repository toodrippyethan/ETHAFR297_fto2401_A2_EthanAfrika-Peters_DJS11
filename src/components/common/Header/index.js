import React from "react";
import "./styles.css";
import { Link, useLocation } from "react-router-dom";

function Header() {
const location = useLocation();
const currentPath = location.pathname;

return <div className="navbar">
<div className="links">
<div className="gradient"></div>
<Link to="/podcasts" className={currentPath == "/" ? "active" : ""}>
</Link>
<Link to="/podcasts" className={currentPath == "/podcasts" ? "active" : ""}>
Podcasts
</Link>
<Link to="/profile" className={currentPath == "/profile" ? "active" : ""}>
Profile
</Link>
</div>

  </div>;
}
export default Header;