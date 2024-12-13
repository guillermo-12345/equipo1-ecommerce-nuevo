import React, { useEffect, useState } from 'react';
import axios from '../service/axiosConfig';
import Item from '../Item/Item';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/products');
      console.log("Productos obtenidos:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      console.log('Intentando eliminar producto con ID:', id);
      await axios.delete(`/products/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert('Error al eliminar el producto. Por favor, inténtalo de nuevo.');
    }
  };

  const handleEditProduct = (id) => {
    navigate(`/form/product/${id}`);
  };

  const navigateToForm = (type) => {
    navigate(`/form/${type}`);
  };

  const handleSendProductUpdateEmail = async () => {
    try {
      await axios.post('/api/email/sendProductsUpdate', {
        products,
        message: 'Estos son los productos disponibles actualmente en nuestra tienda. Por favor, actualice su perfil si faltan datos.'
      });
      alert('Correo enviado con éxito a todos los usuarios.');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      alert('Hubo un error al enviar el correo.');
    }
  };

  return (
    <div className="product-list-container">
      <h2>Lista de Productos</h2>
      <div className="form-selection-buttons">
        <button onClick={() => navigateToForm("product")} className="btn btn-primary m-2">Agregar Producto</button>
        <button onClick={handleSendProductUpdateEmail} className="btn btn-secondary m-2">Enviar Actualización de Productos</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="d-flex flex-wrap justify-content-around">
          {products.length > 0 ? (
            products.map((product) => (
              <Item
                key={product.id}
                id={product.id}
                title={product.title}
                img={product.img}
                price={product.price}
                purchasePrice={product.purchasePrice}
                description={product.description}
                showEditButton={true}
                showDeleteButton={true}
                onEdit={() => handleEditProduct(product.id)}
                onDelete={handleDeleteProduct}
                className="product-item"
              />
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
