import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import avatarPlaceholder from "../../assets/avatar.svg";
import "./SideBar.css";
import Avatar from "../Avatar/Avatar";

const SideBar = ({ handleLogOut, changeCurrentUserData }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const avatar = currentUser?.avatar || avatarPlaceholder;
  const username = currentUser?.name || "User";

  return (
    <div className="sideBar">
      <div className="sideBar__userInfo">
        <Avatar
          avatar={currentUser?.avatar}
          name={currentUser?.name || "User"}
        />
        <p className="sideBar__userName">{username || "User Avatar"}</p>
      </div>
      <div className="sideBar__editProfile">
        <button
          className="sideBar__changeUserData"
          onClick={changeCurrentUserData}
          type="button"
        >
          Change Profile Data
        </button>
        <button
          className="sideBar__logout"
          onClick={handleLogOut}
          type="button"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SideBar;