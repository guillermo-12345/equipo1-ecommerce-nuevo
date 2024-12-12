import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCfAJnhRLGif5Rw537AQmounfGVi0cST10",
  authDomain: "equipo1-ecommerce.firebaseapp.com",
  projectId: "equipo1-ecommerce",
  storageBucket: "equipo1-ecommerce.appspot.com",
  messagingSenderId: "66738131494",
  appId: "1:66738131494:web:e199a3bbf8ca100a010ce7"
};

// Inicializar Firebase solo si no está ya inicializado
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };