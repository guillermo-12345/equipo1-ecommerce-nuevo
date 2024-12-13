import React, { useState, useEffect, useRef } from 'react';
import axios from '../service/axiosConfig';
import { auth } from '../service/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';

const Protected = ({ setUserRole }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [product, setProduct] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();
  const dt = useRef(null);

  const emptyProduct = {
    id: '',
    name: '',
    description: '',
    price: 0,
  };

  const verifyUser = async () => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/auth/login');
    } else {
      const token = await user.getIdToken(); 
      try {
        const response = await axios.post("/auth/verifyRole", {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserRole(response.data.userRole); 
        if (response.data.userRole !== 'admin') {
          navigate('/'); 
        }
      } catch (error) {
        console.error("Error al verificar el usuario:", error);
        navigate('/auth/login');
      }
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      navigate('/auth/login');
    }
    setLoading(false);
  };

  const formatCurrency = (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => setDeleteProductDialog(false);

  const saveProduct = async () => {
    setSubmitted(true);
    setLoading(true);
    setProductDialog(false);
    try {
      if (!product.id) {
        await axios.post('/api/products', product);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Producto creado', life: 3000 });
      } else {
        await axios.put(`/api/products/${product.id}`, product);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Producto actualizado', life: 3000 });
      }
      fetchProductos();
    } catch (error) {
      console.error('Error al guardar el producto:', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar el producto', life: 3000 });
    }
    setLoading(false);
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = async () => {
    setLoading(true);
    setDeleteProductDialog(false);
    try {
      await axios.delete(`/api/products/${product.id}`);
      toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Producto eliminado', life: 3000 });
      fetchProductos();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el producto', life: 3000 });
    }
    setLoading(false);
  };

  const exportCSV = () => dt.current.exportCSV();

  const logout = () => {
    auth.signOut().then(() => {
      navigate('/auth/login');
    });
  };

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}>
          <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
          <Column field="name" header="Name" sortable></Column>
          <Column field="description" header="Description" sortable></Column>
          <Column field="price" header="Price" body={(rowData) => formatCurrency(rowData.price)} sortable></Column>
          <Column body={(rowData) => (
            <div>
              <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
              <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
          )}></Column>
        </DataTable>
        <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
        <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={() => setDeleteProductDialog(true)} disabled={!selectedProducts || !selectedProducts.length} />
        <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
        <Button label="Logout" icon="pi pi-sign-out" className="p-button-secondary" onClick={logout} />

        <Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={() => (
          <div>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
          </div>
        )} onHide={hideDialog}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" value={product.name || ''} onChange={(e) => setProduct({ ...product, name: e.target.value })} required autoFocus />
          </div>
          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea id="description" value={product.description || ''} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
          </div>
          <div className="field">
            <label htmlFor="price">Price</label>
            <input id="price" type="number" value={product.price || 0} onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })} required />
          </div>
        </Dialog>

        <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={() => (
          <div>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
          </div>
        )} onHide={hideDeleteProductDialog}>
          <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
            {product && <span>¿Estás seguro de que deseas eliminar el producto <b>{product.name}</b>?</span>}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Protected;
