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
      const { note, interval, octave, timing } = element;
      // console.log(note, interval, int);
      int = interval;
      console.log(int, recorded.current);
      // setTimeout(() => {
      //   synth.triggerAttackRelease(`${note}`, "4n");
      // }, `${int}`);
      synth.triggerAttackRelease(
        `${note}${octave}`,
        `${timing}n`,
        `${now + int}`
      );
    });
  };

  const handleKeyDown = (key) => {
    const noteObj = all.filter((note) => note.key === key.toLowerCase())[0];
    if (noteObj.key === key.toLowerCase()) {
      console.log(noteObj.note, noteObj.octave);
      synth.triggerAttackRelease(
        `${noteObj.note}${noteObj.octave}`,
        `${noteObj.timing}n`
      );
      if (recording.current) {
        noteObj.interval = currInterval;
        recorded.current.push(noteObj);
        setRecordedArr(recorded.current);
        // console.log(recorded.current, recording);
        clearInterval(startCurrInt);
        currInterval = 0;
        startCurrInt();
      }
    }
  };
  return (
    <div className="synth">
      <Keyboard notesToRender={notesToRender} synth={synth} />
      <div className="record-buttons">
        <button
          onClick={() => {
            if (recording.current) {
              clearInterval(startCurrInt);
              console.log(currInterval);
              currInterval = 0;
            }

            setisRecording(!isRecording);
            recording.current = !recording.current;
          }}
        >
          {recording.current ? "Stop" : "Record"}
        </button>
        {recordedArr.length > 0 && (
          <>
            <button
              onClick={() => {
                recorded.current = [];
                setRecordedArr(recorded.current);
              }}
            >
              Scrap Recording
            </button>
            <button onClick={() => handlePlayRecording(recorded.current)}>
              Play Recording
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Synth;
