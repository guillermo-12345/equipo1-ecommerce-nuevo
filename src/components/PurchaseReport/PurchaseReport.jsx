import React, { useState, useEffect } from "react";
import ApexCharts from "apexcharts";
import { Table, Form, Button, Row, FormSelect } from "react-bootstrap";
import axios from "../service/axiosConfig";


const PurchaseReport = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [filters, setFilters] = useState({
    orderNumber: "",
    productName: "",
    category: "",
    supplier: "",
    startDate: "",
    endDate: ""
  });

  useEffect(() => {
    fetchPurchases();

    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (filteredData.length > 0) {
      const chartContainer = document.querySelector("#chart");
      if (!chartContainer) {
        console.error("No se encontró el contenedor del gráfico");
        return;
      }
  
      const chartData = filteredData.flatMap((item) =>
        item.buyer_info ? [{
          x: item.buyer_info.productName || "Sin nombre",
          y: item.buyer_info.quantity || 0
        }] : []
      );
  
      const options = {
        chart: {
          type: "bar",
          height: 350
        },
        series: [{
          name: "Cantidad Comprada",
          data: chartData.map((data) => data.y)
        }],
        xaxis: {
          categories: chartData.map((data) => data.x)
        }
      };
  
      const chart = new ApexCharts(chartContainer, options);
      chart.render();
  
      return () => chart.destroy();
    }
  }, [filteredData]);

  const fetchPurchases = async () => {
    try {
      const response = await axios.get("/api/purchases");
      console.log("Datos recibidos de las compras:", response.data);
      if (response.data && Array.isArray(response.data)) {
        const purchases = response.data
          .filter(order => order.type === "compra")
          .map(order => {
            const buyer_info = order.buyer_info ? (typeof order.buyer_info === 'string' ? JSON.parse(order.buyer_info) : order.buyer_info) : null;
            return { ...order, buyer_info };
          });
  
        setFilteredData(purchases);
      } else {
        console.error("La respuesta no es un array válido:", response.data);
      }
    } catch (error) {
      console.error("Error obteniendo las compras:", error);
    }
  };
 

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("/api/suppliers");
      if (response.data && Array.isArray(response.data)) {
        setSuppliers(response.data);
      } else {
        console.error("La respuesta no es un array válido:", response.data);
      }
    } catch (error) {
      console.error("Error obteniendo los proveedores:", error);
    }
  };

  const getSupplierNameById = (supplierId) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    return supplier ? supplier.name : "N/A";
  };

  const getCategoryBySupplierId = (supplierId) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    return supplier ? supplier.category : "N/A";
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleClearFilters = () => {
    setFilters({ orderNumber: "", productName: "", category: "", supplier: "", startDate: "", endDate: "" });
    fetchPurchases();
  };

  const applyFilters = () => {
    const filtered = filteredData.filter(item => {
      const itemDate = new Date(item.date);
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;

      return (
        (!filters.orderNumber || item.id.toString().includes(filters.orderNumber)) &&
        (!filters.productName || item.buyer_info?.productName?.toLowerCase().includes(filters.productName.toLowerCase())) &&
        (!filters.category || getCategoryBySupplierId(item.buyer_info?.supplierId)?.toLowerCase().includes(filters.category.toLowerCase())) &&
        (!filters.supplier || getSupplierNameById(item.buyer_info?.supplierId)?.toLowerCase().includes(filters.supplier.toLowerCase())) &&
        (!startDate || itemDate >= startDate) &&
        (!endDate || itemDate <= endDate)
      );
    });
    setFilteredData(filtered);
  };

  return (
    <div className="justify-content-center container-fluid">
      <h1>Reporte de Compras</h1>
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
              {[...new Set(suppliers.map(s => s.category))].map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </FormSelect>
          </Form.Group>
          <Form.Group className="col-2" controlId="supplier">
            <Form.Label>Proveedor</Form.Label>
            <Form.Control
              type="text"
              name="supplier"
              value={filters.supplier}
              onChange={handleFilterChange}
            />
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
        </Row>
        <Button className="mt-4" onClick={applyFilters}>Filtrar</Button>
        <Button className="mt-4 mx-3 btn btn-secondary" onClick={handleClearFilters}>Borrar Filtros</Button>
      </Form>
      {filteredData.length > 0 ? (
      <>
        <Table className="table-responsive table w-75 p-5 m-5" striped bordered hover>
          <thead>
            <tr>
              <th>Orden</th>
              <th>Cantidad</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Proveedor</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.buyer_info?.quantity || "N/A"}</td>
                <td>{item.buyer_info?.productName || "N/A"}</td>
                <td>{getCategoryBySupplierId(item.buyer_info?.supplierId)}</td>
                <td>{getSupplierNameById(item.buyer_info?.supplierId)}</td>
                <td>{item.date || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div id="chart"></div>
      </>
    ) : (
      <p>No se encontraron compras para mostrar.</p>
    )}
  </div>
);
};

export default PurchaseReport;

