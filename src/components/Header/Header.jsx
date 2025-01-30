import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/Logo.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, setActiveModal, weatherData }) {
  // Access the current user context
  const currentUser = useContext(CurrentUserContext);
  console.log("Header Props:", { handleAddClick, setActiveModal, weatherData });

  // Handlers for login and signup modals
  const openLoginModal = () => {
    console.log("Opening Login Modal");
    setActiveModal("login");
  };

  const openSignupModal = () => {
    console.log("Opening Signup Modal");
    setActiveModal("sign-up");
  };

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // Function to get initials of user's name
  const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : "");

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <Link to="/">
          <img className="header__logo" src={logo} alt="WTWR Logo" />
        </Link>

        {/* Date and location */}
        <p className="header__date-and-location">
          {currentDate}, {weatherData?.city || "Unknown Location"}
        </p>
      </div>

      {/* Toggle switch */}
      <div className="header__container-bar">
        <div className="header__switch">
          <ToggleSwitch />
        </div>

        {/* Conditional rendering based on login state */}
        {currentUser ? (
          // Logged-In State
          <div className="header__user">
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__user-name">
                  {currentUser?.name || "Guest"}
                </p>
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser?.name || "Guest"}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-placeholder">
                    {getInitials(currentUser?.name || "Guest")}
                  </div>
                )}
              </div>
            </Link>
          </div>
        ) : (
          // Logged-Out State
          <div className="header__auth">
            <button
              onClick={openLoginModal}
              type="button"
              className="header__auth-btn"
            >
              Log In
            </button>
            <button
              onClick={openSignupModal}
              type="button"
              className="header__auth-btn"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;