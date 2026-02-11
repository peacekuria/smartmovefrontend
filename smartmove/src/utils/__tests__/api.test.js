/**
 * API Utility Tests
 *
 * Tests for the API utility functions to ensure they work correctly
 * with the configured API_BASE_URL.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { apiGet, apiPost, apiPut, apiDelete, API_BASE_URL } from "../api";

// Mock fetch globally
global.fetch = vi.fn();

describe("API Utilities", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe("API_BASE_URL", () => {
    it("should be defined", () => {
      expect(API_BASE_URL).toBeDefined();
    });

    it("should use /api prefix", () => {
      expect(API_BASE_URL).toMatch(/\/api$/);
    });
  });

  describe("apiGet", () => {
    it("should make GET request with correct URL", async () => {
      const mockData = { id: 1, name: "Test" };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await apiGet("/users");

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/users"),
        expect.objectContaining({
          method: "GET",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
        }),
      );
      expect(result).toEqual(mockData);
    });

    it("should include auth token if available", async () => {
      localStorage.setItem("auth_token", "test-token");
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await apiGet("/users");

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "Bearer test-token",
          }),
        }),
      );
    });
  });

  describe("apiPost", () => {
    it("should make POST request with data", async () => {
      const postData = { name: "New User", email: "test@example.com" };
      const mockResponse = { id: 1, ...postData };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await apiPost("/users", postData);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/users"),
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify(postData),
        }),
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("apiPut", () => {
    it("should make PUT request with data", async () => {
      const updateData = { name: "Updated Name" };
      const mockResponse = { id: 1, ...updateData };

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await apiPut("/users/1", updateData);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/users/1"),
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify(updateData),
        }),
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe("apiDelete", () => {
    it("should make DELETE request", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
      });

      const result = await apiDelete("/users/1");

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/users/1"),
        expect.objectContaining({
          method: "DELETE",
        }),
      );
      expect(result).toBeNull();
    });
  });

  describe("Error Handling", () => {
    it("should throw error on failed request", async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
        json: async () => ({ message: "User not found" }),
      });

      await expect(apiGet("/users/999")).rejects.toThrow("User not found");
    });

    it("should handle network errors", async () => {
      global.fetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(apiGet("/users")).rejects.toThrow("Network error");
    });
  });
});
