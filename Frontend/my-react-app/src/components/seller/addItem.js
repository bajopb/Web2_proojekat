import React, { useState } from 'react';
import './addItem.css'; // Učitajte CSS fajl za stilizaciju

const AddItem = () => {
  const [productInfo, setProductInfo] = useState({
    name: '',
    price: '',
    amount: '',
    description: '',
    image: '',
    sellerid: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo(prevProductInfo => ({
      ...prevProductInfo,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementirajte logiku za slanje podataka na server
  };

  return (
    <div className="addItemDiv">
      <h1>Dodaj novi proizvod</h1>
      <form className="productForm" onSubmit={handleSubmit}>
        <div className="inputDiv">
          <label htmlFor="name">Naziv</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productInfo.name}
            onChange={handleChange}
          />
        </div>

        <div className="inputDiv">
          <label htmlFor="price">Cena</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productInfo.price}
            onChange={handleChange}
          />
        </div>

        <div className="inputDiv">
          <label htmlFor="amount">Količina</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={productInfo.amount}
            onChange={handleChange}
          />
        </div>

        <div className="inputDiv">
          <label htmlFor="description">Opis</label>
          <textarea
            id="description"
            name="description"
            value={productInfo.description}
            onChange={handleChange}
          />
        </div>

        <div className="inputDiv">
          <label htmlFor="image">Slika</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </div>

        <div className="inputDiv">
          <label htmlFor="sellerid">ID prodavca</label>
          <input
            type="text"
            id="sellerid"
            name="sellerid"
            value={productInfo.sellerid}
            onChange={handleChange}
          />
        </div>

        <button className="submitButton" type="submit">Dodaj proizvod</button>
      </form>
    </div>
  );
}

export default AddItem;
