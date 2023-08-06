import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/components/logReg/login";
import Registration from "../src/components/logReg/registration";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/registration" element={<Registration/>} />
      </Routes>
    </Router>
  );
};

export default App;
