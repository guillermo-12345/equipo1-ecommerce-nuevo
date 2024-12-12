// FormPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PurchaseForm from '../PurchaseForm/PurchaseForm';
import SupplierForm from '../SupplierForm/SupplierForm';
import ProductForm from '../ProductForm/ProductForm';
import ClientesForm from '../ClientesForm/ClientesForm';
import axios from '../service/axiosConfig';

const FormPage = () => {
  const { type, id } = useParams();
  console.log('Tipo de formulario:', type);
  console.log('ID recibido:', id);

  const handleSavePurchase = async (purchaseData) => {
    try {
      const response = await axios.post('/purchases', purchaseData);
      alert('Compra registrada exitosamente');
      // Aquí puedes redirigir a otra página si lo deseas
    } catch (error) {
      console.error('Error al registrar la compra:', error);
      alert('Error al registrar la compra. Por favor, inténtelo de nuevo.');
    }
  };

  const renderForm = () => {
    switch (type) {
      case 'purchase':
        return <PurchaseForm supplierId={parseInt(id)} onSave={handleSavePurchase} />;
      case 'supplier':
        return <SupplierForm id={id} />;
      case 'product':
        return <ProductForm id={id} />;
      case 'client':
        return <ClientesForm id={id} />;
      default:
        return <div>Formulario no encontrado</div>;
    }
  };

  return (
    <div className="container mt-4">
      <h2>
        {type === 'purchase' ? 'Nueva Compra' : 
         type === 'supplier' ? (id ? 'Editar Proveedor' : 'Nuevo Proveedor') :
         type === 'product' ? (id ? 'Editar Producto' : 'Nuevo Producto') :
         type === 'client' ? (id ? 'Editar Cliente' : 'Nuevo Cliente') : 
         'Formulario'}
      </h2>
      {renderForm()}
    </div>
  );
};

export default FormPage;
