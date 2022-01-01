import Home from "./pages/Home";
import YoutubePlayground from "./pages/YoutubePlayground";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      YITZINTH
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/youtube" element={<YoutubePlayground />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
