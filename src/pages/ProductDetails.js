import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { CartContext } from "../contexts/CartContext";
import { getAllProducts } from "../services/productService";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await getAllProducts();

        const selectedProduct = products.find(
          (item) => item.id === Number(id)
        );

        setProduct(selectedProduct);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <h2 className="loading">Loading Product...</h2>;
  }

  if (!product) {
    return <h2 className="loading">Product Not Found</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="details-container">

        <div className="details-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="details-info">

          <span className="details-category">
            {product.category}
          </span>

          <h1>{product.title}</h1>

          <p className="details-rating">
            ⭐ {product.rating.rate} ({product.rating.count} Reviews)
          </p>

          <h2 className="details-price">
            ₹{Math.round(product.price * 85).toLocaleString("en-IN")}
          </h2>

          <p className="details-description">
            {product.description}
          </p>

          <div className="details-buttons">

            <button
              className="add-btn"
              onClick={() => addToCart(product)}
            >
              🛒 Add to Cart
            </button>

            <button
              className="buy-btn"
              onClick={() => {
                addToCart(product);
                navigate("/checkout");
              }}
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default ProductDetails;