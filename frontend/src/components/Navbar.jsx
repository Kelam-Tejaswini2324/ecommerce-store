import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const logout = () => {
    localStorage.clear();
    import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const logout = () => {
  localStorage.clear();
  navigate("/login");
};
  };

  return (
    <nav className="navbar">

      {/* Left Side */}
      <div className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/">Shop</Link>
        <Link to="/">Categories</Link>
        <Link to="/">Deals</Link>
      </div>

      {/* Center Logo */}
      <div className="logo-center">
        <img src={logo} alt="Teju Store" />
      </div>

      {/* Right Side */}
      <div className="nav-right">
        <input
          type="text"
          placeholder="Search products..."
        />

        <Link to="/cart" className="nav-icon">
          🛒
        </Link>

        <Link to="/orders" className="nav-icon">
          📦
        </Link>

        <Link to="/admin" className="nav-icon">
          ⚙️
        </Link>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>

    </nav>
  );
}

export default Navbar;