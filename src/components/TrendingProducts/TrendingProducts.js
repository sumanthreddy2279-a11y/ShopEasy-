import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrendingProducts.css";

const TrendingProducts = () => {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.slice(0,8)));
  }, []);

  return (
    <section className="trending">

      <div className="trending-header">
        <h2>🔥 Trending Products</h2>
        <p>Discover our most popular products loved by customers.</p>
      </div>

      <div className="trending-grid">

        {products.map((product) => (

          <div
            className="trend-card"
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
          >

            <img src={product.image} alt={product.title} />

            <h3>{product.title.substring(0, 40)}...</h3>

            <p className="price">
  ₹{Math.round(product.price * 85).toLocaleString("en-IN")}
</p>

           <button
  onClick={(e) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  }}
>
  View Details
</button>

          </div>

        ))}

      </div>

      <div className="view-all">

        <button onClick={() => navigate("/products")}>
          View All Products
        </button>

      </div>

    </section>
  );
};

export default TrendingProducts;