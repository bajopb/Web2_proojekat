import React from 'react';
import classes from '../parts/item.css';

const Item = ({ name, price }) => {
  return (
    <div className="item">
      <div className="itemName">{name}</div>
      <div className="itemPrice">${price.toFixed(2)}</div>
    </div>
  );
};

export default Item;
