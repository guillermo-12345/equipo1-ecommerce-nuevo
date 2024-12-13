import axios from "axios";

const axios = axios.create({
  baseURL: "https://nombre-backend-vercel.vercel.app/api", 
});

export default axios;
