import React from "react";

import "./keyboard.css";
const Keyboard = ({ synth, notesToRender, allNotes, onClick }) => {
  const noteWidth = 100 / notesToRender.length;
  const renderKeys = () => {
    return notesToRender.map((note, i) => {
      const noteCopy = { ...note };
      noteCopy.note = note.note + "#";
      return (
        <React.Fragment key={note.note + note.octave}>
          <div
            className="white-note"
            onClick={(e) => {
              onClick(e, note);
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
                  console.log(noteCopy);
                  onClick(e, noteCopy);
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
      );
    });
  };

  return <div className="keyboard">{renderKeys()}</div>;
};

export default Keyboard;
