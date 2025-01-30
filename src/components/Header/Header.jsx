import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import logo from "../../assets/logo.png";
import avatarPlaceholder from "../../assets/avatar.png";

function Header({
  weatherData,
  isLoggedIn,
  handleRegisterClick,
  handleLoginClick,
  handleSignOut,
  handleAddClick, // Added handleAddClick as a prop
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__logo-and-date">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Logo" />
        </Link>
        <p className="header__date-and-location">
          {new Date().toLocaleString("default", {
            month: "long",
            day: "numeric",
          })}
          , {weatherData.city || "Unknown"}
        </p>
      </div>
      <div className="header__temp-and-user">
        <ToggleSwitch />
        {!isLoggedIn ? (
          <>
            <button className="header__register" onClick={handleRegisterClick}>
              Sign Up
            </button>
            <button className="header__login" onClick={handleLoginClick}>
              Log In
            </button>
          </>
        ) : (
          <button className="header__logout" onClick={handleSignOut}>
            Log Out
          </button>
        )}
        <div className="header__user-container">
          <Link to="/profile" className="header__link">
            <p className="header__user-name">{currentUser?.name || "Guest"}</p>
          </Link>
          <img
            className="header__user-avatar"
            src={currentUser?.avatar || avatarPlaceholder}
            alt="User Avatar"
          />
        </div>
        {isLoggedIn && (
          <button
            className="header__add-item"
            onClick={handleAddClick} // Corrected how handleAddClick is called
          >
            + Add Clothes
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;