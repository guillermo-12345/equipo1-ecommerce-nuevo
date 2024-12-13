import React, { useState, useEffect } from "react";
import ApexCharts from "apexcharts";
import { Table, Form, Button, Row, FormSelect } from "react-bootstrap";
import axios from "axios";

const SalesReport = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [filters, setFilters] = useState({
    orderNumber: "",
    productName: "",
    category: "",
    startDate: "",
    endDate: "",
    mail: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersResponse, productsResponse] = await Promise.all([
          axios.get('/api/orders?type=venta'),
          axios.get('/api/products')
        ]);

        console.log("Orders Response:", ordersResponse.data);
        console.log("Products Response:", productsResponse.data);

        if (ordersResponse.data && Array.isArray(ordersResponse.data)) {
          setOriginalData(ordersResponse.data);
          setFilteredData(ordersResponse.data);
        } else {
          console.error("La respuesta de órdenes no es un array válido:", ordersResponse.data);
        }

        if (productsResponse.data && Array.isArray(productsResponse.data)) {
          setProductData(productsResponse.data);
        } else {
          console.error("La respuesta de productos no es un array válido:", productsResponse.data);
        }
      } catch (error) {
        console.error("Error obteniendo los datos de ventas y productos:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!filteredData.length) return;
  
    const chartData = filteredData.flatMap((order) =>
      order.items.map((product) => {
        const productInfo = productData.find(p => p.id === product.product_id);
        return {
          x: productInfo?.title || product.product_id || "Producto desconocido",
          y: product.quantity || 0
        };
      })
    );
  
    const options = {
      chart: {
        type: "donut",
        height: 350
      },
      series: chartData.map((data) => data.y),
      labels: chartData.map((data) => data.x),
      xaxis: {
        type: "category"
      }
    };
  
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  
    return () => chart.destroy();
  }, [filteredData, productData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleClearFilters = () => {
    setFilters({ orderNumber: "", productName: "", category: "", startDate: "", endDate: "", mail: "" });
    setFilteredData(originalData);
  };

  const applyFilters = () => {
    const filtered = originalData.filter(order => {
      const itemDate = new Date(order.date);
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;
      const orderBuyerName = order.buyer_info?.name?.toLowerCase() || "";

      return (
        (!filters.orderNumber || order.id.toString().includes(filters.orderNumber)) &&
        (!filters.productName || order.items.some(item => {
          const product = productData.find(p => p.id === item.product_id);
          return product && product.title && product.title.toLowerCase().includes(filters.productName.toLowerCase());
        })) &&
        (!filters.category || order.items.some(item => {
          const product = productData.find(p => p.id === item.product_id);
          return product && product.category && product.category.toLowerCase().includes(filters.category.toLowerCase());
        })) &&
        (!filters.mail || orderBuyerName.includes(filters.mail.toLowerCase())) &&
        (!startDate || itemDate >= startDate) &&
        (!endDate || itemDate <= endDate)
      );
    });
    setFilteredData(filtered);
  };

  return (
    <div className="justify-content-center container-fluid">
      <h1>Reporte de Ventas</h1>
      <Form className="container-fluid justify-content-center my-4">
        <Row className="justify-content-center">
          <Form.Group className="col-1" controlId="orderNumber">
            <Form.Label>Orden</Form.Label>
            <Form.Control
              type="text"
              name="orderNumber"
              value={filters.orderNumber}
              onChange={handleFilterChange}
            />
          </Form.Group>
          <Form.Group className="col-2" controlId="productName">
            <Form.Label>Nombre del producto</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              value={filters.productName}
              onChange={handleFilterChange}
            />
          </Form.Group>
          <Form.Group className="col-3" controlId="category">
            <Form.Label>Categoría</Form.Label>
            <FormSelect name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">Seleccionar categoría</option>
              {[...new Set(productData.map(product => product.category || "Sin categoría"))].map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </FormSelect>
          </Form.Group>
          <Form.Group className="col-2" controlId="startDate">
            <Form.Label>Fecha Inicio</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </Form.Group>
          <Form.Group className="col-2" controlId="endDate">
            <Form.Label>Fecha Fin</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </Form.Group>
          <Form.Group className="col-2" controlId="mail">
            <Form.Label>Mail del Cliente</Form.Label>
            <Form.Control
              type="text"
              name="mail"
              value={filters.mail}
              onChange={handleFilterChange}
            />
          </Form.Group>
        </Row>
        <Button className="mt-4" onClick={applyFilters}>Filtrar</Button>
        <Button className="mt-4 mx-3 btn btn-secondary" onClick={handleClearFilters}>Borrar Filtros</Button>
      </Form>
      <Table className="table-responsive table w-75 p-5 m-5" striped bordered hover>
        <thead>
          <tr>
            <th>Orden</th>
            <th>Cantidad</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Fecha</th>
            <th>Cliente</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((order) => (
            order.items.map((product, index) => {
              const productInfo = productData.find(p => p.id === product.product_id);
              return (
                <tr key={`${order.id}-${index}`}>
                  <td>{index === 0 ? order.id : ""}</td>
                  <td>{product.quantity}</td>
                  <td>{productInfo?.title || product.product_id}</td>
                  <td>{productInfo?.category || "Sin categoría"}</td>
                  <td>{index === 0 ? order.date : ""}</td>
                  <td>{index === 0 ? order.buyer_info?.name : ""}</td>
                </tr>
              );
            })
          ))}
        </tbody>
      </Table>
      <div id="chart"></div>
    </div>
  );
};

export default SalesReport;

