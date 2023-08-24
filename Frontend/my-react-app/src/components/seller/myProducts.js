import React, { useState, useEffect } from 'react';
import '../buyer/orderPage.css';
import api from '../../api/axios';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import jwt_decode from 'jwt-decode';  

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {

    const token=localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    const id = decodedToken.Id;
    api.get(`/api/Seller/getAllProducts/${id}`).then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleDeleteClick = async (productId) => {
    try {
      const response = await api.delete(`/api/Seller/delete/${productId}`);
      alert(response.data.result);
  
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    } catch (error) {
      console.error(error);
    }
  };
  const updateProductInList = (updatedProduct) => {
    setProducts(prevProducts => {
      return prevProducts.map(product => {
        if (product.id === updatedProduct.id) {
          return updatedProduct;
        }
        return product;
      });
    });
  };
  
  const handleEditProduct = async () => {
    try {
      // Kreirajte FormData objekat kako biste pravilno poslali sliku
      const formData = new FormData();
      formData.append('Id', selectedProduct.id);
      formData.append('Name', selectedProduct.name);
      formData.append('Price', selectedProduct.price);
      formData.append('Amount', selectedProduct.amount);
      formData.append('Description', selectedProduct.description);
      if (selectedProduct.imageFile) {
        formData.append('ImageFile', selectedProduct.imageFile);
      }
      
      const response = await api.put('/api/Seller/editProduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      updateProductInList({ ...selectedProduct });
    alert(response.data);
    handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProduct(null);
  };

  const convertImage = (img) => {
    return `data:image/jpg;base64,${img}`;
  };

  return (
    <div className="orderPage">
      <div className="productList">
        {products.map((product) => (
          <div key={product.id} className="productItem">
            <img src={product.image && convertImage(product.image)} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Cena: ${product.price}</p>
            <Button onClick={() => handleEditClick(product)} color="primary">
              Izmeni
            </Button>
            <Button onClick={() => handleDeleteClick(product.id)} color="secondary">
              Obriši
            </Button>
          </div>
        ))}
      </div>

      <Modal open={openModal} onClose={handleCloseModal}>
  <div className="edit-product-modal">
    {selectedProduct && (
      <div className="edit-product-content">
        <h2>Izmeni proizvod</h2>
        <label htmlFor="name">Ime:</label>
        <input
          type="text"
          id="name"
          value={selectedProduct.name}
          onChange={(e) =>
            setSelectedProduct({ ...selectedProduct, name: e.target.value })
          }
        />
        <label htmlFor="price">Cena:</label>
        <input
          type="number"
          id="price"
          value={selectedProduct.price}
          onChange={(e) =>
            setSelectedProduct({ ...selectedProduct, price: e.target.value })
          }
        />
        <label htmlFor="amount">Količina:</label>
        <input
          type="number"
          id="amount"
          value={selectedProduct.amount}
          onChange={(e) =>
            setSelectedProduct({ ...selectedProduct, amount: e.target.value })
          }
        />
        <label htmlFor="description">Opis:</label>
        <textarea
          id="description"
          value={selectedProduct.description || ''}
          onChange={(e) =>
            setSelectedProduct({
              ...selectedProduct,
              description: e.target.value,
            })
          }
        />
        <label htmlFor="image">Slika:</label>
        <input
          type="file"
          id="image"
          onChange={(e) =>
            setSelectedProduct({
              ...selectedProduct,
              imageFile: e.target.files[0],
            })
          }
        />
        <div className="edit-product-buttons">
          <Button onClick={handleEditProduct} color="primary">
            Izmeni
          </Button>
          <Button onClick={handleCloseModal} color="secondary">
            Otkaži
          </Button>
        </div>
      </div>
    )}
  </div>
</Modal>

    </div>
  );
};

export default MyProducts;
