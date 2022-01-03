import React from "react";
import Button from "../Button";
import "./recordbuttons.css";
const RecordButtons = ({
  isRecording,
  hasRecorded,
  handleRecord,
  handlePlay,
  handleStop,
  handleDelete,
}) => {
  return (
    <div className="rec-btn-cont">
      {!isRecording ? (
        <Button
          icon={"fas fa-circle fa-2x"}
          onClick={handleRecord}
          type="image"
          text="Record"
          color="#c8102E"
        />
      ) : (
        <Button
          icon={"fas fa-stop-circle fa-2x"}
          onClick={handleStop}
          type="image"
          text="Stop"
          color="#c8102E"
        />
      )}
      {hasRecorded && (
        <>
          <Button
            text="Play"
            type="image"
            icon={"fas fa-play-circle fa-2x"}
            color="#4CBB17"
            onClick={handlePlay}
          />
          <Button
            text="Scrap"
            type="image"
            icon={"fas fa-trash-alt fa-2x"}
            color="#C0C0C0"
            onClick={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default RecordButtons;
