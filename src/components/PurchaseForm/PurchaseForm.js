import React, { useState, useEffect } from 'react';
import axios from '../service/axiosConfig';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

const PurchaseForm = ({ supplierId }) => {
  const [supplier, setSupplier] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (supplierId) {
      fetchSupplier(supplierId);
    }
  }, [supplierId]);

  const fetchSupplier = async (id) => {
    try {
      const supplierResponse = await axios.get(`/suppliers/${id}`);
      setSupplier(supplierResponse.data);
      const productsResponse = await axios.get(`/products/by-category?category=${supplierResponse.data.category}`);
      setProducts(productsResponse.data);
    } catch (err) {
      console.error('Error fetching supplier or products:', err);
      setError('No se pudo obtener la información del proveedor o productos');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!selectedProduct) {
        setError('Debe seleccionar un producto');
        return;
      }

      const quantityNum = parseFloat(quantity);
      const priceNum = parseFloat(selectedProduct.price);

      if (isNaN(quantityNum) || quantityNum <= 0) {
        setError('La cantidad debe ser un número mayor a 0');
        return;
      }

      if (isNaN(priceNum) || priceNum <= 0) {
        setError('El precio debe ser un número válido');
        return;
      }

      const calculatedTotal = parseFloat((quantityNum * priceNum).toFixed(2));

      if (isNaN(calculatedTotal) || calculatedTotal <= 0) {
        setError('Error al calcular el total');
        return;
      }

      const purchaseData = {
        supplierId: parseInt(supplierId),
        productId: parseInt(selectedProduct.id),
        quantity: quantityNum,
        price: priceNum,
        total: calculatedTotal,
        type: 'compra',
        buyer_info: JSON.stringify({
          supplierId: parseInt(supplierId),
          productId: parseInt(selectedProduct.id),
          quantity: quantityNum,
          price: priceNum,
          total: calculatedTotal,
          productName: selectedProduct.title
        })
      };

      console.log('Datos a enviar:', JSON.stringify(purchaseData, null, 2));

      const response = await axios.post('/purchases', purchaseData); // Asegurar la URL completa

    if (response.data) {
      navigate('/purchase-report');
    }
  } catch (error) {
    console.error('Error completo:', error);
    setError('Error al registrar la compra. Por favor, intente nuevamente.');
  } finally {
    setLoading(false);
  }
};

  const handleProductChange = (e) => {
    const productId = parseInt(e.target.value);
    const product = products.find(p => p.id === productId);
    
    if (product) {
      const productPrice = parseFloat(product.price);
      
      if (isNaN(productPrice)) {
        setError('Precio del producto inválido');
        return;
      }
      
      setSelectedProduct({
        ...product,
        price: productPrice
      });
      
      const quantityNum = parseFloat(quantity || 0);
      const newTotal = parseFloat((quantityNum * productPrice).toFixed(2));
      setTotal(isNaN(newTotal) ? 0 : newTotal);
      setPrice(productPrice.toString());
    } else {
      setSelectedProduct(null);
      setTotal(0);
      setPrice('');
    }
    
    setError('');
  };

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);

    if (selectedProduct && newQuantity) {
      const calculatedTotal = parseFloat(selectedProduct.price) * parseFloat(newQuantity);
      setTotal(parseFloat(calculatedTotal.toFixed(2)));
    } else {
      setTotal(0);
    }
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPrice(newPrice);

    if (quantity && newPrice) {
      const newTotal = parseFloat((Number(quantity) * Number(newPrice)).toFixed(2));
      setTotal(newTotal);
    } else {
      setTotal(0);
    }
    setError('');
  };

  return (
    <Card className="p-4 mx-auto my-4" style={{ maxWidth: '600px' }}>
      <Card.Body>
        <Card.Title>Nueva Compra</Card.Title>
        {supplier && <Card.Subtitle className="mb-4">Proveedor: {supplier.name}</Card.Subtitle>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Producto:</Form.Label>
            <Form.Select
              value={selectedProduct?.id || ''}
              onChange={handleProductChange}
            >
              <option value="">Selecciona un Producto Existente</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cantidad:</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio unitario:</Form.Label>
            <Form.Control
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={handlePriceChange}
              disabled={!!selectedProduct}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Total:</Form.Label>
            <Form.Control
              type="number"
              value={total}
              disabled
            />
          </Form.Group>

          <Button type="submit" disabled={!selectedProduct || !quantity || total <= 0}>
            Confirmar Compra
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default PurchaseForm;