import { baseUrl } from "./constants";


function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getItems() {
  return request(`${baseUrl}/items`);
}

const addItem = ({ name, weather, imageUrl }) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  });
};

const removeItem = (_id) => {
  const token = localStorage.getItem("jwt");
  console.log("Deleting item with _id:", _id);
  return request(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const updateUserData = (username, avatar) => {
  console.log("Updating user data:", username, avatar);
  const token = localStorage.getItem("jwt");
  if (!token) {
    console.error("JWT token is missing or invalid.");
    return;
  }

  if (!username || !avatar) {
    console.error("Invalid input: Username or avatar URL is missing or empty.");
    return;
  }
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: username, avatar: avatar || "" }),
  }).then(checkResponse);
};

const addCardLike = (id, token) => {
  console.log("Card ID:", id);
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  .then(checkResponse);
};

const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  .then(checkResponse);
    
};

export {
  getItems,
  addItem,
  removeItem,
  addCardLike,
  updateUserData,
  removeCardLike,
  checkResponse,
};