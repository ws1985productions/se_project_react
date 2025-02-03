import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "./Profile.css";

const Profile = ({
  onCardLike,
  onCardClick,  
  clothingItems,
  handleAddClick,
  changeCurrentUserData,
  handleLogOut,
}) => {

  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="profile">
      <section className="profile__sideBar">
        <SideBar
          changeCurrentUserData={changeCurrentUserData}
          handleLogOut={handleLogOut}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          clothingItems={clothingItems}          
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
};

export default Profile;