import React, { useEffect, useState } from "react";
import Welcome from "../components/Welcome";
import Synth from "../components/Synth";
import "./home.css";
const Home = () => {
  const [firstVisit, setfirstVisit] = useState(true);
  const handleClick = () => {
    setfirstVisit(!firstVisit);
  };
  return (
    <div className="home">
      {firstVisit && <Welcome handleClick={handleClick} />}
      <h2>Get Started!</h2>
      <div className="instructions-cont">
        <h4>
          To get started, we recommend using your keyboard to play the keys.
        </h4>
        <p>
          Keyboard keys a,s,d,f,g,h,j,k will play the white (Natural) notes
          C,D,E,F,G,A,B,C
        </p>
        <p>
          To play the sharps in between, simply press the key above and to the
          right of the Natural note to get it's sharp note (a sharp is half a
          tone up in pitch)
        </p>
        <p>
          Example: To play a C#, since in order to play C we need to press "a",
          C# would be "w"
        </p>
      </div>
      <iframe
        src="https://www.soundslice.com/slices/WBTMc/embed/"
        width="100%"
        height="500"
        frameBorder="0"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default Home;
