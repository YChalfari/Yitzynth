import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import Button from "../Button";
import { defaultAllNotes } from "../../resources/Notes";
import "./learngame.css";
const LearnGame = ({ selectedSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdownTimer, setCountdownTimer] = useState(null);
  const [gameMessage, setGameMessage] = useState("");
  const currIndex = useRef(0);
  const startGame = () => {
    setCountdownTimer(3);
    const countdown = setInterval(() => {
      setCountdownTimer((countdownTimer) => countdownTimer - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(countdown);
      setCountdownTimer("GO!");
      Tone.Transport.start();
      window.addEventListener("keydown", (e) => {
        const key = e.key;
        const noteObj = [...defaultAllNotes].find(
          (note) => note.key === key.toLowerCase()
        );
        if (noteObj.key === key.toLowerCase()) {
          const newObj = { ...noteObj };
          const songNote = selectedSong[currIndex.current];
          const songTime = selectedSong[currIndex.current].time - 0.969;
          newObj.time = Tone.Transport.seconds.toFixed(3);
          console.log(songNote.note, songTime, newObj.note, newObj.time);
          if (
            newObj.time >= songTime - 0.5 &&
            newObj.time <= songTime + 0.5 &&
            newObj.note === songNote.note
          ) {
            setGameMessage("GOOD JOB!");
          } else {
            setGameMessage("WHUPS");
          }
          //need a way to time the incrementation of currIndx
          currIndex.current++;
        }
      });
    }, 3000);
  };
  return (
    <div className="learn-game">
      <h3 className="game-countdown">{countdownTimer && countdownTimer}</h3>
      <Button onClick={startGame} type="text" text="Play" />
      <div className="game-message">{gameMessage}</div>
    </div>
  );
};

export default LearnGame;
