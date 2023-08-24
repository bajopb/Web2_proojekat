import React, { useState, useEffect } from 'react';
import './orderPage.css'; 
import ProductPrompt from '../buyer/productPrompt.js';
import api from '../../api/axios';
import ShoppingCart from './shopingCart';

const OrderPage = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [openPrompt, setOpenPrompt] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    api.get('/api/Buyer/getAllProducts').then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setOpenPrompt(true);
  };

  const handleClosePrompt = () => {
    setOpenPrompt(false);
  };

  const handleAddToCart = (product, quantity) => {

    const cartItem = {
      productId: product.id,
      amount: quantity,
      name: product.name,
      price: product.price,
    };
    setCartItems((prevItems) => [...prevItems, cartItem]);
    setOpenPrompt(false);
  };


  const cleanCart=()=>{
    setCartItems([]);
    setOpenCart(false);
  }

  const handleRemoveFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const convertImage = (img) => {
    return `data:image/jpg;base64,${img}`;
  };

  return (
    <div className="orderPage">
      <div className="shopping-cart-icon">
        <img src={`${process.env.PUBLIC_URL}/cart.jpg`} className='cartIcon' alt="Korpa" onClick={() => setOpenCart(true)} />
      </div>

      {openCart && (
        <div className="cart-prompt">
          <div className="cart-header">
            <button onClick={() => setOpenCart(false)}>Zatvori</button>
          </div>
          <ShoppingCart cartItems={cartItems} removeItem={handleRemoveFromCart} clearCart={cleanCart}/>
          <div className="cart-actions">
            <button onClick={() => setCartItems([])}>Isprazni korpu</button>
          </div>
        </div>
      )}

      <div className="productList">
        {products.map((product) => (
          <div key={product.id} className="productItem">
            <img src={product.image && convertImage(product.image)} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Cena: ${product.price.toFixed(2)}</p>
            <button onClick={() => handleOrderClick(product)}>Poruči</button>
          </div>
        ))}
      </div>

      {openPrompt && (
        <ProductPrompt
          product={selectedProduct}
          onClose={handleClosePrompt}
          onOrder={handleAddToCart}
          cartItems={cartItems} // Dodato
        />
      )}
    </div>
  );
};

export default OrderPage;
