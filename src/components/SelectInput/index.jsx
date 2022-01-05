import React, { useState } from "react";
import "./selectinput.css";
const SelectInput = ({ list, handleSelect, text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(text);

  const handleListClick = (e) => {
    const value = e.currentTarget.innerText;
    setIsOpen((isOpen) => !isOpen);
    setSelected(value);
    handleSelect(value);
  };
  const renderOptions = () => {
    return (
      list &&
      list.map((song) => (
        <li
          key={song.title}
          className="dropdown-item"
          onClick={handleListClick}
        >
          {song.title}
        </li>
      ))
    );
  };
  return (
    <div className="dropdown-container">
      <div
        className="dropdown-item"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        {selected}
      </div>
      <ul className="dropdown-list">{isOpen && renderOptions()}</ul>
    </div>
  );
};

export default SelectInput;
