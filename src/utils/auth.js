const baseUrl =
  (typeof process !== "undefined" &&
    process.env &&
    process.env.REACT_APP_BASE_URL) ||
  "http://localhost:3001";

export async function signUserIn(data) {
  const res = await fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "Error during sign in");
  }

  return result;
}

export async function signUserUp(data) {
  const res = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "Error during sign up");
  }

  return result;
}

export async function fetchUserData(token) {
  try {
    const response = await fetch(`${baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Error fetching user data");
    }
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}