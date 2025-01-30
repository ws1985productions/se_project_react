import "./SideBar.css";
import avatar from "../../assets/avatar.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ openSignOutModal, openProfileEditModal }) {
  const currentUser = useContext(CurrentUserContext);
  const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : "");
  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser?.name || "Guest"}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {getInitials(currentUser?.name || "Guest")}
          </div>
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <button
        className="sidebar__button sidebar__button-edit"
        onClick={openProfileEditModal}
      >
        Change profile data
      </button>
      <button
        className="sidebar__button sidebar__button-logout"
        onClick={openSignOutModal}
      >
        Logout
      </button>
    </div>
  );
}

export default SideBar;