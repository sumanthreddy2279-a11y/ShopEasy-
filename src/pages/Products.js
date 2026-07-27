import React, { useContext, useEffect, useState } from "react";
import "./Products.css";
import { getAllProducts } from "../services/productService";
import { CartContext } from "../contexts/CartContext";
import { WishlistContext } from "../contexts/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Loading from "../components/Loading";
function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("");
const { addToCart } = useContext(CartContext);
const {
  addToWishlist,
  removeFromWishlist,
  isWishlisted,
} = useContext(WishlistContext);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];

    // Search
    if (searchTerm.trim() !== "") {
      updatedProducts = updatedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category Filter
    if (selectedCategory !== "all") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sort
    if (sortOption === "low-high") {
      updatedProducts.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "high-low") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [products, searchTerm, selectedCategory, sortOption]);

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
        <div className="products-page">
      {/* Banner */}
      <div className="products-banner">
        <div className="products-overlay">
          <h1>Our Products</h1>
          <p>
            Discover premium electronics, fashion, jewellery and lifestyle
            products at the best prices.
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <section className="filter-section">
        <input
          type="text"
          placeholder="🔍 Search products..."
          className="search-box"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="filter-dropdown"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "all"
                ? "All Categories"
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        <select
          className="filter-dropdown"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </section>

      {/* Product Grid */}
      <div className="product-grid">
        {loading && <Loading />}

        {error && (
  <div className="status">
    <h2>{error}</h2>
  </div>
)}

        {!loading && !error && filteredProducts.length === 0 && (
          <h2 className="status">No products found.</h2>
        )}

        {!loading &&
          !error &&
          filteredProducts.map((product) => (
  <div
    key={product.id}
    className="product-card"
    onClick={() => (window.location.href = `/product/${product.id}`)}
  >
    <button
      className="wishlist-btn"
      onClick={(e) => {
        e.stopPropagation();

        isWishlisted(product.id)
          ? removeFromWishlist(product.id)
          : addToWishlist(product);
      }}
    >
      {isWishlisted(product.id) ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </button>
              <img src={product.image} alt={product.title} />

              <p className="rating">
                ⭐ {product.rating.rate} ({product.rating.count} Reviews)
              </p>

              <span className="category-badge">
                {product.category}
              </span>

              <h3>
                {product.title.length > 45
                  ? product.title.substring(0, 45) + "..."
                  : product.title}
              </h3>

              <p className="price">
                ₹{Math.round(product.price * 85).toLocaleString("en-IN")}
              </p>

            <button
  className="cart-btn"
  onClick={(e) => {
    e.stopPropagation();
    addToCart(product);
  }}
>
  🛒 Add to Cart
</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Products;