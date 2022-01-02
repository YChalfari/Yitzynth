import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import "./navbar.css";
// style={{ backgroundImage: `url(${navBackground})` }}
const NavBar = () => {
  return (
    <div className="nav-cont">
      <div className="nav">
        <img src={logo} alt="" />
        <Link to="/">Home</Link>
        <Link to="/l2p">Learn</Link>
        <Link to="/freestyle">Freestyle</Link>
        <Link to="/youtube">Youtube Playalong</Link>
      </div>
    </div>
  );
};

export default NavBar;
