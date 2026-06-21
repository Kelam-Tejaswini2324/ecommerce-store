import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/orders/myorders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>My Orders</h1>

        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <h3>Order ID</h3>
            <p>{order._id}</p>

            <h3>Total Amount</h3>
            <p>₹{order.totalAmount}</p>

            <h3>Status</h3>
            <p
              style={{
                color: "#22c55e",
                fontWeight: "bold",
              }}
            >
              {order.status}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Orders;