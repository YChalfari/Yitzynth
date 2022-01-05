import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import axios from "axios";
import users from "../../apis/users";
import Form from "../Form";
import Loading from "../Loading";
import "./register.css";

const Register = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { setUser, setIsLoggedIn, user, isLoggedIn } = useContext(UserContext);

  const handleRegister = (userInfo) => {
    const addUser = async () => {
      setIsLoading((isLoading) => !isLoading);
      try {
        setIsLoading((isLoading) => !isLoading);
        const res = await users.post("", userInfo);
        setUser(userInfo);
        setIsLoggedIn((isLoggedIn) => !isLoggedIn);
        setIsLoading((isLoading) => !isLoading);
        navigate("/");
      } catch (e) {
        setErrorMessage("Oops, something went wrong");
      }
    };
    addUser();
  };
  return (
    <div className="login">
      {isLoading ? (
        <Loading />
      ) : (
        <Form
          handleSubmit={handleRegister}
          text={"Register"}
          error={errorMessage}
        />
      )}
    </div>
  );
};

export default Register;
