/**
 * Authentication Service
 *
 * Handles all authentication-related API calls using the API utility functions.
 * This service demonstrates the proper way to make API calls with the configured API_BASE_URL.
 */

import { apiPost, apiGet } from "../utils/api";

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.email - User email
 * @param {string} userData.password - User password
 * @param {string} userData.name - User full name
 * @param {string} userData.role - User role (client, mover, admin)
 * @returns {Promise<Object>} User data and token
 */
export const register = async (userData) => {
  return apiPost("/auth/register", userData);
};

/**
 * Login user
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise<Object>} User data and token
 */
export const login = async (credentials) => {
  const response = await apiPost("/auth/login", credentials);

  // Store token in localStorage for subsequent requests
  if (response.token) {
    localStorage.setItem("auth_token", response.token);
  }

  return response;
};

/**
 * Logout user
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    await apiPost("/auth/logout", {});
  } finally {
    // Always remove token from localStorage
    localStorage.removeItem("auth_token");
  }
};

/**
 * Get current user profile
 * @returns {Promise<Object>} User profile data
 */
export const getCurrentUser = async () => {
  return apiGet("/auth/me");
};

/**
 * Request password reset
 * @param {string} email - User email
 * @returns {Promise<Object>} Success message
 */
export const requestPasswordReset = async (email) => {
  return apiPost("/auth/forgot-password", { email });
};

/**
 * Reset password with token
 * @param {string} token - Reset token from email
 * @param {string} newPassword - New password
 * @returns {Promise<Object>} Success message
 */
export const resetPassword = async (token, newPassword) => {
  return apiPost("/auth/reset-password", { token, password: newPassword });
};
