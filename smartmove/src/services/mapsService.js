import { apiGet, apiPost } from "../utils/api"; // Corrected import

/**
 * Maps Service - Handles Google Maps API interactions
 */
export const MapsService = {
  /**
   * Fetch Google Maps API key from backend
   */
  async getApiKey() {
    try {
      const response = await apiGet("/maps/config/google-maps-key"); // Use apiGet
      return response.googleMapsApiKey; // Assuming response directly contains the key, not data.googleMapsApiKey
    } catch (error) {
      console.error("Failed to fetch Google Maps API key:", error);
      throw error;
    }
  },

  /**
   * Calculate distance between two locations
   */
  async calculateDistance(origin, destination) {
    try {
      const response = await apiPost("/maps/calculate-distance", { origin, destination }); // Use apiPost
      return response; // Assuming response directly contains the data, not response.data
    } catch (error) {
      console.error("Failed to calculate distance:", error);
      throw error;
    }
  },

  /**
   * Load Google Maps script dynamically
   */
  loadGoogleMapsScript(apiKey) {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (window.google && window.google.maps) {
        resolve(window.google.maps);
        return;
      }

      // Check if script is already being loaded
      const existingScript = document.querySelector(
        'script[src*="maps.googleapis.com"]',
      );
      if (existingScript) {
        existingScript.addEventListener("load", () => {
          resolve(window.google.maps);
        });
        return;
      }

      // Create and load script
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(window.google.maps);
      script.onerror = () => reject(new Error("Failed to load Google Maps"));
      document.head.appendChild(script);
    });
  },

  /**
   * Update current mover location
   */
  async updateLocation(lat, lng) {
    try {
      return await apiPost("/movers/location", { lat, lng });
    } catch (error) {
      console.error("Failed to update location:", error);
      throw error;
    }
  },

  /**
   * Get assigned mover location for a booking
   */
  async getMoverLocation(bookingId) {
    try {
      const response = await apiGet(`/bookings/${bookingId}/tracker`);
      return response.data; // tracker_data returned inside 'data' by success()
    } catch (error) {
      console.error("Failed to fetch mover location:", error);
      throw error;
    }
  },
};
