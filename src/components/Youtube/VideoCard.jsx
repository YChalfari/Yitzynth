import React from "react";
import "./VideoCard.css";
const VideoCard = (props) => {
  const video = { ...props };
  return (
    <div
      onClick={() => props.onVideoSelect(video)}
      className="video-card item "
    >
      <img className="ui image" src={props.img.url} alt={props.title} />
      <div className="content">
        <h4 className="header">{props.title}</h4>
        <p className="description">{props.description}</p>
      </div>
    </div>
  );
};
export default VideoCard;
