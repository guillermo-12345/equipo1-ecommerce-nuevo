import React, { useState, useEffect } from 'react';
import axios from '../service/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';

const ClientesForm = () => {
  const { id } = useParams(); // Obtener el id de los parámetros de la URL si es edición
  const [cliente, setCliente] = useState({ name: '', cuit: '', email: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchCliente = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/clients/${id}`);
          setCliente(response.data);
        } catch (error) {
          console.error('Error fetching client:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchCliente();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente((prevCliente) => ({
      ...prevCliente,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        // Si hay un id, significa que estamos actualizando un cliente
        await axios.put(`/clients/${id}`, cliente);
        console.log('Cliente actualizado:', cliente);
      } else {
        // Si no hay id, significa que estamos creando un nuevo cliente
        await axios.post('/clients', cliente);
        console.log('Cliente agregado:', cliente);
      }
      navigate('/clients'); // Redirigir a la lista de clientes después de guardar
    } catch (error) {
      console.error('Error al agregar o actualizar el cliente:', error);
    } finally {
      setLoading(false);
    }
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
      <h2>{id ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={cliente.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="cuit" className="mb-3">
          <Form.Label>CUIT</Form.Label>
          <Form.Control
            type="text"
            name="cuit"
            value={cliente.cuit}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={cliente.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Guardando...' : id ? 'Actualizar Cliente' : 'Agregar Cliente'}
        </Button>
      </Form>
    </div>
  );
};

export default ClientesForm;
