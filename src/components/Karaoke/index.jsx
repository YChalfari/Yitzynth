import React, { useRef, useEffect } from "react";
const lyrics = "You are my sun shine";

const Karaoke = () => {
  const word0 = useRef();
  const word1 = useRef();
  const word2 = useRef();
  const word3 = useRef();
  const word4 = useRef();
  const refsArr = [word0, word1, word2, word3, word4];

  const lyricArr = (arr) => {
    return arr.split(" ");
  };

  const renderLyrics = (arr) => {
    return arr.map((word, i) => (
      <h4 style={{ fontSize: "2rem" }} ref={refsArr[i]}>{`  ${word}`}</h4>
    ));
  };

  useEffect(() => {
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
    <div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {renderLyrics(lyricArr(lyrics))}
      </div>
    </div>
  );
};

export default Karaoke;
