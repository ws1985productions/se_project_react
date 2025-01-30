import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  handleEditProfileClick,
  onCardClick,
  items,
  handleAddClick,
  handleLogout,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditProfileClick={handleEditProfileClick}
          onLogout={handleLogout}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          items={items}
          handler={onCardClick}
          onClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;