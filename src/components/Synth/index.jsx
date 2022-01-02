import React, { useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import { Time } from "tone";
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
  // const notesWithKeyCode = useRef([]);
  const recording = useRef(isRecording);
  let recorded = [];
  const synth = new Tone.PolySynth().toDestination();
  const allNotes = notesPlusSharps(defaultNotesToRender, keyCodes);

  // const recordTimeline = useRef(new Tone.Timeline());
  // const currTimeline = useRef(null);
  // const playRecTimeline = useRef(null);
  // const currInterval = useRef([0]);
  // const startCurrInt = () =>
  //   setInterval(() => {
  //     currInterval.current += 0.05;
  //   }, 50);

  useEffect(() => {
    window.addEventListener("keydown", (e) => handleKeyDown(e));
    return () => window.removeEventListener("keydown", (e) => handleKeyDown(e));
  }, []);

  const handleKeyDown = (e) => {
    const key = e.key;
    if (e.repeat) {
      return;
    }
    console.log("xxxx", allNotes);
    const noteObj = [...allNotes].find(
      (note) => note.key === key.toLowerCase()
    );
    if (noteObj.key === key.toLowerCase()) {
      synth.triggerAttackRelease(
        `${noteObj.note}${noteObj.octave}`,
        `${noteObj.timing}n`
      );
      if (recording.current) {
        const newObj = { ...noteObj };
        newObj.time = Tone.Transport.seconds.toFixed(3);
        recorded.push(newObj);
        setRecordedArr(recorded);
      }
    }
  };

  const handlePlayRecording = (arr) => {
    console.log("arr", arr);
    const now = Tone.now();
    Tone.Transport.start();
    arr.forEach((recordedNote) => {
      const { note, octave, timing, time } = recordedNote;
      synth.triggerAttackRelease(
        `${note}${octave}`,
        `${timing}n`,
        `${now + (time - Tone.Transport.seconds.toFixed(3))}`
      );
    });
    Tone.Transport.stop();
  };

  const handleRecord = () => {};
  return (
    <div className="synth">
      <Keyboard
        allNotes={allNotes}
        notesToRender={notesToRender}
        synth={synth}
      />
      <div className="record-buttons">
        <button
          onClick={() => {
            if (recording.current) {
              Tone.Transport.stop();
              console.log("rec stopped");
              // clearInterval(startCurrInt);
              // console.log(currInterval.current);
              // currInterval.current = 0;
            } else {
              Tone.Transport.start();
              console.log("rec started");
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
                recorded = [];
                setRecordedArr(recorded);
              }}
            >
              Scrap Recording
            </button>
            <button onClick={() => handlePlayRecording(recordedArr)}>
              Play Recording
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Synth;
