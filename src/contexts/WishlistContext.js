import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem("wishlistItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    const exists = wishlistItems.find(
      (item) => item.id === product.id
    );
toast.success("❤️ Added to Wishlist!");
    if (!exists) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(
      wishlistItems.filter((item) => item.id !== id)
    );
    toast.info("❌ Removed from Wishlist!");
  };

  const isWishlisted = (id) => {
    return wishlistItems.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};