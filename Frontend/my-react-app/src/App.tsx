import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/components/logReg/login";
import Registration from "../src/components/logReg/registration";
import Dashboard from "./components/dashboard/dashboard";
import AuthContext from "./context/contextProvider";
import {useContext} from 'react';
import AddItem from "./components/seller/addItem";


const App = () => {
  const context=useContext(AuthContext)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/dashboard" element={context.token? <Dashboard/>:<Login/>}/>
      </Routes>
    </Router>
  );
};

export default App;
