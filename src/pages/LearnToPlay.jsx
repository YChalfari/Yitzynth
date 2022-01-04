import React, { useRef, useEffect, useState } from "react";
import { songList } from "../resources/Songs";
import * as Tone from "tone";
import Synth from "../components/Synth";
import SongPlayer from "../components/SongPlayer";

const LearnToPlay = () => {
  const [selectedSong, setSelectedSong] = useState(songList[0].song);
  const handleSelect = (value) => {
    setSelectedSong(songList.find((song) => value === song.title).song);
  };
  return (
    <div className="learn-page">
      <SongPlayer selectedSong={selectedSong} handleSelect={handleSelect} />
      <Synth />
    </div>
  );
};

export default LearnToPlay;
