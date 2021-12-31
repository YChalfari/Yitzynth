import React from "react";

import "./keyboard.css";
const Keyboard = ({ synth, notesToRender }) => {
  const noteWidth = 100 / notesToRender.length;
  const renderKeys = () => {
    return notesToRender.map((note, i) => (
      <>
        <div
          className="white-note"
          onClick={() => {
            synth.triggerAttackRelease(
              `${note.note}${note.octave}`,
              `${note.timing}n`
            );
          }}
          style={{
            width: `${noteWidth}%`,
          }}
        >
          <p>{note.note}</p>
          {note.hasSharp && i !== notesToRender.length - 1 && (
            <div
              className="black-note"
              onClick={() =>
                synth.triggerAttackRelease(
                  `${note.note}#${note.octave}`,
                  `${note.timing}n`
                )
              }
            >
              <p>{note.note + "#"}</p>
            </div>
          )}
        </div>
      </>
    ));
  };

  return <div className="keyboard">{renderKeys()}</div>;
};

export default Keyboard;
