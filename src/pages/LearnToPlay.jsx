import React, { useRef, useEffect, useState } from "react";
import { songList, twinkle } from "../resources/Songs";
import * as Tone from "tone";
import Synth from "../components/Synth";
import SongPlayer from "../components/SongPlayer";

const LearnToPlay = () => {
  const [selectedSong, setSelectedSong] = useState(twinkle);
  const handleSelect = (value) => {
    setSelectedSong(songList.find((song) => value === song.title).song);
  };
  return (
    <div>
      <SongPlayer handleSelect={handleSelect} />
      <Synth />
    </div>
  );
};

export default LearnToPlay;
