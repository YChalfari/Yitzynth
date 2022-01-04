import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import Button from "../Button";
import { defaultAllNotes } from "../../resources/Notes";
import "./learngame.css";
const LearnGame = ({ selectedSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdownTimer, setCountdownTimer] = useState(null);
  const [gameMessage, setGameMessage] = useState("");
  const [accuracyMessage, setAccuracyMessage] = useState("");
  const gameResults = useRef([]);
  const [difficulty, setDifficulty] = useState(0.5);
  const currIndex = useRef(0);

  const calculateTimeAccuracy = (notePressed, songNote, leeway) => {
    const accuracy = {};
    switch (true) {
      case notePressed.time > songNote.time + leeway:
        accuracy.time = "Too Slow";
        accuracy.slow = true;
        break;
      case notePressed.time < songNote.time - leeway:
        console.log(notePressed.time, songNote.time);
        accuracy.time = "Too Soon";
        accuracy.soon = true;
        break;
      default:
        accuracy.time = "Great Timing!";
        accuracy.accurate = true;
    }
    return accuracy;
  };

  const startGame = () => {
    setCountdownTimer(3);
    const countdown = setInterval(() => {
      setCountdownTimer((countdownTimer) => countdownTimer - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(countdown);
      setCountdownTimer("GO!");
      setIsPlaying((isPlaying) => !isPlaying);
      Tone.Transport.start();
      window.addEventListener("keydown", (e) => {
        const key = e.key;
        const noteObj = [...defaultAllNotes].find(
          (note) => note.key === key.toLowerCase()
        );
        if (noteObj.key === key.toLowerCase()) {
          const newObj = { ...noteObj };
          const songNote = selectedSong[currIndex.current];
          // const songTime = selectedSong[currIndex.current].time - 0.969;
          songNote.time = songNote.time - 0.969;
          newObj.time = Tone.Transport.seconds.toFixed(3);
          console.log(songNote.note, songNote.time, newObj.note, newObj.time);
          const timeMessage = calculateTimeAccuracy(
            newObj,
            songNote,
            difficulty
          );

          setAccuracyMessage(timeMessage.time);
          if (newObj.note === songNote.note) {
            setGameMessage("GOOD JOB!");
            timeMessage.correctNote = true;
          } else {
            setGameMessage("Wrong note!");
            timeMessage.correctNote = false;
          }
          gameResults.current.push(timeMessage);
          //need a way to time the incrementation of currIndx
          currIndex.current++;

          // setTimeout(() => {
          //   currIndex.current++;
          //   console.log(currIndex.current);
          // }, (selectedSong[currIndex.current + 1].time - 0.569 - Tone.Transport.seconds) * 1000);
        }
      });
      setTimeout(() => {
        console.log(gameResults.current);
        setIsPlaying((isPlaying) => !isPlaying);
      }, selectedSong[selectedSong.length - 1].time * 1000);
    }, 3000);
  };
  //Loop through songArr and schedule timeouts to change current index or set whatever is needed
  return (
    <div className="learn-game">
      <h3 className="game-countdown">{countdownTimer && countdownTimer}</h3>
      <Button onClick={startGame} type="text" text="Start Game" />
      {isPlaying && (
        <div className="game-message">{`Note: ${gameMessage} Timing: ${accuracyMessage}`}</div>
      )}
      {isPlaying && "We're Playing"}
    </div>
  );
};

export default LearnGame;
