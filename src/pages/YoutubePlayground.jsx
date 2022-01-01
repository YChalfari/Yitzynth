import React from "react";

import SearchBar from "../components/Youtube/SearchBar";
import VideoList from "../components/Youtube/VideoList";
import VideoFeature from "../components/Youtube/VideoFeature";
import youtube from "../apis/youtube";

class YoutubePlayground extends React.Component {
  state = { videos: [], selectedVideo: null };

  onTermSubmit = async (term) => {
    const response = await youtube.get("/search", { params: { q: term } });
    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  };
  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };
  render() {
    return (
      <div className="youtube-page">
        <div className="ui container">
          <SearchBar onTermSubmit={this.onTermSubmit} />
          <div className="ui grid">
            <div className="ui row">
              <div className="eleven wide column">
                <VideoFeature video={this.state.selectedVideo} />
              </div>
              <div className="five wide column">
                <VideoList
                  videos={this.state.videos}
                  onVideoSelect={this.onVideoSelect}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default YoutubePlayground;
