import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const ProductPrompt = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const handleOrder = () => {
    // Implementirajte logiku za poručivanje proizvoda
    console.log('Poručeno:', product.name);
    console.log('Količina:', quantity);
    console.log('Komentar:', comment);
    console.log('Adresa isporuke:', deliveryAddress);

    // Zatvorite prompt nakon poručivanja
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Poručivanje: {product.name}</DialogTitle>
      <DialogContent>
        <p>Cena: ${product.price.toFixed(2)}</p>
        <label>Količina:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <label>Komentar:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <label>Adresa isporuke:</label>
        <input
          type="text"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOrder} color="primary" autoFocus>
          Poruči
        </Button>
        <Button onClick={onClose} color="secondary">
          Odustani
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductPrompt;
