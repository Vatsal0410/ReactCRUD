import type { User } from "../store/userStore";

const API_URL = "https://crud-api-5f45.onrender.com";

const fetchAPI = async (endpoint: string, options: RequestInit) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const authService = {
  login: async (email: string, password: string) => {
    return fetchAPI("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },
  register: async (name: string, email: string, department: string) => {
    return fetchAPI("/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, department }),
    });
  },
};

export const userService = {
  fetchUsers: async (token: string): Promise<User[]> => {
    return fetchAPI("/dashboard/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  addUser: async (
    token: string,
    user: { name: string; email: string; department: string }
  ): Promise<User> => {
    return fetchAPI("/dashboard/user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
  },
  updateUser: async (
    token: string,
    userId: string,
    user: { name: string; email: string; department: string }
  ): Promise<User> => {
    return fetchAPI(`/dashboard/user/${userId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
  },
  deleteUser: async (token: string, id: string): Promise<void> => {
    return fetchAPI(`/dashboard/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
