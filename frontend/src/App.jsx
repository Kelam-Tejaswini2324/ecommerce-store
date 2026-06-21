import { useEffect, useState } from "react";
import API from "./services/api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
  try {
    const res = await API.get("/products");

    console.log("API Response:", res.data);

    setProducts(res.data.products);
  } catch (error) {
    console.log("ERROR:", error);
  }
};
const addToCart = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    await API.post(
      "/cart",
      {
        product: productId,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Added to Cart");
  } catch (error) {
    console.log(error);
    alert("Login First");
  }
};
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </BrowserRouter>
);
}

export default App;