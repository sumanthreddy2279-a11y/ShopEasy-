import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from LocalStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add Product
 const addToCart = (product) => {
  console.log("Inside addToCart", product);

  const existingItem = cartItems.find(
    (item) => item.id === product.id
  );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
    toast.success("🛒 Product added to cart!");
  };

  // Remove Product
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Increase Quantity
  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter((item) => item.quantity > 0)
    );
  };
// Clear Cart
const clearCart = () => {
  setCartItems([]);
};
  // Total Items
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total Price
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + Math.round(item.price * 85) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
  cartItems,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  totalItems,
  totalPrice,
}}
    >
      {children}
    </CartContext.Provider>
  );
};