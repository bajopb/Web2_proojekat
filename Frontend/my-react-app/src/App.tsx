import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/components/logReg/login";
import Registration from "../src/components/logReg/registration";
import Dashboard from "./components/dashboard/dashboard";
import AuthContext from "./context/contextProvider";
import {useContext} from 'react';
import AddItem from "./components/seller/addItem.js";
import OrderListAdmin from "../src/components/admin/allOrders";
import OrderPage from "./components/buyer/orderPage";


const App = () => {
  



  const context=useContext(AuthContext);
 
  return (
   
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/addItem" element={<AddItem/>}/>
        <Route path="/orderItem" element={<OrderPage/>}/>
      </Routes>
  );
};

export default App;
