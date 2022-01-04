import React from "react";

const Button = ({ type, text, onClick, icon, color }) => {
  return (
    <button onClick={onClick} className={type === "image" ? "img-btn" : "btn"}>
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
