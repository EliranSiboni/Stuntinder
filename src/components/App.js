import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CardStack from "./CardStack";
import Stunts from "./Stunts";

import "../styles/App.css";
import Header from "./Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<CardStack />} />
          <Route path="stunts" element={<Stunts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
