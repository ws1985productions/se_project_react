import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/header";
import { coordinates, APIKey } from "../../utils/constants";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../profile/Profile";
import { getItems, addItem, deleteItem } from "../../utils/Api";
import DeleteConfirm from "../DeleteConfirmModal/DeleteConfirmModal";
import { Items } from "../../../db.json";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditModal/EditModal";
import {
  registerUser,
  logIn,
  getUserProfile,
  editUserProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  //open & close functions
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard({});
  };
  const handleLoginModal = () => {
    setActiveModal("login");
  };
  const handleRegisterModal = () => {
    setActiveModal("signup");
  };
  const handleEditModal = () => {
    setActiveModal("editprofile");
  };

  //like function
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const cardAction = isLiked ? removeCardLike : addCardLike;

    cardAction(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard.data : item))
        );
      })
      .catch(console.error);
  };
  //EditFunction
  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    editUserProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser((user) => {
          return {
            ...user,
            ...updatedUser,
          };
        });
        closeActiveModal();
      })
      .catch((err) => console.error("Edit profile error:", err));
  };

  // add item function
  const handleAddItemSubmit = (newItem, resetForm) => {
    const token = localStorage.getItem("jwt");
    addItem(newItem, token)
      .then((addItem) => {
        setClothingItems([...clothingItems, addItem.data]);
        resetForm();
        closeActiveModal();
      })
      .catch((error) => console.error("Error adding item:", error));
  };
  //delete functions
  const handleDeleteCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("delete-confirmation");
  };
  const handleDeleteCard = (card) => {
    const token = localStorage.getItem("jwt");
    deleteItem(card, token)
      .then(() => {
        setClothingItems((cards) => cards.filter((c) => c._id !== card._id));
        closeActiveModal();
      })
      .catch((error) => console.error("Error Deleting item:", error));
  };

  //login Function
  const handleLogin = ({ email, password }) => {
    logIn({ email, password })
      .then((res) => {
        if (!res.token) throw new Error("Token not received");
        localStorage.setItem("jwt", res.token);
        return getUserProfile(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate("/profile");
        console.log(user);
        closeActiveModal();
      })
      .catch((err) => console.error("Login error:", err));
  };
  //register new users
  const handleRegister = (user) => {
    registerUser(user)
      .then(() => handleLogin({ email: user.email, password: user.password }))
      .catch(console.error);
  };
  // handleSignout
  const handleSignout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };
  // toggle function for temperature
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };
  //use effects
  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
    getItems()
      .then((items) => setClothingItems(items))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);
  //
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserProfile(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Error verifying token:", err);
          setIsLoggedIn(false);
        });
    }
  }, []);
  //
  useEffect(() => {
    if (!activeModal) return; // Exit if there is no active modal

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      // Clean up event listeners
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal, closeActiveModal]);
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleLoginModal={handleLoginModal}
              handleRegisterModal={handleRegisterModal}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    items={clothingItems}
                    isLoggedIn={isLoggedIn}
                    handleCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      items={clothingItems}
                      handleEditModal={handleEditModal}
                      handleSignout={handleSignout}
                      handleCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <AddItemModal
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            handleAddItemSubmit={handleAddItemSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            handleDelete={() => handleDeleteCardClick(selectedCard)}
          />
          <Footer />
          <DeleteConfirm
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleDeleteCard={handleDeleteCard}
            selectedCard={selectedCard}
          />
          <LoginModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleRegisterModal={() => handleRegisterModal("signup")}
            isOpen={activeModal === "login"}
            onLogIn={handleLogin}
          />
          <RegisterModal
            activeModal={activeModal}
            handleLoginModal={() => handleLoginModal("login")}
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "signup"}
            onRegister={handleRegister}
          />
          <EditProfileModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "editprofile"}
            handleEditModal={() => handleEditModal("editprofile")}
            handleEditProfile={handleEditProfile}
          />
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;