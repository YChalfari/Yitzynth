import React, { useState, useRef, useEffect } from "react";

const lyrics = "You are my sun shine";
const lyrics2 = "You are my sun shine";
const LearnToPlay = () => {
  const word0 = useRef();
  const word1 = useRef();
  const word2 = useRef();
  const word3 = useRef();
  const word4 = useRef();
  const word5 = useRef();
  const word6 = useRef();
  const word7 = useRef();
  const word8 = useRef();
  const word9 = useRef();
  const refsArr = [word0, word1, word2, word3, word4];
  const refsArr2 = [word5, word6, word7, word8, word9];
  const lyricArr = (arr) => {
    return arr.split(" ");
  };

  const renderLyrics = (arr, refArr) => {
    return arr.map((word, i) => (
      <h4 style={{ fontSize: "2rem" }} ref={refsArr[i]}>{`  ${word}`}</h4>
    ));
  };

  useEffect(() => {
    let timer = 0;
    setInterval(() => {
      timer += 100;
    }, 100);
    refsArr.forEach(async (word, i) => {
      console.dir(word.current);
      await setTimeout(() => {
        word.current.style.color = "white";
        setTimeout(() => {
          word.current.style.color = "black";
        }, 300);
      }, 200 * i);
    });
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {renderLyrics(lyricArr(lyrics))}
      </div>
      <div
        className="note-display"
        style={{ width: "100%", height: "50px", backgroundColor: "white" }}
      ></div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {renderLyrics(lyricArr(lyrics2))}
      </div>
      <div
        className="note-display"
        style={{ width: "100%", height: "50px", backgroundColor: "white" }}
      ></div>
    </>
  );
};

export default LearnToPlay;
