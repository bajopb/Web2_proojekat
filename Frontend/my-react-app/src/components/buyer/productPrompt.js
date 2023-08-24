import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const ProductPrompt = ({ product, onClose, onOrder }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
      
    onOrder(product, quantity);
    onClose();
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Poručivanje: {product.name}</DialogTitle>
      <DialogContent>
        <p>Cena: ${product.price}</p>
        <label>Količina:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddToCart} color="primary" autoFocus>
          Dodaj u korpu
        </Button>
        <Button onClick={onClose} color="secondary">
          Odustani
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductPrompt;
