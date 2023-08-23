import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import jwt_decode from "jwt-decode";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const[token, setToken]=useState(localStorage.getItem("token"));
  useEffect(() => {
    const decodedToken = jwt_decode(token);
    const id = decodedToken.Id;
        api.get(`/api/Buyer/orderHistory/${id}`).then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Moje Porudžbine</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <div>Porudžbina ID: {order.id}</div>
            <div>Adresa isporuke: {order.deliveryAddress}</div>
            <div>Vreme isporuke: {order.deliveryTime}</div>
            <div>Cena porudžbine: ${order.orderPrice.toFixed(2)}</div>
            <div>Je otkazana: {order.isCancelled ? 'Da' : 'Ne'}</div>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  <div>Proizvod: {item.name}</div>
                  <div>Količina: {item.amount}</div>
                  <div>Cena: ${item.price.toFixed(2)}</div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrders;
