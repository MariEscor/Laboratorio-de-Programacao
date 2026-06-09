import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Eventos from "./Components/Eventos/Eventos";

import "./App.css"; // ⚠️ importante

function App() {
  return (
    <div className="App"> {/* 👈 ISSO resolve seu problema */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/eventos" element={<Eventos />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;