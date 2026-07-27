import React, { useContext } from "react";
import { WishlistContext } from "../contexts/WishlistContext";
import { CartContext } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import "./Wishlist.css";

function Wishlist() {
  const {
    wishlistItems,
    removeFromWishlist,
  } = useContext(WishlistContext);

  const { addToCart } = useContext(CartContext);
const navigate = useNavigate();
  return (
    <div className="wishlist-page">

      <h1>❤️ My Wishlist</h1>

      {wishlistItems.length === 0 ? (

        <div className="empty-wishlist">
          <h2>Your Wishlist is Empty</h2>

          <Link to="/products">
            <button>Browse Products</button>
          </Link>
        </div>

      ) : (

        <div className="wishlist-grid">

          {wishlistItems.map((product) => (

            <div
              className="wishlist-card"
              key={product.id}
            >

              <img
                src={product.image}
                alt={product.title}
                className="wishlist-image"
  onClick={() => navigate(`/product/${product.id}`)}
              />

              <h3>{product.title}</h3>

              <p>
                ₹{Math.round(product.price * 85).toLocaleString("en-IN")}
              </p>

              <div className="wishlist-buttons">

                <button
                  onClick={() => addToCart(product)}
                >
                  🛒 Add to Cart
                </button>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeFromWishlist(product.id)
                  }
                >
                  ❌ Remove
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Wishlist;