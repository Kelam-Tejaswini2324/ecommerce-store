import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import "../App.css";
import Footer from "../components/Footer";
function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
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

      alert("Product Added To Cart");
    } catch (error) {
      alert("Please Login First");
    }
  };

  return (
    <>
      <Navbar />

     <section className="hero-banner">
  <div className="hero-left">
    <span className="discount-badge">
      Big Discount
    </span>

    <h1>
      Best Products,
      <br />
      <span>Best Prices</span>
    </h1>

    <p>
      Shop the latest electronics,
      gadgets and more at unbeatable prices.
    </p>

    <button className="shop-btn">
      Shop Now →
    </button>
  </div>

  <div className="hero-right">
    <img
      src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
      alt="hero"
    />
  </div>
</section>
<div className="featured-header">
  <h2>Featured Products</h2>
</div>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
           <img
  src={product.image || "https://via.placeholder.com/300x200"}
  alt={product.name}
  style={{
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  }}
/>

            <h2>{product.name}</h2>

            <p>{product.description}</p>

            <h3>₹{product.price}</h3>

            <p>{product.category}</p>

            <p>Stock: {product.stock}</p>

            <button
              className="cart-btn"
              onClick={() => addToCart(product._id)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;