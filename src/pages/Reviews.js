import React, { useEffect, useState } from "react";
import "./Reviews.css";
import { useLocation, useNavigate } from "react-router-dom";

function Reviews() {
  const navigate = useNavigate();
  const location = useLocation();

  const product = location.state?.product;

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const savedReviews =
      JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(savedReviews);
  }, []);

  const saveReview = () => {
  if (!comment.trim()) {
    alert("Please enter your review.");
    return;
  }

  // Check if this product is already reviewed
  const alreadyReviewed = reviews.find(
    (item) => item.title === product.title
  );

  if (alreadyReviewed) {
    alert("You have already reviewed this product.");
    return;
  }

  const newReview = {
    id: Date.now(),
    image: product.image,
    title: product.title,
    rating,
    comment,
  };

  const updatedReviews = [...reviews, newReview];

  localStorage.setItem(
    "reviews",
    JSON.stringify(updatedReviews)
  );

  setReviews(updatedReviews);

  setComment("");
  setRating(5);

  alert("⭐ Review Submitted Successfully!");

  navigate("/profile");
};
  return (
    <div className="reviews-page">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1>⭐ My Reviews</h1>

      {product && (

        <div className="review-card">

          <img
            src={product.image}
            alt={product.title}
          />

        <div className="review-form">

  <h3>{product.title}</h3>

  <label>Rating</label>

  <select
    value={rating}
    onChange={(e) => setRating(Number(e.target.value))}
  >
    <option value="5">⭐⭐⭐⭐⭐</option>
    <option value="4">⭐⭐⭐⭐</option>
    <option value="3">⭐⭐⭐</option>
    <option value="2">⭐⭐</option>
    <option value="1">⭐</option>
  </select>

  <label>Your Review</label>

  <textarea
    placeholder="Write your review..."
    value={comment}
    onChange={(e) => setComment(e.target.value)}
  />

  <button
    className="save-review-btn"
    onClick={saveReview}
  >
    Submit Review
  </button>

</div>

        </div>

      )}

     <h2 className="reviews-title">
  Your Reviews
</h2>

      {reviews.length === 0 ? (

        <div className="empty-reviews">

          <h2>No Reviews Yet</h2>

          <p>You haven't reviewed any products.</p>

        </div>

      ) : (

        reviews.map((review) => (

          <div className="saved-review" key={review.id}>

            <img
              src={review.image}
              alt={review.title}
            />

            <div>

              <h3>{review.title}</h3>

              <p>⭐ {review.rating}/5</p>

              <p>{review.comment}</p>

            </div>

          </div>

        ))

      )}

    </div>
  );
}

export default Reviews;