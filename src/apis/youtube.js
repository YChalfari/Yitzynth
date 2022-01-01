import axios from "axios";
const KEY = "AIzaSyAlfoFVfBDfNGxvM3xD60pgMIO2zy2u87M";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key: KEY,
    type: "video",
  },
});
