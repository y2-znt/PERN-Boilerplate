import { User } from "../lib/types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const fetchUsers = async () => {
  const response = await fetch(`${apiUrl}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

export const createUser = async (user: User) => {
  const response = await fetch(`${apiUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
};

export const deleteUser = async (id: number) => {
  const response = await fetch(`${apiUrl}/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }

  return response.json();
};

export const updateUser = async (user: User) => {
  const response = await fetch(`${apiUrl}/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
};
