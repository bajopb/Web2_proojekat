import React, { useState, useEffect } from 'react';
import Order from '../seller/parts/order'; 
import api from '../../api/axios.js'; 
import jwt_decode from 'jwt-decode';  
const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const token=localStorage.getItem('token');

  useEffect(() => {
    // Poziv API-a za dohvaćanje svih porudžbina
    const decodedToken = jwt_decode(token);
    const id = decodedToken.Id;
    api.get(`/api/Seller/orderHistory/${id}`).then((response) => {
      console.log(id);
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

export default OrderList;
