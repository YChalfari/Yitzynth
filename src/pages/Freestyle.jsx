import React from "react";
import Synth from "../components/Synth";
import mozart from "../images/freestyle-moz.png";
import "./freestyle.css";
const Freestyle = () => {
  return (
    <div className="freestyle-page">
      <img className="freestyle-moz" src={mozart} alt="" />
      <Synth />
    </div>
  );
};

export default Freestyle;
