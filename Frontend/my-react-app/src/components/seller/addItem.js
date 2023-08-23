import React, { useState } from 'react';
import './addItem.css'; // Učitajte CSS fajl za stilizaciju
import api from '../../api/axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';


const AddItem = () => {
  const [productInfo, setProductInfo] = useState({
    name: '',
    price: '',
    amount: '',
    description: '',
    imageFile: '',
    });
  
  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo(prevProductInfo => ({
      ...prevProductInfo,
      [name]: value
    }));
  };

  const handleSubmit  =async (e) => {
    e.preventDefault();
    // Implementirajte logiku za slanje podataka na server

    if(!productInfo.name )
    {
      alert("1Sva polja su obavezna");
      return;
    }
    if( !productInfo.amount )
    {
      alert("2Sva polja su obavezna");
      return;
    }
    if(!productInfo.price )
    {
      alert("3Sva polja su obavezna");
      return;
    }
    if(!productInfo.description )
    {
      alert("4Sva polja su obavezna");
      return;
    }
    
    if(productInfo.amount<1){
      alert("Kolicina proizvoda mora biti bar 1.");
      return;
    }

    if(productInfo.price<0){
      alert("Cena ne moze biti negativna");
      return;
    }

    const token=localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const id = decodedToken.Id;
    console.log(id);
    const formData=new FormData();
        formData.append("name", productInfo.name);
        formData.append("amount", productInfo.amount);
        formData.append("price", productInfo.price);
        formData.append("description", productInfo.description);
        formData.append("imagefile", productInfo.imageFile);
        formData.append("sellerid", id);
    
    const result = await api.post('api/Seller/addProduct', formData, { headers: { "Content-Type":"multipart/form-data" }
      });
     console.log(result);
    if(result.status===200){
        alert("Uspesno ste dodali proizvod");
        setProductInfo({
          name: '',
          price: '',
          amount: '',
          description: '',
          imageFile: ''
      });        navigate("/dashboard");
    }
  };
  const convertImage = (img) => {
    return `data:image/jpg;base64,${img}`;
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
        <div>
          <img
            title="Image"
            alt="Add"
            src={productInfo.imageFile ? URL.createObjectURL(productInfo.imageFile) : productInfo.image && convertImage(productInfo.image)}
            className="image"
          />
        </div>
        <div className="inputDiv">
          <label htmlFor="image">Slika</label>
          <input
            type="file"
            id="image"
            name="imageFile"

            onChange={(e) => {
              setProductInfo({ ...productInfo, imageFile: e.target.files[0] });
            }}
            accept='image/*'
          />
        </div>

        

        <button className="submitButton" type="submit">Dodaj proizvod</button>
      </form>
    </div>
  );
}

export default AddItem;
