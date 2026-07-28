import React from "react";
import {
  FaTruck,
  FaShieldAlt,
  FaStar,
  FaUndoAlt,
} from "react-icons/fa";
import "./WhyChoose.css";

const features = [
  {
    icon: <FaTruck />,
    title: "Fast Delivery",
    desc: "Get your orders delivered across India within 2–4 business days."
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Payments",
    desc: "100% safe and encrypted online transactions for every purchase."
  },
  {
    icon: <FaStar />,
    title: "Premium Quality",
    desc: "Shop from trusted brands with genuine and high-quality products."
  },
  {
    icon: <FaUndoAlt />,
    title: "Easy Returns",
    desc: "Enjoy a simple 7-day return and refund policy."
  }
];

const WhyChoose = () => {
  return (
    <section className="why-section">

      <div className="why-header">
        <h2>Why Choose shopeasi?</h2>
        <p>
          We provide a premium shopping experience with quality products,
          secure payments, and reliable delivery.
        </p>
      </div>

      <div className="why-grid">

        {features.map((item, index) => (

          <div className="why-card" key={index}>

            <div className="why-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

          </div>

        ))}

      </div>

    </section>
  );
};

export default WhyChoose;