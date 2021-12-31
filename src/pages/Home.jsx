import React from "react";
import Synth from "../components/Synth";
const Home = () => {
  return (
    <div>
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
      <Synth />
    </div>
  );
};

export default Home;
