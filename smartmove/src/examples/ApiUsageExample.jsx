/**
 * API Usage Example Component
 *
 * This component demonstrates how to properly use the API utilities
 * and service modules to make API calls in the SmartMove frontend.
 *
 * This is a reference implementation showing best practices for:
 * - Making API calls with proper error handling
 * - Managing loading states
 * - Displaying data from API responses
 * - Handling authentication
 */

import React, { useState, useEffect } from "react";
import { apiGet, apiPost } from "../utils/api";
import { getBookings, createBooking } from "../services/bookingService";
import { login } from "../services/authService";

/**
 * Example 1: Simple API call with loading and error states
 */
export function SimpleApiExample() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        // Using API utility directly
        const data = await apiGet("/users");
        setUsers(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Example 2: Using service modules (recommended approach)
 */
export function ServiceModuleExample() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);

        // Using service module - cleaner and more maintainable
        const data = await getBookings({ status: "pending" });
        setBookings(data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Pending Bookings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              {booking.pickup_address} → {booking.delivery_address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Example 3: Form submission with API call
 */
export function FormSubmissionExample() {
  const [formData, setFormData] = useState({
    pickup_address: "",
    delivery_address: "",
    move_date: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(false);

      // Create booking using service module
      const newBooking = await createBooking(formData);

      console.log("Booking created:", newBooking);
      setSuccess(true);

      // Reset form
      setFormData({
        pickup_address: "",
        delivery_address: "",
        move_date: "",
      });
    } catch (err) {
      setError(err.message);
      console.error("Failed to create booking:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Create Booking</h2>

      {success && <div className="success">Booking created successfully!</div>}
      {error && <div className="error">Error: {error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pickup Address"
          value={formData.pickup_address}
          onChange={(e) =>
            setFormData({ ...formData, pickup_address: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Delivery Address"
          value={formData.delivery_address}
          onChange={(e) =>
            setFormData({ ...formData, delivery_address: e.target.value })
          }
          required
        />

        <input
          type="date"
          value={formData.move_date}
          onChange={(e) =>
            setFormData({ ...formData, move_date: e.target.value })
          }
          required
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Creating..." : "Create Booking"}
        </button>
      </form>
    </div>
  );
}

/**
 * Example 4: Authentication flow
 */
export function AuthenticationExample() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      // Login using auth service
      const userData = await login(credentials);

      // Token is automatically stored in localStorage by the service
      setUser(userData);

      console.log("Logged in as:", userData);
    } catch (err) {
      setError(err.message);
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div>
        <h2>Welcome, {user.name}!</h2>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Login</h2>

      {error && <div className="error">Error: {error}</div>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

/**
 * Example 5: Polling/Real-time updates
 */
export function PollingExample() {
  const [trackingData, setTrackingData] = useState(null);
  const [isPolling, setIsPolling] = useState(false);

  useEffect(() => {
    if (!isPolling) return;

    const pollInterval = setInterval(async () => {
      try {
        // Poll tracking data every 5 seconds
        const data = await apiGet("/bookings/123/track");
        setTrackingData(data);
      } catch (err) {
        console.error("Failed to fetch tracking data:", err);
      }
    }, 5000);

    return () => clearInterval(pollInterval);
  }, [isPolling]);

  return (
    <div>
      <h2>Live Tracking</h2>

      <button onClick={() => setIsPolling(!isPolling)}>
        {isPolling ? "Stop Tracking" : "Start Tracking"}
      </button>

      {trackingData && (
        <div>
          <p>Status: {trackingData.status}</p>
          <p>Location: {trackingData.current_location}</p>
          <p>ETA: {trackingData.estimated_arrival}</p>
        </div>
      )}
    </div>
  );
}

/**
 * Example 6: Optimistic updates
 */
export function OptimisticUpdateExample() {
  const [items, setItems] = useState([]);

  const addItem = async (newItem) => {
    // Optimistically add item to UI
    const tempId = Date.now();
    const optimisticItem = { ...newItem, id: tempId, _pending: true };
    setItems([...items, optimisticItem]);

    try {
      // Make API call
      const createdItem = await apiPost("/items", newItem);

      // Replace optimistic item with real data
      setItems(items.map((item) => (item.id === tempId ? createdItem : item)));
    } catch (err) {
      // Rollback on error
      setItems(items.filter((item) => item.id !== tempId));
      console.error("Failed to add item:", err);
    }
  };

  return (
    <div>
      <h2>Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ opacity: item._pending ? 0.5 : 1 }}>
            {item.name} {item._pending && "(saving...)"}
          </li>
        ))}
      </ul>
      <button onClick={() => addItem({ name: "New Item" })}>Add Item</button>
    </div>
  );
}

// Export all examples
export default {
  SimpleApiExample,
  ServiceModuleExample,
  FormSubmissionExample,
  AuthenticationExample,
  PollingExample,
  OptimisticUpdateExample,
};
