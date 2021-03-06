import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import Button from "../Button";
import { defaultAllNotes } from "../../resources/Notes";
import mozart from "../../images/moz-good-job.png";
import { songStartTime } from "../../resources/Helpers";
import "./learngame.css";
const LearnGame = ({ selectedSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdownTimer, setCountdownTimer] = useState(null);
  const [gameMessage, setGameMessage] = useState("");
  const [accuracyMessage, setAccuracyMessage] = useState("");
  const gameResults = useRef([]);
  const [difficulty, setDifficulty] = useState(0.5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMozart, setIsMozart] = useState(false);
  const currIndex = useRef(0);

  const calculateTimeAccuracy = (notePressed, songNote, leeway) => {
    const accuracy = {};
    switch (true) {
      case notePressed.time > songNote.time + leeway:
        accuracy.time = "Too Slow";
        accuracy.slow = true;
        break;
      case notePressed.time < songNote.time - leeway:
        // console.log(notePressed.time, songNote.time);
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
    console.log(songStartTime(selectedSong), selectedSong[0].time);
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
          songNote.time = songNote.time - songStartTime(selectedSong);
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
          if (currIndex.current < selectedSong.length - 1) {
            currIndex.current++;
          }

          setCurrentIndex(currIndex.current);

          // setTimeout(() => {
          //   currIndex.current++;
          //   console.log(currIndex.current);
          // }, (selectedSong[currIndex.current + 1].time - 0.569 - Tone.Transport.seconds) * 1000);
        }
      });
      setTimeout(() => {
        console.log(gameResults.current);
        setIsPlaying((isPlaying) => !isPlaying);
        currIndex.current = 0;
        setCurrentIndex(currIndex.current);
        setGameMessage("");
        setAccuracyMessage("");
        Tone.Transport.stop();
        showMozart();
      }, selectedSong[selectedSong.length - 1].time * 1000);
    }, 3000);
  };
  const showMozart = () => {
    setIsMozart(true);
    setTimeout(() => {
      setIsMozart(false);
    }, 3000);
  };

  //Loop through songArr and schedule timeouts to change current index or set whatever is needed
  return (
    <div className="learn-game">
      <h3>Now try to play it!! Click start game to ... start</h3>
      <h3 className="game-countdown">{countdownTimer && countdownTimer}</h3>
      <Button
        onClick={startGame}
        type="text"
        text="Start Game"
        bgColor={"bg-third"}
        disable={isPlaying ? true : undefined}
      />
      {isPlaying && (
        <>
          <div className="note-display">
            {selectedSong[currIndex.current].note}
          </div>
          <div className="game-message">
            <span className="accuracy-message"> {gameMessage}</span>{" "}
            <span className="accuracy-message"> {accuracyMessage}</span>
          </div>
        </>
      )}
      <div className="mozart-cont">
        {isMozart && (
          <img
            className="game-mozart"
            src={mozart}
            alt="Mozart saying nice job"
          />
        )}
      </div>
    </div>
  );
};

export default LearnGame;
