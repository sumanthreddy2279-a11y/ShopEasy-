import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import {
  FaShoppingCart,
  FaUserCircle,
  FaHome,
  FaBoxOpen
} from "react-icons/fa";

function Navbar() {

  const location = useLocation();
  const { totalItems } = useContext(CartContext);
  const [showMenu, setShowMenu] = useState(false);
const [loggedUser, setLoggedUser] = useState(null);

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
    setLoggedUser(user);
  }
}, []);

const handleLogout = () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "/";
};
  return (
    <header className="navbar">

      {/* Logo */}
      <Link to="/" className="logo">
        <h1>S-Mart</h1>
        <span>Smart Shopping Starts Here</span>
      </Link>

      {/* Navigation */}

      <nav>

        <ul className="nav-links">

          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">
              <FaHome />
              Home
            </Link>
          </li>

          <li className={location.pathname === "/products" ? "active" : ""}>
            <Link to="/products">
              <FaBoxOpen />
              Products
            </Link>
          </li>


        </ul>

      </nav>

      {/* Right Side */}

      <div className="nav-right">

       {loggedUser ? (
  <div className="profile-section">

    <button
      className="login-btn"
      onClick={() => setShowMenu(!showMenu)}
    >
      <FaUserCircle />
      {loggedUser.fullName}
    </button>

    {showMenu && (
      <div className="profile-dropdown">

        <div className="profile-info">
          <h4>{loggedUser.fullName}</h4>
          <p>{loggedUser.email}</p>
        </div>

        <Link to="/profile" className="dropdown-item">
          👤 My Profile
        </Link>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </div>
    )}

  </div>
) : (
  <Link to="/login" className="login-btn">
    <FaUserCircle />
    Login
  </Link>
)}

        <Link to="/cart" className="cart-btn">
  <FaShoppingCart />

  <span className="cart-count">
    {totalItems}
  </span>
</Link>

      </div>

    </header>
  );
}

export default Navbar;