import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(res.data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const items = cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      const totalAmount = cartItems.reduce(
        (sum, item) =>
          sum + item.product.price * item.quantity,
        0
      );

      await API.post(
        "/orders",
        {
          items,
          totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order Placed Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const totalAmount = cartItems.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Shopping Cart</h1>

        {cartItems.map((item) => (
          <div className="order-card" key={item._id}>
            <h2>{item.product.name}</h2>

            <p>₹{item.product.price}</p>

            <p>Quantity: {item.quantity}</p>

            <button
              className="remove-btn"
              onClick={() => removeItem(item._id)}
            >
              Remove
            </button>
          </div>
        ))}

        <h2 style={{ marginTop: "20px" }}>
          Total: ₹{totalAmount}
        </h2>

        <button
          className="checkout-btn"
          onClick={placeOrder}
        >
          Checkout / Place Order
        </button>
      </div>
    </>
  );
}

export default Cart;