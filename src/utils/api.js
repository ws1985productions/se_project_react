
const baseUrl = "http://localhost:3001";

// Helper function to handle response
export const checkRes = (res) => {
  if (!res.ok) {
    return res.json().then((data) => {
      throw new Error(data.message || `Error: ${res.status}`);
    });
  }
  return res.json();
};

// Helper function to include token in headers
function getHeadersWithAuth(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Fetch clothing items (unprotected)
function getItems(weatherType) {
  const query = weatherType ? `?weather_like=${weatherType}` : "";
  return fetch(`${baseUrl}/items${query}`).then(checkRes);
}

// Add a new clothing item (protected)
function postItem(item, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Ensure token is included
    },
    body: JSON.stringify(item),
  }).then(checkRes);
}

// Delete a clothing item (protected)
function deleteItem(itemId, token) {
  console.log(`Deleting item with _id: ${itemId}`); // Debug log
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: getHeadersWithAuth(token),
  }).then(checkRes);
}

// Fetch user data (protected)
function getUserData(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: getHeadersWithAuth(token),
  }).then(checkRes);
}

// Update user profile (protected)
export const updateUser = (userData, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: getHeadersWithAuth(token),
    body: JSON.stringify(userData),
  }).then(checkRes);
};

// Add a like to an item
export const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
};

// Remove a like from an item
export const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkRes);
};

// Export all other functions
export { getItems, postItem, deleteItem, getUserData };
