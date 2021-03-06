import React, { useState, useEffect, createContext } from "react";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import Freestyle from "./pages/Freestyle";
import Login from "./components/Login";
import Register from "./components/Register";
import LearnToPlay from "./pages/LearnToPlay";
import Loading from "./components/Loading";
import YoutubePlayground from "./pages/YoutubePlayground";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import users from "./apis/users";
import "./App.css";

export const UserContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [allUsers, setAllUsers] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const res = await users.get();
        setAllUsers(res.data);
      } catch (e) {
        setErrorMessage(e.message);
      }
      setIsLoading(false);
    };
    getUser();
  }, []);

  return (
    <div className="App">
      <Router>
        <UserContext.Provider
          value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            allUsers,
            isLoading,
            setIsLoading,
          }}
        >
          <Navbar />
          <div className="main">
            {errorMessage && (
              <h4 className="error-message">
                Sorry, we couldn't fetch users, try refreshing
              </h4>
            )}
            {isLoading ? (
              <Loading />
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/youtube" element={<YoutubePlayground />} />
                <Route path="/freestyle" element={<Freestyle />} />
                <Route path="/l2p" element={<LearnToPlay />} />
              </Routes>
            )}
          </div>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
