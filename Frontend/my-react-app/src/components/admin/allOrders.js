import React, { useState, useEffect } from 'react';
import Order from '../seller/parts/order'; 
import api from '../../api/axios'; 
import jwt_decode from 'jwt-decode';  
const OrderListAdmin = () => {
  const [orders, setOrders] = useState([]);
  const token=localStorage.getItem('token');

  useEffect(() => {
    // Poziv API-a za dohvaćanje svih porudžbina
    
    api.get(`/api/Admin/getAllOrders/`).then((response) => {
      const allOrders = response.data;
      setOrders(allOrders);
      console.log(allOrders);
    });
  }, [token]);

  return (
    <div>
      <h2>Order List</h2>
      {orders.length === 0 ? (
        <p>No orders available.</p>
) : (
  orders.map((order) => (
    <Order key={order.id} order={order} />
  ))
)}
    </div>
  );
};

export default OrderListAdmin;
