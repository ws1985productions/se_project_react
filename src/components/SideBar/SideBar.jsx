import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import avatarPlaceholder from "../../assets/avatar.png";

function SideBar({ handleEditProfileClick, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="side-bar">
      <div className="side-bar__avatar-container">
        <img
          src={currentUser?.avatar || avatarPlaceholder}
          alt={currentUser?.name || "User Avatar"}
          className="side-bar__avatar"
        />
        <p className="side-bar__username">
          {currentUser?.name || "Guest User"}
        </p>
      </div>
      <div className="side-bar__buttons">
        <button
          className="side-bar__edit-button"
          onClick={handleEditProfileClick}
        >
          Change Profile Data
        </button>
        <button className="side-bar__logout-button" onClick={onLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;