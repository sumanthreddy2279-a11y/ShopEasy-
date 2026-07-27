import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import CartPage from "../pages/CartPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CheckoutPage from "../pages/CheckoutPage";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Orders from "../pages/Orders";
import Wishlist from "../pages/Wishlist";
import Reviews from "../pages/Reviews";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route path="/cart" element={<CartPage />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/checkout"
          element={<CheckoutPage />}
        />
        <Route
  path="/profile"
  element={<Profile />}
/>
<Route
  path="/orders"
  element={<Orders />}
/>
<Route
  path="/wishlist"
  element={<Wishlist />}
/>
<Route
  path="/reviews"
  element={<Reviews />}
/>
    <Route 
    path="*" 
    element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;