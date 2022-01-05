import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import Form from "../Form";
import "./login.css";
const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const { isLoggedIn, setUser, allUsers, setIsLoggedIn } =
    useContext(UserContext);

  const handleLogin = (userInfo) => {
    const currUser = allUsers.find(
      (user) =>
        user.username === userInfo.username &&
        user.password === userInfo.password
    );
    if (currUser) {
      setUser(currUser);
      setIsLoggedIn((isLoggedIn) => !isLoggedIn);
      navigate("/freestyle");
    } else {
      setErrorMessage(
        "Sorry, username or password is incorrect. If you don't have an account click Register below"
      );
    }
  };
  return (
    <div className="login">
      <Form
        handleSubmit={handleLogin}
        text={"Log-in"}
        link={<Link to="/register">Dont have an account? Register Now</Link>}
        error={errorMessage}
      />
    </div>
  );
};

export default Login;
