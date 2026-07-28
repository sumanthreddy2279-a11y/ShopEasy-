import "./Hero.css";
import { useNavigate } from "react-router-dom";
import {
  FaLaptop,
  FaTshirt,
  FaGem,
  FaArrowRight,
} from "react-icons/fa";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">

      {/* Left Side */}
      <div className="hero-left">

        <span className="hero-badge">
          🚀 Premium Shopping Experience
        </span>

        <h1>
          Shop Smarter with <span>shopeasi</span>
        </h1>

        <p>
          Discover premium electronics, fashion, jewellery and lifestyle
        </p>

        <div className="hero-buttons">

          <button
            className="shop-btn"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>

          <button
            className="explore-btn"
            onClick={() => navigate("/products")}
          >
            Explore
            <FaArrowRight />
          </button>

        </div>

      </div>

      {/* Right Side */}

      <div className="hero-right">

        <div className="floating-card">

          <FaLaptop className="hero-icon" />

          <h3>Electronics</h3>

          <p>Latest Gadgets</p>

        </div>

        <div className="floating-card">

          <FaTshirt className="hero-icon" />

          <h3>Fashion</h3>

          <p>Trending Styles</p>

        </div>

        <div className="floating-card">

          <FaGem className="hero-icon" />

          <h3>Jewellery</h3>

          <p>Premium Collection</p>

        </div>

      </div>

    </section>
  );
}

export default Hero;