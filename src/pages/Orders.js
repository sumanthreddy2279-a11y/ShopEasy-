import React, { useContext } from "react";
import "./Orders.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
function Orders() {
  const navigate = useNavigate();
const { addToCart } = useContext(CartContext);
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div className="orders-page">

      <div className="orders-container">

        <div className="orders-header">

          <button
            className="back-btn"
            onClick={() => navigate("/")}
          >
            ← Back
          </button>

          <h1>📦 My Orders</h1>

          <p>
            View all your purchased products
          </p>

        </div>

        {orders.length === 0 ? (

          <div className="empty-orders">

            <h2>No Orders Yet</h2>

            <p>
              Looks like you haven't placed any order.
            </p>

            <button
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>

          </div>

        ) : (

          orders.map((order, index) => (

            <div className="order-card" key={index}>

              <img
                src={order.image}
                alt={order.title}
              />

              <div className="order-details">

                <h2>{order.title}</h2>

                <p className="price">
                  ₹{Math.round(order.price * 85).toLocaleString("en-IN")}
                </p>

               <div className="order-info">

  <p>
    <strong>Quantity:</strong> {order.quantity}
  </p>

  <p>
    <strong>Status:</strong>
    <span className="delivered"> {order.status}</span>
  </p>

  <p>
    <strong>Order Date:</strong> {order.orderDate}
  </p>

  <p>
    <strong>Order ID:</strong> SM{100000 + index}
  </p>

  <p className="payment-status">
    💳 <strong>Payment:</strong> Successful
  </p>

  <p className="delivery-date">
    🚚 <strong>Expected Delivery:</strong> 3–5 Days
  </p>

</div>
                <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
  <button
    onClick={() => {
      addToCart(order);
      navigate("/cart");
    }}
  >
    Buy Again
  </button>

  <button
    onClick={() =>
      navigate("/reviews", {
        state: { product: order },
      })
    }
  >
    ⭐ Write Review
  </button>
</div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Orders;