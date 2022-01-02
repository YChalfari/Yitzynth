import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import Freestyle from "./pages/Freestyle";
import LearnToPlay from "./pages/LearnToPlay";
import YoutubePlayground from "./pages/YoutubePlayground";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/youtube" element={<YoutubePlayground />} />
            <Route path="/freestyle" element={<Freestyle />} />
            <Route path="/l2p" element={<LearnToPlay />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
