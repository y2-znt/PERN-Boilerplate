import { API_BASE_URL } from "../utils/apiClient";
import { getToken } from "../utils/getToken";

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    });

    if (response.ok) {
      console.log("Registration successful");
      const data = await response.json();
      localStorage.setItem("token", data.token);
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error during registration");
    }
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      console.log("Login successful");
      const data = await response.json();
      localStorage.setItem("token", data.token);
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error during login");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      console.log("Logout successful");
      localStorage.removeItem("token");
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error during logout");
    }
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const fetchAuthUser = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error("No token found");

    const response = await fetch(`${API_BASE_URL}/auth/current-user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching auth user:", error);
    throw error;
  }
};
