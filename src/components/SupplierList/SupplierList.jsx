import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Alert } from 'react-bootstrap';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/suppliers');
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      setError('Error al obtener la lista de proveedores. Verifica la conexión con el servidor.');
    }
  };

  const handleDeleteSupplier = async (id) => {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas eliminar este proveedor?');
    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:3001/api/suppliers/${id}`);
      setSuppliers((prevSuppliers) =>
        prevSuppliers.filter((supplier) => supplier.id !== id)
      );
    } catch (error) {
      console.error('Error deleting supplier:', error);
      setError('Error al eliminar el proveedor. Verifica si tiene productos asociados.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Lista de Proveedores</h2>
      <Button className="btn btn-primary mb-3" onClick={() => navigate('/form/supplier')}>Agregar Proveedor</Button>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length > 0 ? (
            suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.name}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.email}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => navigate(`/form/supplier/${supplier.id}`)}
                  >
                    Editar
                  </Button>{' '}
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteSupplier(supplier.id)}
                  >
                    Eliminar
                  </Button>
                  <Button className=' btn-info mx-2' onClick={() => navigate(`/form/purchase/${supplier.id}`)}>Comprar Producto</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                No hay proveedores disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default SupplierList;
