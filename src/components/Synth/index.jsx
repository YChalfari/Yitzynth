import React, { useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import {
  defaultNotesToRender,
  notesPlusSharps,
  keyCodes,
} from "../../resources/Notes";
import Keyboard from "../Keyboard";
const Synth = () => {
  const [notesToRender, setNotesToRender] = useState(defaultNotesToRender);
  const [recordedArr, setRecordedArr] = useState([]);
  const [isRecording, setisRecording] = useState(false);
  const notesWithKeyCode = useRef([]);
  const recording = useRef(isRecording);
  const recorded = useRef([]);
  const synth = new Tone.PolySynth().toDestination();
  const all = notesPlusSharps(notesToRender, keyCodes);
  console.log(all, keyCodes);
  let currInterval = 0;

  useEffect(() => {
    window.addEventListener("keydown", (e) => handleKeyDown(e.key));
  }, []);
  const setNotesWithKeyCode = () => {};
  const startCurrInt = () =>
    setInterval(() => {
      currInterval += 0.05;
    }, 50);

  const handlePlayRecording = (arr) => {
    const now = Tone.now();
    let int = 0;
    arr.forEach((element) => {
      const { note, interval } = element;
      // console.log(note, interval, int);
      int = interval;
      console.log(int, recorded.current);
      // setTimeout(() => {
      //   synth.triggerAttackRelease(`${note}`, "4n");
      // }, `${int}`);
      synth.triggerAttackRelease(`${note}`, "8n", `${now + int}`);
    });
  };

  const handleKeyDown = (key) => {
    const noteObj = all.filter((note) => note.key === key.toLowerCase())[0];
    console.log(noteObj.note, noteObj.octave);
    if (noteObj.key === key.toLowerCase()) {
      synth.triggerAttackRelease(
        `${noteObj.note}${noteObj.octave}`,
        `${noteObj.timing}n`
      );
    }
  };
  return (
    <div>
      <Keyboard notesToRender={notesToRender} synth={synth} />
    </div>
  );
};

export default Synth;
