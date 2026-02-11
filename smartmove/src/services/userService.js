/**
 * User Service
 *
 * Handles all user-related API calls.
 * Demonstrates proper usage of API utilities with the configured API_BASE_URL.
 */

import { apiGet, apiPut, apiDelete } from "../utils/api";

/**
 * Get user profile
 * @param {string|number} userId - User ID (optional, defaults to current user)
 * @returns {Promise<Object>} User profile data
 */
export const getUserProfile = async (userId = "me") => {
  return apiGet(`/users/${userId}`);
};

/**
 * Update user profile
 * @param {string|number} userId - User ID
 * @param {Object} updates - Profile updates
 * @returns {Promise<Object>} Updated user profile
 */
export const updateUserProfile = async (userId, updates) => {
  return apiPut(`/users/${userId}`, updates);
};

/**
 * Delete user account
 * @param {string|number} userId - User ID
 * @returns {Promise<void>}
 */
export const deleteUserAccount = async (userId) => {
  return apiDelete(`/users/${userId}`);
};

/**
 * Get user bookings
 * @param {string|number} userId - User ID
 * @returns {Promise<Array>} List of user bookings
 */
export const getUserBookings = async (userId) => {
  return apiGet(`/users/${userId}/bookings`);
};

/**
 * Get user reviews
 * @param {string|number} userId - User ID
 * @returns {Promise<Array>} List of user reviews
 */
export const getUserReviews = async (userId) => {
  return apiGet(`/users/${userId}/reviews`);
};
