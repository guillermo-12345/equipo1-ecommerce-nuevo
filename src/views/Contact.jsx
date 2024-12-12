import React, { useState } from 'react';
import StoreLocationMap from "../components/StoreLocationMap/StoreLocationMap"
export const Contact = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Name:', name);
    console.log('LastName:', lastName);
    console.log('Email:', email);
    console.log('Message:', message);
    
    alert('Hola ' + name + ' ' + lastName + ', gracias por ponerte en contacto con nosotros. A la brevedad te estaremos respondiendo.');
    setSubmitted(true);
  };

  return (
    <div className="container mt-5">
      <h2>Contacto</h2>
      {submitted ? (
        <div className="alert alert-success" role="alert">
          ¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.
        </div>
      ) : (
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label">Apellido</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="message" className="form-label">Mensaje</label>
            <textarea
              className="form-control"
              id="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">Enviar</button>
          </div>
          <div className="contact-page">
      <h2>Ubicación de Nuestra Tienda</h2>
      <StoreLocationMap />
      <div className="store-details">
        <h3>Detalles de la Tienda</h3>
        <p>Dirección: Calle Falsa 123, Ciudad Fake, País X</p>
        <p>Teléfono: +123 456 789</p>
        <p>Email: contacto@equipo1ecommerce.com</p>
      </div>
    </div>
        </form>
        
      )}
    </div>
  );
};

export default Contact;