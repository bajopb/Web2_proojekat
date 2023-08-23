import React, { useState, useEffect } from 'react';
import './orderPage.css'; 
import ProductPrompt from '../buyer/productPrompt.js';
import api from '../../api/axios'; 

const OrderPage = () => {
  const [products, setProducts] = useState([]);
  const [openPrompt, setOpenPrompt] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Poziv API-a za dohvaćanje svih proizvoda
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
  const convertImage = (img) => {
    return `data:image/jpg;base64,${img}`;
  };
  return (
    <div className="orderPage">
      <h1>Katalog Proizvoda</h1>
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
        />
      )}
    </div>
  );
};

export default OrderPage;
