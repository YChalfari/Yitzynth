import React from "react";

const Button = ({ type, text, onClick, icon, color, cbarg }) => {
  return (
    <button
      onClick={() => onClick(cbarg)}
      className={type === "image" ? "img-btn" : "btn"}
    >
      {type === "image" ? (
        <>
          <i className={icon} style={{ color: `${color}` }}></i>
          {/* <p className="img-btn-text">{text}</p> */}
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
