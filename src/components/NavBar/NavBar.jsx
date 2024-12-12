import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../logo.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useAuth } from "../../context/AuthContext";

const NavBar = () => {
  const { user, loginWithGoogle, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Rol del usuario en el frontend:", user.role);
    }
  }, [user]);

  const handleLogout = () => {
    logout(); 
    navigate("/"); 
  };
  
  return (
    <Navbar bg="light" expand="xxl" sticky="top" className="mb-3">
      <Container fluid>
        <NavLink to="/" className="navbar-brand text-primary">
          <span>Equipo 1 - ECommerce</span>
          <img src={logo} alt="Logo" width="80" height="80" className="mx-3" />
        </NavLink>
        
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        
        <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Equipo 1 E-Commerce</Offcanvas.Title>
          </Offcanvas.Header>
          
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <NavLink to="/" className="nav-link">Home</NavLink>
              
              <NavDropdown title="Tienda" id="offcanvasNavbarDropdown">
                <NavLink to="/category/notebook" className="dropdown-item">Notebooks</NavLink>
                <NavLink to="/category/celular" className="dropdown-item">Celulares</NavLink>
                <NavLink to="/category/tablet" className="dropdown-item">Tablets</NavLink>
              </NavDropdown>

              {user?.role === 'admin' ? (
                <>
                  <NavLink to="/clients" className="nav-link">Clientes</NavLink>
                  <NavLink to="/suppliers" className="nav-link">Proveedores</NavLink>
                  <NavLink to="/products" className="nav-link">Productos</NavLink>
                  <NavDropdown title="Reportes" id="reportDropdown">
                    <NavLink to="/sales-report" className="dropdown-item">Ventas</NavLink>
                    <NavLink to="/purchase-report" className="dropdown-item">Compras</NavLink>
                  </NavDropdown>
                </>
              ) : (
                <NavLink to="/cart" className="nav-link">Carrito</NavLink>
              )}

              <NavLink to="/contact" className="nav-link">Contacto</NavLink>
              {user && (
                <NavLink to={`/clients/${user.mysqlId}`} className="nav-link">Mi Perfil</NavLink>
              )}
              {user ? (
                <button onClick={handleLogout} className="btn btn-outline-primary mx-2">Cerrar sesión</button>
              ) : (
                <button onClick={loginWithGoogle} className="btn btn-primary">Iniciar sesión con Google</button>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;