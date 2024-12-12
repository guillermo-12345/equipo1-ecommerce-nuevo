import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    price: '',
    img: '',
    stock: ''
  });

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
      const response = await axios.post('http://localhost:3001/api/productos', formData); 
      console.log('Producto agregado:', response.data);
      setFormData({
        category: '',
        title: '',
        description: '',
        price: '',
        img: '',
        stock: ''
      });
    } catch (error) {
      console.error('Error al agregar el producto:', error);
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

      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default AddProductForm;
