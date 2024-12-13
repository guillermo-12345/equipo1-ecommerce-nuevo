import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    id: '',
    name: '',
    email: '',
    cuit: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/clients/email/${user.email}`);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError('Error al obtener los datos del perfil');
      } finally {
        setLoading(false);
      }
    };

    if (user && user.email) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`/api/clients/${profile.id}`, profile);
      alert('Perfil actualizado correctamente');
    } catch (error) {
      console.error("Error actualizando el perfil:", error);
      setError('Hubo un error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info">
          Cargando información del perfil...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded">
      <h2>Perfil del Cliente</h2>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          readOnly
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="cuit">
        <Form.Label>CUIT</Form.Label>
        <Form.Control
          type="text"
          name="cuit"
          value={profile.cuit}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>Actualizar Perfil</Button>
    </Form>
  );
};

export default Profile;
