import { useState } from "react";
import API from "../services/api";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-card">
  <img
    src={logo}
    alt="Teju Store"
    className="auth-logo"
  />
  <p className="brand-tagline">
  Shop More • Save More
</p>

  <h1>Welcome Back 👋</h1>

  <p>Login to continue shopping at Teju Store</p>

  <input
    type="email"
    placeholder="Enter Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  <input
    type="password"
    placeholder="Enter Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

 <button onClick={loginUser}>
  Login
</button>
  <p className="auth-link">
    Don't have an account?
    <Link to="/register"> Register</Link>
  </p>
</div>

      
  </div>
);
}

export default Login;