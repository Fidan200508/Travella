import apiClient from "./apiClient";

const AUTH_URL = "/api/auth";

export const login = async ({ email, password }) => {
  const response = await apiClient.post(`${AUTH_URL}/login`, { email, password });
  return response.data;
};

export const signup = async (userData) => {
  const response = await apiClient.post(`${AUTH_URL}/register`, userData);
  return response.data;
};

export const logout = async () => ({ message: "Logout successful." });
export const verifyToken = async () => ({ user: null });
