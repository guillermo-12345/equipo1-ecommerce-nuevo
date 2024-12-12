import React, { useState, useEffect } from 'react';
import axios from '../service/axiosConfig';
import { Table, Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/clients');
        setClientes(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  const handleDeleteCliente = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      setLoading(true);
      try {
        await axios.delete(`/clients/${id}`);
        setClientes((prevClientes) => prevClientes.filter((cliente) => cliente.id !== id));
      } catch (error) {
        console.error('Error deleting client:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditCliente = (id) => {
    navigate(`/form/client/${id}`);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Lista de Clientes</h2>
      <Link to="/form/client" className="btn btn-primary mb-3">Nuevo Cliente</Link>
      {clientes.length === 0 ? (
        <p>No hay clientes disponibles.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>CUIT</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.name}</td>
                <td>{cliente.cuit}</td>
                <td>{cliente.email}</td>
                <td>
                  <Button className="btn-warning me-2" onClick={() => handleEditCliente(cliente.id)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteCliente(cliente.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ClientesList;
