import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/cartContext';
import axios from 'axios';

const CheckOut = () => {
  const { user } = useAuth();
  const { cart, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);

  const createOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Debes iniciar sesión para realizar una compra');
      return;
    }

    setLoading(true);
    try {
      const objOrder = {
        items: cart.map(item => ({
          product_id: item.id,  
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        total,
        userId: user.uid,
        userEmail: user.email,
        date: new Date().toISOString(),
        status: 'created',
        buyer_info: {  
          name: user.displayName || '',
          email: user.email,
          uid: user.uid,
        },
        type: 'venta',
      };

      const response = await axios.post('http://localhost:3001/api/orders', objOrder);  // Pasar el objeto de la orden

      if (response.data && response.data.id) {
        setOrderId(response.data.id);
        clearCart();
      }
    } catch (error) {
      console.error('Error al crear la orden:', error);
      setError(error.response?.data?.message || 'Error al procesar la orden');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (cart.length === 0 && !orderId) {
      setError("El carrito está vacío. Agrega productos antes de proceder.");
    }
  }, [cart, orderId]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info">
          Se está generando su orden...
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

  if (orderId) {
    return (
      <div className="container mt-4">
        <div className="alert alert-success">
          ¡Orden generada exitosamente! ID: {orderId}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Finalizar Compra</h2>
      {cart.map((item) => (
        <div key={item.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">
              Cantidad: {item.quantity} - Precio unitario: ${item.price}
            </p>
          </div>
        </div>
      ))}
      <div className="card">
        <div className="card-body">
          <h3>Total: ${total}</h3>
          <button 
            className="btn btn-primary"
            onClick={createOrder}
            disabled={cart.length === 0 || loading}
          >
            Confirmar Orden
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
