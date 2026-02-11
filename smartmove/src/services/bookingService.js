/**
 * Booking Service
 *
 * Handles all booking-related API calls.
 * Demonstrates proper usage of API utilities with the configured API_BASE_URL.
 */

import { apiGet, apiPost, apiPut, apiDelete } from "../utils/api";

/**
 * Get all bookings for the current user
 * @param {Object} filters - Optional filters
 * @param {string} filters.status - Filter by status
 * @param {number} filters.page - Page number for pagination
 * @param {number} filters.limit - Items per page
 * @returns {Promise<Object>} Bookings list with pagination info
 */
export const getBookings = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const endpoint = queryParams ? `/bookings?${queryParams}` : "/bookings";
  return apiGet(endpoint);
};

/**
 * Get a specific booking by ID
 * @param {string|number} bookingId - Booking ID
 * @returns {Promise<Object>} Booking details
 */
export const getBooking = async (bookingId) => {
  return apiGet(`/bookings/${bookingId}`);
};

/**
 * Create a new booking
 * @param {Object} bookingData - Booking data
 * @returns {Promise<Object>} Created booking
 */
export const createBooking = async (bookingData) => {
  return apiPost("/bookings", bookingData);
};

/**
 * Update a booking
 * @param {string|number} bookingId - Booking ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated booking
 */
export const updateBooking = async (bookingId, updates) => {
  return apiPut(`/bookings/${bookingId}`, updates);
};

/**
 * Cancel a booking
 * @param {string|number} bookingId - Booking ID
 * @returns {Promise<Object>} Cancellation confirmation
 */
export const cancelBooking = async (bookingId) => {
  return apiDelete(`/bookings/${bookingId}`);
};

/**
 * Get booking quote
 * @param {Object} quoteData - Quote request data
 * @returns {Promise<Object>} Quote details
 */
export const getQuote = async (quoteData) => {
  return apiPost("/bookings/quote", quoteData);
};

/**
 * Confirm a booking
 * @param {string|number} bookingId - Booking ID
 * @returns {Promise<Object>} Confirmed booking
 */
export const confirmBooking = async (bookingId) => {
  return apiPost(`/bookings/${bookingId}/confirm`, {});
};

/**
 * Track a booking
 * @param {string|number} bookingId - Booking ID
 * @returns {Promise<Object>} Tracking information
 */
export const trackBooking = async (bookingId) => {
  return apiGet(`/bookings/${bookingId}/track`);
};
