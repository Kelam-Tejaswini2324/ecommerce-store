import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommerce-store-backend-e4yp.onrender.com/api",
});

export default API;