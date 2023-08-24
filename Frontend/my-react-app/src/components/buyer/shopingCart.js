import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import jwt_decode from 'jwt-decode';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = ({ cartItems, removeItem, clearCart }) => {
  const [openPrompt, setOpenPrompt] = useState(false);
  const [comment, setComment] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
    const navigate=useNavigate();
  const handleOrder = async () => {
    
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const id = decodedToken.Id; 
    const orderDto = {
      DeliveryAddress: deliveryAddress,
      Comment: comment,
      UserId: id,
      Items: cartItems.map(item => ({
        ProductId: item.productId,
        Amount: item.amount,

      })),
    };

    try {
      const response = await api.post('/api/Buyer/newOrder', orderDto);
      console.log(response.data);
      clearCart(); 
      setOpenPrompt(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="shopping-cart">
      <h2>Korpa</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            <span>{item.name}</span>
            <span>{item.amount}</span>
            <button onClick={() => removeItem(index)}>Ukloni</button>
          </li>
        ))}
      </ul>
      <div className="cart-actions">
        <button onClick={() => setOpenPrompt(true)}>Naruči</button>
      </div>
      {openPrompt && (
        <Dialog open={true} onClose={() => setOpenPrompt(false)}>
          <DialogTitle>Naručivanje</DialogTitle>
          <DialogContent>
            <label>Komentar:</label>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <br />
            <label>Adresa dostave:</label>
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOrder} color="primary">
              Naruči
            </Button>
            <Button onClick={() => setOpenPrompt(false)} color="secondary">
              Odustani
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ShoppingCart;
