import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProductForm = ({ productId }) => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    price: '',
    img: '',
    stock: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/products/${productId}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/products/${productId}`, formData);
      console.log('Producto actualizado');
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Categoría:</label>
      <input type="text" name="category" value={formData.category} onChange={handleChange} required />

      <label>Título:</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} required />

      <label>Descripción:</label>
      <textarea name="description" value={formData.description} onChange={handleChange} required />

      <label>Precio:</label>
      <input type="number" name="price" value={formData.price} onChange={handleChange} required />

      <label>Imagen URL:</label>
      <input type="text" name="img" value={formData.img} onChange={handleChange} required />

      <label>Stock:</label>
      <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />

      <button type="submit">Actualizar Producto</button>
    </form>
  );
};

export default UpdateProductForm;
