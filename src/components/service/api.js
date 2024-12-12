import axios from "axios";

export const fetchProtectedData = async () => {
  const token = localStorage.getItem("firebaseToken");

  try {
    const response = await axios.get("http://localhost:3001/api/protected-data", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    
    console.log("Datos protegidos:", response.data); 
    return response.data; 
  } catch (error) {
    console.error("Error al obtener los datos protegidos:", error);
    throw error; 
  }
};
