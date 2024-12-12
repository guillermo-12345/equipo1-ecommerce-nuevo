import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap';
import { initializeApp, getApps } from "firebase/app"; 
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/cartContext';


window.localStorage.removeItem('orders'); 


const firebaseConfig = {
  apiKey: "AIzaSyCfAJnhRLGif5Rw537AQmounfGVi0cST10",
  authDomain: "equipo1-ecommerce.firebaseapp.com",
  projectId: "equipo1-ecommerce",
  storageBucket: "equipo1-ecommerce.appspot.com",
  messagingSenderId: "66738131494",
  appId: "1:66738131494:web:e199a3bbf8ca100a010ce7",
  measurementId: "G-3B4BKNN2L6"
};

// Inicializa Firebase solo para el cliente (frontend)
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// Renderizado de la aplicación React
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <CartProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </CartProvider>
);

reportWebVitals();
