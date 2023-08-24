import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import jwt_decode from "jwt-decode";
import './myOrders.css'; // Importujte CSS datoteku za stilizaciju

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    const decodedToken = jwt_decode(token);
    const id = decodedToken.Id;
    api.get(`/api/Buyer/orderHistory/${id}`).then((response) => {
      setOrders(response.data);
    });
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await api.post(`/api/Buyer/cancelOrder/${orderId}`);
      if (response.data.success) {
        const updatedOrders = orders.map(order => {
          if (order.id === orderId) {
            order.isCancelled = true;
          }
          return order;
        });
        setOrders(updatedOrders);
      }
      alert(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const isFutureOrder = (deliveryTime) => {
    const currentTime = new Date();
    const deliveryDateTime = new Date(deliveryTime);
    return deliveryDateTime > currentTime;
  };

  return (
    <div className="my-orders-container">
      <h2>Moje Porudžbine</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <div className={`order-card ${order.isCancelled ? 'cancelled' : ''}`}>
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
              {!order.isCancelled && isFutureOrder(order.deliveryTime) && (
                <button onClick={() => handleCancelOrder(order.id)}>Otkaži porudžbinu</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrders;
