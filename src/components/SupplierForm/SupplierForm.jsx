import React, { useState, useEffect } from 'react';
import axios from '../service/axiosConfig';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const SupplierForm = ({ initialData = {}, onSave }) => {
  const [supplier, setSupplier] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Para obtener el ID si estamos editando un proveedor existente
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Si hay un ID, estamos en modo edición: cargar datos del proveedor
      fetchSupplierById(id);
    }
  }, [id]);

  const fetchSupplierById = async (supplierId) => {
    try {
      setLoading(true);
      const response = await axios.get(`/suppliers/${supplierId}`);
      setSupplier(response.data);
    } catch (error) {
      console.error('Error al obtener el proveedor:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prevSupplier) => ({
      ...prevSupplier,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        // Actualización de proveedor existente
        const response = await axios.put(`/suppliers/${id}`, supplier);
        console.log('Proveedor actualizado:', response.data);
        onSave && onSave(response.data);
      } else {
        // Creación de nuevo proveedor
        const response = await axios.post('/suppliers', supplier);
        console.log('Proveedor creado:', response.data);
        onSave && onSave(response.data);
      }
      navigate('/suppliers'); // Navegar de vuelta a la lista de proveedores
    } catch (error) {
      console.error('Error al agregar o actualizar el proveedor:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>{id ? 'Editar Proveedor' : 'Agregar Proveedor'}</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre del Proveedor:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={supplier.name || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Teléfono:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="form-control"
                value={supplier.phone || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={supplier.email || ''}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Categoría:</label>
              <input
                type="text"
                id="category"
                name="category"
                className="form-control"
                value={supplier.category || ''}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Guardando...' : id ? 'Actualizar Proveedor' : 'Agregar Proveedor'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupplierForm;

