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
import axios from "axios";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Utiliza la URL base desde la variable de entorno
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);

        console.log("Respuesta de la API:", response.data);

        // Validación: verifica que sea un arreglo
        const data = Array.isArray(response.data) ? response.data : [];
        setProducts(data.filter((product) => product.stock > 0)); // Filtra productos con stock
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title} - Stock: {product.stock}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemListContainer;
