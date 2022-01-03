import React, { useEffect, useState, useRef } from "react";
import {
  defaultAllNotes,
  defaultNotesToRender,
  notesPlusSharps,
  keyCodes,
} from "../../resources/Notes";
import SelectInput from "../SelectInput";
import { songList, twinkle } from "../../resources/Songs";
import Button from "../Button";
import * as Tone from "tone";
import "./songplayer.css";

const SongPlayer = ({ handleSelect, selectedSong }) => {
  const [currSongNote, setCurrSongNote] = useState(null);
  const [currNoteIndex, setCurrNoteIndex] = useState(null);
  const [currUserNote, setCurrUserNote] = useState({});
  const [isSongPlaying, setIsSongPlaying] = useState();
  let songTimer = 0;
  const startSongTimer = () => () => setInterval(() => (songTimer += 0.1), 100);
  const songSynth = new Tone.PolySynth().toDestination();

  const playSong = (song) => {
    Tone.start();
    console.log("song", song);
    const now = Tone.now();
    Tone.Transport.start();
    // startSongTimer();
    // setIsSongPlaying((isSongPlaying) => !isSongPlaying);
    // setCurrNoteIndex(0);

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

  const startGame = () => {
    setTimeout(() => {
      Tone.start();

      playSong(selectedSong);
    }, 3000);
  };
  return (
    <div className="song-player">
      <SelectInput list={songList} handleSelect={handleSelect} />
      <h3 className="note-display"> C </h3>

      <div className="player">
        <h3 className="player-title">
          Play the song you selected and try to learn the timing
        </h3>
        <Button
          text="Play"
          type="image"
          icon={"fas fa-play-circle fa-2x"}
          color="#4CBB17"
          cbarg={selectedSong}
          onClick={playSong}
        />
        {/* <button onClick={playSong(selectedSong)}>Start</button> */}
      </div>
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
