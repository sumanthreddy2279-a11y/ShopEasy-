import React, { useState } from "react";
import "./Newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setMessage("🎉 Thank you for subscribing!");
    setEmail("");
    setTimeout(() => {
  setMessage("");
}, 3000);
  };

  return (
    <section className="newsletter">
      <div className="newsletter-content">

        <h2>Stay Updated</h2>

        <p>
          Subscribe to receive exclusive offers, latest products,
          and exciting deals directly in your inbox.
        </p>

        <form onSubmit={handleSubscribe} className="newsletter-form">

          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">
            Subscribe
          </button>

        </form>

        {message && (
          <p className="message">{message}</p>
        )}

      </div>
    </section>
  );
};

export default Newsletter;