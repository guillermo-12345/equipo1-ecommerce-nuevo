import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/email/sendContactEmail', formData);
      alert('Mensaje enviado con éxito');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error enviando el mensaje:', error);
      alert('Hubo un error al enviar el mensaje');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded">
      <h2>Formulario de Contacto</h2>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Teléfono</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="message">
        <Form.Label>Mensaje</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">Enviar</Button>
    </Form>
  );
};

export default ContactForm;
