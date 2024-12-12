import './App.css';
import 'bootstrap';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Contact } from './views/Contact';
import { Cart } from './views/Cart';
import CheckOut from './views/CheckOut';
import SupplierList from './components/SupplierList/SupplierList';
import SalesReport from './components/SalesReport/SalesReport';
import PurchaseReport from './components/PurchaseReport/PurchaseReport';
import ProductList from './components/ProductList/ProductList';
import ClienteList from './components/ClientesList/ClientesList';
import Auth from './components/Login/Auth';
import { AuthProvider, useAuth } from './context/AuthContext';
import FormPage from './components/FormPage/FormPage';
import Profile from './components/Profile/Profile';

function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (userRole) {
      console.log("Rol del usuario en el frontend:", userRole);
    }
  }, [userRole]);

  return (
    <div className="App">
      <AuthProvider>
        <NavBar userRole={userRole} />
        <Routes>
          <Route path="/" element={<ItemListContainer greeting={"Bienvenidos"} />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/products/:itemId" element={<ItemDetailContainer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/auth/login" element={<Auth setUserRole={setUserRole} />} />
          <Route path="/clients/:id" element={<Profile />} />
          {/* Rutas protegidas */}
          <Route path="/clients" element={<ProtectedRoute requiredRole="admin"><ClienteList /></ProtectedRoute>} />
          <Route path="/suppliers" element={<ProtectedRoute requiredRole="admin"><SupplierList /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute requiredRole="admin"><ProductList /></ProtectedRoute>} />
          <Route path="/sales-report" element={<ProtectedRoute requiredRole="admin"><SalesReport /></ProtectedRoute>} />
          <Route path="/purchase-report" element={<ProtectedRoute requiredRole="admin"><PurchaseReport /></ProtectedRoute>} />
          <Route path="/form/:type/:id/" element={<ProtectedRoute requiredRole="admin"><FormPage /></ProtectedRoute>}/>
          <Route path="/form/:type" element={<ProtectedRoute requiredRole="admin"><FormPage /></ProtectedRoute>} />
          <Route path="/form/:type/:id" element={<ProtectedRoute requiredRole="admin"><FormPage /></ProtectedRoute>} />
          <Route path="*" element={<h1>404 NOT FOUND</h1>} />
        </Routes>
      </AuthProvider>
      <footer className="my-xxl-5 justify-content-end">
        <Link to="/">
          <button className="btn btn-outline-success">🏠 HOME</button>
        </Link>
      </footer>
    </div>
  );
}

const ProtectedRoute = ({ requiredRole, children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || (requiredRole && user.role !== requiredRole)) {
      console.log(`Acceso restringido para el rol del usuario: ${user?.role}`);
      navigate('/auth/login');
    }
  }, [user, requiredRole, navigate]);

  return user && (!requiredRole || user.role === requiredRole) ? children : null;
};

export default App;