/**
 * API Utility Module
 *
 * This module provides helper functions for making API calls to the backend.
 * It uses the API_BASE_URL from config.js which automatically adjusts based on environment:
 * - Development: http://localhost:5001/api (proxied through Vite)
 * - Production: /api (same-origin requests to Flask server)
 *
 * Usage Examples:
 *
 * // GET request
 * const users = await apiGet('/users');
 *
 * // POST request
 * const newUser = await apiPost('/auth/register', { email, password });
 *
 * // PUT request
 * const updated = await apiPut('/users/123', { name: 'New Name' });
 *
 * // DELETE request
 * await apiDelete('/users/123');
 */

import { API_BASE_URL } from "../config";

/**
 * Default headers for API requests
 */
const getDefaultHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
  };

  // Add authorization token if available
  const token = localStorage.getItem("auth_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * Handle API response
 * @param {Response} response - Fetch API response object
 * @returns {Promise<any>} Parsed JSON response
 * @throws {Error} If response is not ok
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: `HTTP ${response.status}: ${response.statusText}`,
    }));
    throw new Error(error.message || "API request failed");
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
};

/**
 * Make a GET request to the API
 * @param {string} endpoint - API endpoint (e.g., '/users' or '/bookings/123')
 * @param {Object} options - Additional fetch options
 * @returns {Promise<any>} Response data
 */
export const apiGet = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method: "GET",
    headers: getDefaultHeaders(),
    ...options,
  });

  return handleResponse(response);
};

/**
 * Make a POST request to the API
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body data
 * @param {Object} options - Additional fetch options
 * @returns {Promise<any>} Response data
 */
export const apiPost = async (endpoint, data, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method: "POST",
    headers: getDefaultHeaders(),
    body: JSON.stringify(data),
    ...options,
  });

  return handleResponse(response);
};

/**
 * Make a PUT request to the API
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body data
 * @param {Object} options - Additional fetch options
 * @returns {Promise<any>} Response data
 */
export const apiPut = async (endpoint, data, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method: "PUT",
    headers: getDefaultHeaders(),
    body: JSON.stringify(data),
    ...options,
  });

  return handleResponse(response);
};

/**
 * Make a PATCH request to the API
 * @param {string} endpoint - API endpoint
 * @param {Object} data - Request body data
 * @param {Object} options - Additional fetch options
 * @returns {Promise<any>} Response data
 */
export const apiPatch = async (endpoint, data, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: getDefaultHeaders(),
    body: JSON.stringify(data),
    ...options,
  });

  return handleResponse(response);
};

/**
 * Make a DELETE request to the API
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Additional fetch options
 * @returns {Promise<any>} Response data
 */
export const apiDelete = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: getDefaultHeaders(),
    ...options,
  });

  return handleResponse(response);
};

/**
 * Upload a file to the API
 * @param {string} endpoint - API endpoint
 * @param {FormData} formData - FormData object containing the file
 * @param {Object} options - Additional fetch options
 * @returns {Promise<any>} Response data
 */
export const apiUpload = async (endpoint, formData, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  // Don't set Content-Type header for FormData - browser will set it with boundary
  const headers = {};
  const token = localStorage.getItem("auth_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: formData,
    ...options,
  });

  return handleResponse(response);
};

// Export API_BASE_URL for direct use if needed
export { API_BASE_URL };
