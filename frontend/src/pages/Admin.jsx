import { useState } from "react";
import API from "../services/api";

function Admin() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      console.log("TOKEN:", token);
console.log("PRODUCT:", product);

      await API.post("/products", product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product Added Successfully");

      setProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
      });
    }catch (error) {
  console.log(error);
  console.log(error.response);

  alert(
    error.response?.data?.message ||
    "Failed To Add Product"
  );
}
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <form onSubmit={addProduct}>
        <input
  name="image"
  placeholder="Image URL"
  value={product.image}
  onChange={handleChange}
/>
        <input
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default Admin;