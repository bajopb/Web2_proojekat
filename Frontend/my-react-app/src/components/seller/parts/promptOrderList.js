import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import ListIcon from '@material-ui/icons/List'; // Uvoz ikone liste iz materijalnog UI

const PromptOrderList = ({ items, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Order List</DialogTitle>
      <DialogContent>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <strong>Name:</strong> {item.name}, <strong>Price:</strong> {item.price}
            </li>
          ))}
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PromptOrderList;
