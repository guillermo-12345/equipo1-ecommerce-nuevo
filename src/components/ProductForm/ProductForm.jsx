import React, { useState, useEffect } from 'react';
import axios from '../service/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductForm = ({ initialData = {}, onSave }) => {
  const [product, setProduct] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Para obtener el ID si estamos editando un producto existente
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
     
      fetchProductById(id);
    }
  }, [id]);

  const fetchProductById = async (productId) => {
    try {
      setLoading(true);
      const response = await axios.get(`/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error al obtener el producto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        // Actualización de producto existente
        const response = await axios.put(`/products/${id}`, product);
        console.log('Producto actualizado:', response.data);
        onSave && onSave(response.data);
      } else {
        // Creación de nuevo producto
        const response = await axios.post('/products', product);
        console.log('Producto creado:', response.data);
        onSave && onSave(response.data);
      }
      navigate('/products'); 
    } catch (error) {
      console.error('Error al agregar o actualizar el producto:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>{id ? 'Editar Producto' : 'Agregar Producto'}</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Nombre del Producto:</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                value={product.title || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Descripción:</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                value={product.description || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Precio:</label>
              <input
                type="number"
                id="price"
                name="price"
                className="form-control"
                value={product.price || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="purchasePrice" className="form-label">Precio de Compra:</label>
              <input
                type="number"
                id="purchasePrice"
                name="purchasePrice"
                className="form-control"
                value={product.purchasePrice || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Categoría:</label>
              <input
                type="text"
                id="category"
                name="category"
                className="form-control"
                value={product.category || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stock" className="form-label">Stock:</label>
              <input
                type="number"
                id="stock"
                name="stock"
                className="form-control"
                value={product.stock || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="img" className="form-label">URL de Imagen:</label>
              <input
                type="text"
                id="img"
                name="img"
                className="form-control"
                value={product.img || ''}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="supplierId" className="form-label">ID del Proveedor:</label>
              <input
                type="number"
                id="supplierId"
                name="supplierId"
                className="form-control"
                value={product.supplierId || ''}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Guardando...' : id ? 'Actualizar Producto' : 'Agregar Producto'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
