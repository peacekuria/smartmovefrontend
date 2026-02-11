/**
 * Manual API Configuration Test
 *
 * This file can be imported in a component to manually test the API configuration.
 * It verifies that the API_BASE_URL is correctly configured for the environment.
 *
 * Usage:
 * import { testApiConfiguration } from './utils/apiTest';
 *
 * // In a component or console
 * testApiConfiguration();
 */

import { API_BASE_URL } from "../config";
import { apiGet } from "./api";

/**
 * Test the API configuration
 * Logs the current API_BASE_URL and environment
 */
export const testApiConfiguration = () => {
  console.group("🔧 API Configuration Test");

  // Check environment
  const isDevelopment = import.meta.env.DEV;
  const isProduction = import.meta.env.PROD;

  console.log("Environment:", isDevelopment ? "Development" : "Production");
  console.log("API Base URL:", API_BASE_URL);
  console.log(
    "Expected URL:",
    isDevelopment ? "http://localhost:5001/api" : "/api",
  );

  // Verify URL format
  const hasApiPrefix = API_BASE_URL.endsWith("/api");
  console.log("Has /api prefix:", hasApiPrefix ? "✅" : "❌");

  // Check if URL is absolute or relative
  const isAbsoluteUrl = API_BASE_URL.startsWith("http");
  console.log(
    "URL Type:",
    isAbsoluteUrl ? "Absolute (Development)" : "Relative (Production)",
  );

  // Verify environment variable
  const envVar = import.meta.env.VITE_API_BASE_URL;
  console.log("VITE_API_BASE_URL:", envVar || "(not set, using default)");

  console.groupEnd();

  return {
    environment: isDevelopment ? "development" : "production",
    apiBaseUrl: API_BASE_URL,
    hasApiPrefix,
    isAbsoluteUrl,
    envVar,
    isValid: hasApiPrefix && (isDevelopment ? isAbsoluteUrl : !isAbsoluteUrl),
  };
};

/**
 * Test API connectivity
 * Attempts to make a request to the health endpoint
 */
export const testApiConnectivity = async () => {
  console.group("🌐 API Connectivity Test");

  try {
    // Try to fetch health endpoint (doesn't require auth)
    const healthUrl = API_BASE_URL.replace("/api", "/health");
    console.log("Testing connectivity to:", healthUrl);

    const response = await fetch(healthUrl);
    const isHealthy = response.ok;

    console.log("Backend Status:", isHealthy ? "✅ Healthy" : "❌ Unhealthy");
    console.log("Status Code:", response.status);

    if (isHealthy) {
      const data = await response.json();
      console.log("Response:", data);
    }

    console.groupEnd();

    return {
      healthy: isHealthy,
      status: response.status,
      url: healthUrl,
    };
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    console.log("Make sure the Flask backend is running on port 5001");
    console.groupEnd();

    return {
      healthy: false,
      error: error.message,
    };
  }
};

/**
 * Test API endpoint with authentication
 * Attempts to make a request to an authenticated endpoint
 */
export const testAuthenticatedEndpoint = async () => {
  console.group("🔐 Authenticated Endpoint Test");

  const token = localStorage.getItem("auth_token");
  console.log("Auth Token:", token ? "✅ Present" : "❌ Not found");

  if (!token) {
    console.log("Skipping authenticated test - no token available");
    console.log("Login first to test authenticated endpoints");
    console.groupEnd();
    return { skipped: true };
  }

  try {
    // Try to fetch current user (requires auth)
    const data = await apiGet("/auth/me");
    console.log("✅ Authenticated request successful");
    console.log("User data:", data);
    console.groupEnd();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("❌ Authenticated request failed:", error.message);
    console.groupEnd();

    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Run all API tests
 */
export const runAllApiTests = async () => {
  console.log("🚀 Running API Configuration Tests...\n");

  const configTest = testApiConfiguration();
  console.log("\n");

  const connectivityTest = await testApiConnectivity();
  console.log("\n");

  const authTest = await testAuthenticatedEndpoint();
  console.log("\n");

  console.log("📊 Test Summary:");
  console.log("Configuration:", configTest.isValid ? "✅ Valid" : "❌ Invalid");
  console.log(
    "Connectivity:",
    connectivityTest.healthy ? "✅ Connected" : "❌ Disconnected",
  );
  console.log(
    "Authentication:",
    authTest.skipped
      ? "⏭️ Skipped"
      : authTest.success
        ? "✅ Working"
        : "❌ Failed",
  );

  return {
    config: configTest,
    connectivity: connectivityTest,
    auth: authTest,
  };
};

// Export for console testing
if (typeof window !== "undefined") {
  window.testApiConfiguration = testApiConfiguration;
  window.testApiConnectivity = testApiConnectivity;
  window.testAuthenticatedEndpoint = testAuthenticatedEndpoint;
  window.runAllApiTests = runAllApiTests;

  console.log("💡 API Test functions available in console:");
  console.log("  - testApiConfiguration()");
  console.log("  - testApiConnectivity()");
  console.log("  - testAuthenticatedEndpoint()");
  console.log("  - runAllApiTests()");
}
