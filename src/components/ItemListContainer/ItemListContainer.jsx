/* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ItemList from "../ItemList/ItemList";
import { useParams } from 'react-router-dom';

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams(); 

  const fetchProducts = async () => {
    try {
      const response = await axios.get('api/products');
      const productsInStock = response.data.filter(product => product.stock > 0);

   
      const filteredProducts = categoryId
        ? productsInStock.filter(product => product.category.toLowerCase() === categoryId.toLowerCase())
        : productsInStock;

      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId]); // Vuelve a ejecutar cada vez que cambie la categoría

  return (
    <div>
      <h1>{greeting}</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ItemList products={products} />
      )}
    </div>
  );

  
};

export default ItemListContainer;


 */
import React, { useEffect, useState } from 'react';
import axiosInstance from '../service/axiosConfig';
import ItemList from "../ItemList/ItemList";
import { useParams } from 'react-router-dom';

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Test the health endpoint first
        await axiosInstance.get('/api/health');
        
        // If health check passes, fetch products
        const response = await axiosInstance.get('/api/products');
        const productsInStock = response.data.filter(product => product.stock > 0);
        
        const filteredProducts = categoryId
          ? productsInStock.filter(product => 
              product.category.toLowerCase() === categoryId.toLowerCase())
          : productsInStock;

        setProducts(filteredProducts);
        setError(null);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        setError(
          error.response 
            ? `Error del servidor: ${error.response.status} - ${error.response.data?.message || 'Error desconocido'}`
            : 'Error de conexión al servidor'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      <h1>{greeting}</h1>
      {products.length === 0 ? (
        <p>No hay productos disponibles en este momento.</p>
      ) : (
        <ItemList products={products} />
      )}
    </div>
  );
};

export default ItemListContainer;

