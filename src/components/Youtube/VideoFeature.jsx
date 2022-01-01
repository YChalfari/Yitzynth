import React from "react";
import Synth from "../Synth";

const VideoFeature = ({ video }) => {
  const EMBED = "https://www.youtube.com/embed/";
  return !video ? (
    <div className="message">
      Search for a video and try playing along with your favorite song!
    </div>
  ) : (
    <div>
      <div className="ui embed">
        <iframe title="selected video" src={`${EMBED}${video.link}`}></iframe>
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.title}</h4>
        <p>{video.description}</p>
      </div>
      <Synth />
    </div>
  );
};

export default VideoFeature;
