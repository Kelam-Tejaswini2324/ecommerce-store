import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left Menu */}
      <div className="nav-left">
        <Link to="/">Home</Link>
        <a href="#">Shop</a>
        <a href="#">Categories</a>
        <a href="#">Deals</a>
      </div>

      {/* Center Logo */}
      <div className="nav-logo">
        <img
          src={logo}
          alt="Teju Store"
          style={{
            height: "90px",
            width: "auto",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Right Section */}
      <div className="nav-right">
        <input
          type="text"
          placeholder="Search products..."
        />

        <Link to="/cart">🛒</Link>
        <Link to="/orders">📦</Link>
        <Link to="/admin">⚙️</Link>

        <button
          onClick={logout}
          style={{
            background: "#ff4d4f",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;