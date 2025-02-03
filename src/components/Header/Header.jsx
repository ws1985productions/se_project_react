import "./Header.css";
import logo from "../../assets/Logo.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import Avatar from "../Avatar/Avatar";

function Header({
  openRegisterModal,
  openLoginModal,
  weatherData,
  handleAddClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const username = currentUser?.name || "Anonymous";
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__controls">
        <ToggleSwitch />
        {!currentUser ? (
          <div className="header__auth-buttons">
            <button
              onClick={openRegisterModal}
              type="button"
              className="header__add-clothes-btn"
            >
              Sign Up
            </button>
            <button
              onClick={openLoginModal}
              type="button"
              className="header__add-clothes-btn"
            >
              Log In
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              +Add clothes
            </button>

            <div className="header__user-container">
              <Link to="/profile" className="header__link">
                <p className="header__userName">{username}</p>
              </Link>

              <Avatar avatar={currentUser?.avatar} name={username} />
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;