import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import users from "../../apis/users";
import Button from "../Button";
import Input from "../Input";
import "./recordbuttons.css";
const RecordButtons = ({
  isRecording,
  hasRecorded,
  handleRecord,
  handlePlay,
  handleStop,
  handleDelete,
  recordedArr,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [songTitle, setSongTitle] = useState("");
  const { user, setUser, isLoggedIn } = useContext(UserContext);
  const onSave = () => {
    setIsSaving((isSaving) => !isSaving);
  };
  const onCancel = () => {
    setIsSaving((isSaving) => !isSaving);
  };
  const onChange = (name, value) => {
    setSongTitle(value);
  };

  const handleSave = async () => {
    const updatedUser = {
      ...user,
      // songs: [{ title: "jam", song: recordedArr }],
    };
    updatedUser.songs
      ? updatedUser.songs.push({ title: `${songTitle}`, song: recordedArr })
      : (updatedUser.songs = [{ title: `${songTitle}`, song: recordedArr }]);
    try {
      const res = await users.put(`/${user.id}`, updatedUser);
      setUser(updatedUser);
      setIsSaving((isSaving) => !isSaving);
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(user);
  return (
    <>
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
            {isLoggedIn && (
              <Button
                text="Scrap"
                type="image"
                icon={"far fa-save fa-2x"}
                color="#C0C0C0"
                onClick={onSave}
              />
            )}
          </>
        )}
      </div>
      <div className="save-input">
        {isSaving && (
          <>
            <Input name={"Title"} onChange={onChange} />
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="save-btn" onClick={onCancel}>
              Cancel
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default RecordButtons;
