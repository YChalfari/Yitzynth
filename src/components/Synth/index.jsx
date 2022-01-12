import React, { useState, useRef, useEffect, useContext } from "react";
import * as Tone from "tone";
import users from "../../apis/users";
import { recordSong, playSong } from "../../resources/Helpers";
import { Time } from "tone";
import {
  defaultNotesToRender,
  notesPlusSharps,
  keyCodes,
} from "../../resources/Notes";
import Keyboard from "../Keyboard";
import RecordButtons from "../RecordButtons";
import { UserContext } from "../../App";
import SelectInput from "../SelectInput";
import "./synth.css";

const Synth = () => {
  const { user, isLoggedIn, setUser } = useContext(UserContext);
  const [notesToRender, setNotesToRender] = useState(defaultNotesToRender);
  const [recordedArr, setRecordedArr] = useState([]);
  const [isRecording, setisRecording] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const recording = useRef(isRecording);
  let recorded = [];
  const synth = new Tone.PolySynth().toDestination();
  const allNotes = notesPlusSharps(defaultNotesToRender, keyCodes);
  useEffect(() => {
    console.log(recordedArr);
  }, [recordedArr]);
  useEffect(() => {
    const playNotes = (e) => handleKeyDown(e);
    window.addEventListener("keydown", playNotes);
    return () => window.removeEventListener("keydown", playNotes);
  }, []);
  const handleNoteClick = (e, note) => {
    debugger;
    e.stopPropagation();
    console.log(recorded);
    synth.triggerAttackRelease(`${note.note}${note.octave}`, `${note.timing}n`);
    if (recording.current) {
      recordSong(note, recorded, setRecordedArr);
      // console.log(recorded, recording.current);
    }
  };
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
      console.log(recorded);
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
    toggleRecording();
  };
  const handleSelect = (value) => {
    setRecordedArr(user.songs.find((song) => song.title === value).song);
    setSelectedSong(value);
  };
  const handleDeleteSong = async () => {
    const updatedSongs = user.songs.filter(
      (song) => song.title !== selectedSong
    );
    const updatedUser = { ...user };
    updatedUser.songs = updatedSongs;
    try {
      const res = await users.put(`/${user.id}`, updatedUser);
      setUser(updatedUser);
      setRecordedArr([]);
      setSelectedSong(null);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="synth">
      <Keyboard
        allNotes={allNotes}
        notesToRender={notesToRender}
        synth={synth}
        onClick={handleNoteClick}
      />

      <RecordButtons
        hasRecorded={recordedArr.length > 0}
        isRecording={isRecording}
        handleRecord={handleRecord}
        handlePlay={handlePlay}
        handleStop={handleStop}
        handleDelete={handleDelete}
        recordedArr={recordedArr}
      />
      {isLoggedIn && (
        <>
          <SelectInput
            list={user.songs}
            handleSelect={handleSelect}
            text="Select one of your songs to play"
          />
          <button onClick={handleDeleteSong}>Delete Selected Song</button>
        </>
      )}
    </div>
  );
};

export default Synth;
