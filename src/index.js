import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/global.css";

import App from "./App";

import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>

    <AuthProvider>

      <CartProvider>

        <WishlistProvider>

          <App />

        </WishlistProvider>

      </CartProvider>

    </AuthProvider>

  </React.StrictMode>
);