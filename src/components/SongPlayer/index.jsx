import React, { useEffect, useState, useRef } from "react";
import {
  defaultAllNotes,
  defaultNotesToRender,
  notesPlusSharps,
  keyCodes,
} from "../../resources/Notes";
import SelectInput from "../SelectInput";
import { songList, twinkle } from "../../resources/Songs";
import LearnGame from "../LearnGame";
import Button from "../Button";
import * as Tone from "tone";
import "./songplayer.css";

const SongPlayer = ({ handleSelect, selectedSong }) => {
  const [currSongNote, setCurrSongNote] = useState(null);
  const [currNoteIndex, setCurrNoteIndex] = useState(null);
  const [currUserNote, setCurrUserNote] = useState({});
  const [isSongPlaying, setIsSongPlaying] = useState();
  const [renderStartIndex, setRenderStartIndex] = useState(0);
  let songTimer = 0;
  const startSongTimer = () => () => setInterval(() => (songTimer += 0.1), 100);
  const songSynth = new Tone.PolySynth().toDestination();

  const playSong = (song) => {
    const songLength = song[song.length - 1].time;
    Tone.start();
    console.log("song", song);
    const now = Tone.now();
    Tone.Transport.start();
    // startSongTimer();// setCurrNoteIndex(0);
    setIsSongPlaying((isSongPlaying) => !isSongPlaying);
    setTimeout(() => {
      setIsSongPlaying((isSongPlaying) => !isSongPlaying);
    }, songLength * 1000);
    song.forEach((songNote) => {
      const { note, octave, timing, time } = songNote;
      songSynth.triggerAttackRelease(
        `${note}${octave}`,
        `${timing}n`,
        `${now + (time - Tone.Transport.seconds.toFixed(3))}`
      );
    });
    Tone.Transport.stop();
  };

  const renderNotesDisplay = (startInd, amount) => {
    const notesToDisplay = selectedSong.slice(startInd, amount);
    const notesJSX = notesToDisplay.map((note, i) => (
      <span key={i} className="note-display">
        {note.note}
      </span>
    ));
    setTimeout(() => {
      console.log(notesToDisplay);
      setRenderStartIndex((renderStartIndex) => renderStartIndex + amount - 1);
    }, notesToDisplay[notesToDisplay.length - 1].time * 1000);
    return notesJSX;
  };

  return (
    <div className="song-player">
      <SelectInput list={songList} handleSelect={handleSelect} />
      {isSongPlaying && renderNotesDisplay(renderStartIndex, 10)}
      <div className="player">
        <h3 className="player-title">
          Play the song you selected and try to learn the timing
        </h3>
        <Button
          text="Play"
          type="image"
          icon={"fas fa-play-circle fa-3x"}
          color="#4CBB17"
          cbarg={selectedSong}
          onClick={playSong}
        />
      </div>
      <LearnGame selectedSong={selectedSong} />
    </div>
  );
};

export default SongPlayer;
// useEffect(() => {
//   if (currNoteIndex < selectedSong.length) {
//     console.log("hi", currNoteIndex);
//     setCurrSongNote(selectedSong[currNoteIndex]);
//     currSongNote &&
//       setTimeout(() => {
//         setCurrNoteIndex((currNoteIndex) => currNoteIndex++);
//         console.log(currSongNote);
//       }, currSongNote.time - 500);
//   }
// }, [currNoteIndex]);
//currnote effect changes currsongnote which changes curr note effect etc
