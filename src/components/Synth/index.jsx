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
  const recorded = useRef([]);
  const synth = new Tone.PolySynth().toDestination();
  const allNotes = notesPlusSharps(notesToRender, keyCodes);

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
    return window.removeEventListener("keydown", (e) => handleKeyDown(e));
  }, []);

  const handleKeyDown = (e) => {
    const key = e.key;
    if (e.repeat) {
      return;
    }
    const noteObj = allNotes.filter(
      (note) => note.key === key.toLowerCase()
    )[0];
    if (noteObj.key === key.toLowerCase()) {
      synth.triggerAttackRelease(
        `${noteObj.note}${noteObj.octave}`,
        `${noteObj.timing}n`
      );
      if (recording.current) {
        // noteObj.interval = currInterval.current;
        // recorded.current.push(noteObj);
        // setRecordedArr(recorded.current);
        // clearInterval(startCurrInt);
        // currInterval.current = 0;
        // startCurrInt();
        noteObj.time = Tone.Transport.seconds.toFixed(3);
        recorded.current.push(noteObj);
        setRecordedArr(recorded.current);
        console.log(noteObj.time);
      }
    }
  };

  const handlePlayRecording = (arr) => {
    const now = Tone.now();
    // let int = 0;
    // arr.forEach((element) => {
    //   console.log(now);
    //   const { note, interval, octave, timing } = element;
    //   int = interval;
    //   synth.triggerAttackRelease(
    //     `${note}${octave}`,
    //     `${timing}n`,
    //     `${now + interval}`
    //   );
    // });
    Tone.Transport.start();
    arr.forEach((recordedNote) => {
      const { note, octave, timing, time } = recordedNote;
      console.log(recorded.current);
      synth.triggerAttackRelease(
        `${note}${octave}`,
        `${timing}n`,
        `${now + (time - Tone.Transport.seconds.toFixed(3))}`
      );
    });
    Tone.Transport.stop();
  };

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
