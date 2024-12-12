import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../components/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const adminEmails = ["guillermo.ibanezc@gmail.com", "trek0.88@gmail.com"];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Configurar interceptor global de Axios
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      async (config) => {
        if (auth.currentUser) {
          const token = await auth.currentUser.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.request.eject(interceptor);
  }, []);

  const fetchUserRoleAndMySQLId = async (firebaseUser) => {
    if (!firebaseUser) return null;

    try {
      const isAdmin = adminEmails.includes(firebaseUser.email);

      // Verificar si el cliente ya existe por email
      let clientData;
      try {
        const response = await axios.get(`http://localhost:3001/api/clients/email/${firebaseUser.email}`);
        clientData = response.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Crear un nuevo cliente si no existe
          const newClient = {
            name: firebaseUser.displayName || '',
            email: firebaseUser.email,
            cuit: null, // Se crea con CUIT null inicialmente
          };
          const createResponse = await axios.post('http://localhost:3001/api/clients', newClient);
          clientData = createResponse.data;

          // Enviar correo de bienvenida
          await axios.post('http://localhost:3001/api/email/sendContactEmail', {
            name: newClient.name,
            email: newClient.email,
            message: 'Gracias por registrarse con nosotros. Por favor, complete su perfil para disfrutar de todos nuestros servicios.'
          });
        } else {
          throw error;
        }
      }

      return {
        ...firebaseUser,
        role: isAdmin ? 'admin' : 'user',
        isAdmin,
        mysqlId: clientData.id,
      };
    } catch (error) {
      console.error('Error al obtener el rol del usuario o registrar en MySQL:', error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        const userWithRole = await fetchUserRoleAndMySQLId(firebaseUser);
        setUser(userWithRole);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const userWithRole = await fetchUserRoleAndMySQLId(result.user);
      setUser(userWithRole);
      navigate('/');
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    loginWithGoogle,
    logout,
    isAdmin: user?.isAdmin || false,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
