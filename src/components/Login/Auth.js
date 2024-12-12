import React from 'react';
import { auth, googleProvider } from '../service/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

const Auth = () => {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Iniciar sesión con Google</button>
    </div>
  );
};

export default Auth;