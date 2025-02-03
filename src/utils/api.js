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
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update user data.");
      }
      return res.json();
    })

    .catch((error) => console.error(error.message));
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
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
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