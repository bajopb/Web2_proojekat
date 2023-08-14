import React, { useState } from 'react';
import PromptOrderList from './promptOrderList'; 
import Button from '@material-ui/core/Button';
import ListIcon from '@material-ui/icons/List';
import styles from '../parts/order.css'

const Order = ({ order }) => {
  const [openPrompt, setOpenPrompt] = useState(false);

  const handleOpenPrompt = () => {
    setOpenPrompt(true);
  };

  const handleClosePrompt = () => {
    setOpenPrompt(false);
  };

  return (
    <div className="orderDiv">
      <div className="orderInfo">
        <div className='deliveryAddressDiv'>
            <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
        </div>
        <div className='deliveryTimeDiv'>
            <p><strong>Delivery Time:</strong> {order.deliveryTime}</p>
            </div>
        <div className='commentDiv'>
            <p><strong>Comment:</strong> {order.comment}</p>
            </div>
        <div className='orderPriceDiv'>
            <p><strong>Order Price:</strong> {order.orderPrice}</p>
        </div>
        <div className='userIdDiv'>
            <p><strong>User ID:</strong> {order.userId}</p>
        </div>
    </div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ListIcon />}
        onClick={handleOpenPrompt}
      >
        Show Items
      </Button>

      {openPrompt && (
        <PromptOrderList items={order.items} onClose={handleClosePrompt} />
      )}
    </div>
  );
};

export default Order;
