import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { toast } from "react-toastify";
import "./CheckoutPage.css";

function CheckoutPage() {
  const {
  totalItems,
  totalPrice,
  clearCart,
} = useContext(CartContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "Cash on Delivery",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const handleSubmit = (e) => {
  e.preventDefault();

  const existingOrders =
    JSON.parse(localStorage.getItem("orders")) || [];

  const cartItems =
    JSON.parse(localStorage.getItem("cartItems")) || [];

  const newOrders = [...existingOrders, ...cartItems];

  localStorage.setItem(
    "orders",
    JSON.stringify(newOrders)
  );

  // Show confirmation message
  if (formData.payment === "Cash on Delivery") {
    toast.success("🎉 Order Placed Successfully!", {
      autoClose: 2000,
    });
  } else if (formData.payment === "Credit / Debit Card") {
    toast.success("💳 Payment Successful! Order Placed Successfully!", {
      autoClose: 2000,
    });
  } else if (formData.payment === "UPI") {
    toast.success("📱 UPI Payment Successful! Order Placed Successfully!", {
      autoClose: 2000,
    });
  }

  clearCart();

  setFormData({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "Cash on Delivery",
  });

  // Wait 2 seconds before redirecting
  setTimeout(() => {
    window.location.href = "/orders";
  }, 2000);
};
  return (
    <div className="checkout-page">

      <h1>Checkout</h1>

      <div className="checkout-container">

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >

          <h2>Shipping Details</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Full Address"
            rows="4"
            required
            value={formData.address}
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            required
            value={formData.city}
            onChange={handleChange}
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            required
            value={formData.state}
            onChange={handleChange}
          />

          <input
            type="text"
            name="pincode"
            placeholder="PIN Code"
            required
            value={formData.pincode}
            onChange={handleChange}
          />

          <select
  name="payment"
  value={formData.payment}
  onChange={handleChange}
>
  <option>Cash on Delivery</option>
  <option>Credit / Debit Card</option>
  <option>UPI</option>
</select>

{/* Card Details */}
{formData.payment === "Credit / Debit Card" && (
  <div className="payment-box">

    <input
      type="text"
      placeholder="Card Number"
      maxLength="16"
      required
    />

    <input
      type="text"
      placeholder="Card Holder Name"
      required
    />

    <div className="card-row">

      <input
        type="text"
        placeholder="MM/YY"
        maxLength="5"
        required
      />

      <input
        type="password"
        placeholder="CVV"
        maxLength="3"
        required
      />

    </div>

  </div>
)}

{/* UPI Details */}
{formData.payment === "UPI" && (
  <div className="payment-box">

    <input
      type="text"
      placeholder="Enter UPI ID (example@upi)"
      required
    />

    <p className="upi-note">
      Example: satvik@oksbi
    </p>

  </div>
)}

          <button type="submit">
            Place Order
          </button>

        </form>

        <div className="checkout-summary">

          <h2>Order Summary</h2>

          <p>
            Total Items:
            <strong> {totalItems}</strong>
          </p>

          <p>
            Total Price:
            <strong>
              ₹{totalPrice.toLocaleString("en-IN")}
            </strong>
          </p>

        </div>

      </div>

    </div>
  );
}

export default CheckoutPage;