import React, { useEffect, useState, useRef } from "react";
import {
  defaultAllNotes,
  defaultNotesToRender,
  notesPlusSharps,
  keyCodes,
} from "../../resources/Notes";
import SelectInput from "../SelectInput";
import { songList, twinkle } from "../../resources/Songs";
import * as Tone from "tone";
import "./songplayer.css";

const SongPlayer = ({ handleSelect }) => {
  const songSynth = new Tone.PolySynth().toDestination();
  // useEffect(() => {
  //   console.log(twinkle[0]);
  //   songSynth.triggerAttackRelease(
  //     `${twinkle[0].note}${twinkle[0].octave}`,
  //     `${twinkle[0].timing}n`
  //   );
  // }, []);
  return (
    <div className="song-player">
      <SelectInput list={songList} handleSelect={handleSelect} />
      <h3 className="note-display"> C </h3>

      <div className="player">
        <button>Start</button>
        <h3 className="player-title"> </h3>
      </div>
    </div>
  );
};

export default SongPlayer;
