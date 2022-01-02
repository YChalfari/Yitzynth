import React from "react";

import "./keyboard.css";
const Keyboard = ({ synth, notesToRender, allNotes }) => {
  const noteWidth = 100 / notesToRender.length;
  const renderKeys = () => {
    return notesToRender.map((note, i) => (
      <React.Fragment key={note.note + note.octave}>
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
          <h4>{note.note}</h4>
          <p>{note.key}</p>
          {note.hasSharp && i !== notesToRender.length - 1 && (
            <div
              className="black-note"
              onClick={(e) => {
                e.stopPropagation();
                synth.triggerAttackRelease(
                  `${note.note}#${note.octave}`,
                  `${note.timing}n`
                );
              }}
            >
              <h4>{note.note + "#"}</h4>
              <p>
                {
                  allNotes.find((allnote) => allnote.note === note.note + "#")
                    .key
                }
              </p>
            </div>
          )}
        </div>
      </React.Fragment>
    ));
  };

  return <div className="keyboard">{renderKeys()}</div>;
};

export default Keyboard;
