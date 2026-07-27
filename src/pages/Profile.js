import React, { useContext, useState } from "react";
import { WishlistContext } from "../contexts/WishlistContext";
import "./Profile.css";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
const { wishlistItems } = useContext(WishlistContext);
const orders =
  JSON.parse(localStorage.getItem("orders")) || [];  
const user = JSON.parse(localStorage.getItem("loggedInUser"));
const [isEditing, setIsEditing] = useState(false);

const [profile, setProfile] = useState({
  fullName: user.fullName,
  email: user.email,
  phone: user.phone || "",
  address: user.address || "",
});
  if (!user) {
    navigate("/login");
    return null;
  }

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
    window.location.reload();
  };
const saveProfile = () => {
  const updatedUser = {
    ...user,
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
  };

  localStorage.setItem(
    "loggedInUser",
    JSON.stringify(updatedUser)
  );
setIsEditing(false);

  setTimeout(() => {
    navigate("/profile");
  }, 300);
  window.location.reload();
};
  return (
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-header">

          <button
            className="back-btn"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>

          <FaUserCircle className="profile-avatar" />

          <h1>Welcome Back!</h1>

          <h2>{profile.fullName}</h2>

          <p>{profile.email}</p>

        </div>

        <div className="profile-details">

          <div className="detail-row">
  <span>Full Name</span>

  {isEditing ? (
    <input
      type="text"
      value={profile.fullName}
      onChange={(e) =>
        setProfile({
          ...profile,
          fullName: e.target.value,
        })
      }
    />
  ) : (
    <strong>{profile.fullName}</strong>
  )}
</div>

          <div className="detail-row">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className="detail-row">
  <span>Phone</span>

  {isEditing ? (
    <input
      type="text"
      value={profile.phone}
      onChange={(e) =>
        setProfile({
          ...profile,
          phone: e.target.value,
        })
      }
    />
  ) : (
    <strong>
      {profile.phone || "+ Add Phone Number"}
    </strong>
  )}
</div>

          <div className="detail-row">
  <span>Address</span>

  {isEditing ? (
    <input
      type="text"
      value={profile.address}
      onChange={(e) =>
        setProfile({
          ...profile,
          address: e.target.value,
        })
      }
    />
  ) : (
    <strong>
      {profile.address || "+ Add Address"}
    </strong>
  )}
</div>

          <div className="detail-row">
            <span>User ID</span>
            <strong>SM102547</strong>
          </div>

          <div className="detail-row">
            <span>Membership</span>
            <strong>⭐ Gold Member</strong>
          </div>

          <div className="detail-row">
            <span>Joined</span>
            <strong>July 2026</strong>
          </div>

          <div className="detail-row">
            <span>Status</span>
            <strong className="active">🟢 Active</strong>
          </div>

        </div>

        <div className="profile-stats">
<div
  className="stat-card"
  onClick={() => navigate("/orders")}
  style={{ cursor: "pointer" }}
>
            <h2>{orders.length}</h2>
            <p>Orders</p>
          </div>

         <div
  className="stat-card"
  onClick={() => navigate("/wishlist")}
  style={{ cursor: "pointer" }}
>
  <h2>{wishlistItems.length}</h2>
  <p>Wishlist</p>
</div>

         <div
  className="stat-card"
  style={{ cursor: "pointer" }}
  onClick={() => navigate("/reviews")}
>
  <h2>
    {(JSON.parse(localStorage.getItem("reviews")) || []).length}
  </h2>
  <p>Reviews</p>
</div>
        </div>

        <div className="profile-buttons">
{isEditing ? (
  <button
    className="edit-btn"
    onClick={saveProfile}
  >
    💾 Save Profile
  </button>
) : (
  <button
    className="edit-btn"
    onClick={() => setIsEditing(true)}
  >
    ✏ Edit Profile
  </button>
)}
          <button
            className="logout-btn"
            onClick={logout}
          >
            🚪 Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Profile;