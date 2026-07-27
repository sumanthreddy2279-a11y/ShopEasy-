import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
  } = useContext(CartContext);
const navigate = useNavigate();
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1>Shopping Cart</h1>

        <div className="empty-cart">
          <h2>Your cart is empty 🛒</h2>
          <p>Add some products to continue shopping.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      <div className="cart-container">

        <div className="cart-items">

          {cartItems.map((item) => (
            <div className="cart-card" key={item.id}>

              <img
                src={item.image}
                alt={item.title}
              />

              <div className="cart-info">

                <h3>{item.title}</h3>
<h3>
  {item.title.length > 40
    ? item.title.substring(0, 40) + "..."
    : item.title}
</h3>
                <p className="price">
                  ₹{Math.round(item.price * 85).toLocaleString("en-IN")}
                </p>

                <div className="quantity">

                  <button
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>

                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

        </div>

        <div className="cart-summary">

          <h2>Order Summary</h2>

          <p>
            <strong>Total Items:</strong> {totalItems}
          </p>

          <p>
            <strong>Total Price:</strong>
            <br />
            ₹{totalPrice.toLocaleString("en-IN")}
          </p>

         <button
  className="checkout-btn"
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout
</button>

        </div>

      </div>
    </div>
  );
}

export default CartPage;