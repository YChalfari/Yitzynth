import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import intro from "../sounds/sfx-piano-bar2.mp3";
import mozart from "../images/mozart-intro.png";
import me from "../images/me-bubble-cropped.png";
import welcomeImg from "../images/welcome-message.png";
import Synth from "../components/Synth";
import "./home.css";
const Home = () => {
  const [firstVisit, setfirstVisit] = useState(true);
  const handleClick = () => {
    setfirstVisit(!firstVisit);
  };
  useEffect(() => {
    Tone.start();
    const player = new Tone.Player(intro).toDestination();
    player.autostart = true;
  }, []);
  return (
    <div className="home">
      <div className="welcome-message">
        <img className="welcome-me" src={me} alt="" />
        <img className="welcome-text" src={welcomeImg} alt="" />
      </div>
      {/* {firstVisit && <Welcome handleClick={handleClick} />} */}
      <img className="welcome-mozart" src={mozart} alt="" />
      <div className="instructions-cont bg-secondary color-primary">
        <p className="color-secondary welcome-header"> Instructions</p>
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
    </div>
  );
};

export default Home;
