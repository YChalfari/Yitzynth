import React, { useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import "./navbar.css";
// style={{ backgroundImage: `url(${navBackground})` }}
const NavBar = () => {
  const value = useContext(UserContext);
  return (
    <div className="nav-cont">
      <div className="nav">
        <img src={logo} alt="" />
        <Link to="/">Home</Link>
        <Link to="/l2p">Learn</Link>
        <Link to="/freestyle">Freestyle</Link>
        <Link to="/youtube">Youtube</Link>
        {value.isLoggedIn ? (
          <Link
            onClick={() => {
              value.setIsLoggedIn((isLoggedIn) => !isLoggedIn);
              value.setUser(null);
            }}
            to="/"
          >
            Sign-Out
          </Link>
        ) : (
          <Link to="/login">Log-In</Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
