import React, { useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import { recordSong, playSong } from "../../resources/Helpers";
import { Time } from "tone";
import {
  defaultNotesToRender,
  notesPlusSharps,
  keyCodes,
} from "../../resources/Notes";
import Keyboard from "../Keyboard";
import RecordButtons from "../RecordButtons";
const Synth = () => {
  const [notesToRender, setNotesToRender] = useState(defaultNotesToRender);
  const [recordedArr, setRecordedArr] = useState([]);
  const [isRecording, setisRecording] = useState(false);

  const recording = useRef(isRecording);
  let recorded = [];
  const synth = new Tone.PolySynth().toDestination();
  const allNotes = notesPlusSharps(defaultNotesToRender, keyCodes);

  useEffect(() => {
    window.addEventListener("keydown", (e) => handleKeyDown(e));
    return () => window.removeEventListener("keydown", (e) => handleKeyDown(e));
  }, []);

  const handleKeyDown = (e) => {
    const key = e.key;
    if (e.repeat) {
      return;
    }
    const noteObj = [...allNotes].find(
      (note) => note.key === key.toLowerCase()
    );
    if (noteObj.key === key.toLowerCase()) {
      synth.triggerAttackRelease(
        `${noteObj.note}${noteObj.octave}`,
        `${noteObj.timing}n`
      );
      if (recording.current) {
        recordSong(noteObj, recorded, setRecordedArr);
      }
    }
  };

  const handlePlay = () => {
    playSong(recordedArr, synth);
  };
  const handleStop = () => {
    if (recording.current) {
      Tone.Transport.stop();
      console.log("rec stopped");
    }
    toggleRecording();
  };
  const toggleRecording = () => {
    setisRecording(!isRecording);
    recording.current = !recording.current;
  };
  const handleDelete = () => {
    recorded = [];
    setRecordedArr(recorded);
  };
  const handleRecord = () => {
    Tone.Transport.start();
    console.log("rec started");
    toggleRecording();
  };
  return (
    <div className="synth">
      <Keyboard
        allNotes={allNotes}
        notesToRender={notesToRender}
        synth={synth}
      />

      <RecordButtons
        hasRecorded={recordedArr.length > 0}
        isRecording={isRecording}
        handleRecord={handleRecord}
        handlePlay={handlePlay}
        handleStop={handleStop}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Synth;
