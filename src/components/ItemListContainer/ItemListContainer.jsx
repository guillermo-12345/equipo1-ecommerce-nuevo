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

import React, { useEffect, useState } from "react";
import axios from "../service/axiosConfig";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/products");
        console.log("API Response:", response);

        if (Array.isArray(response.data)) {
          setProducts(response.data.filter((product) => product.stock > 0));
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        setError(`Error al cargar los productos: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Lista de Productos</h1>
      {products.length === 0 ? (
        <p>No hay productos disponibles en este momento.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.title} - Stock: {product.stock}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemListContainer;

