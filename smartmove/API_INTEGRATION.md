# API Integration Guide

This document explains how to make API calls in the SmartMove frontend application using the configured API base URL.

## Overview

The frontend is configured to work with the Flask backend API in both development and production environments:

- **Development Mode**: API calls go to `http://localhost:5001/api` (proxied through Vite dev server)
- **Production Mode**: API calls go to `/api` (same-origin requests to Flask server)

## Configuration

### Environment Variables

The API base URL is configured via the `VITE_API_BASE_URL` environment variable:

**Development** (`.env`):

```env
VITE_API_BASE_URL=http://localhost:5001/api
```

**Production**:

```env
# Omit this variable or set to /api
VITE_API_BASE_URL=/api
```

### Config Module

The `src/config.js` file exports the API base URL:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
export { API_BASE_URL };
```

## Making API Calls

### Using API Utility Functions (Recommended)

The `src/utils/api.js` module provides helper functions for making API calls:

```javascript
import { apiGet, apiPost, apiPut, apiDelete } from "../utils/api";

// GET request
const users = await apiGet("/users");

// POST request
const newBooking = await apiPost("/bookings", {
  pickup_address: "123 Main St",
  delivery_address: "456 Oak Ave",
  move_date: "2026-03-15",
});

// PUT request
const updated = await apiPut("/bookings/123", {
  status: "confirmed",
});

// DELETE request
await apiDelete("/bookings/123");
```

### Using Service Modules (Best Practice)

Service modules encapsulate API calls for specific features:

```javascript
import { login, register } from "../services/authService";
import { getBookings, createBooking } from "../services/bookingService";
import { getUserProfile } from "../services/userService";

// Authentication
const user = await login({ email, password });

// Bookings
const bookings = await getBookings({ status: "pending" });
const newBooking = await createBooking(bookingData);

// User profile
const profile = await getUserProfile("me");
```

### Direct Fetch (If Needed)

If you need to use fetch directly:

```javascript
import { API_BASE_URL } from "../config";

const response = await fetch(`${API_BASE_URL}/bookings`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

const data = await response.json();
```

## API Endpoints

All API endpoints are prefixed with `/api/`. Here are the main endpoint categories:

### Authentication (`/api/auth`)

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Users (`/api/users`)

- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user account
- `GET /api/users/:id/bookings` - Get user bookings
- `GET /api/users/:id/reviews` - Get user reviews

### Bookings (`/api/bookings`)

- `GET /api/bookings` - List bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking
- `POST /api/bookings/quote` - Get quote
- `POST /api/bookings/:id/confirm` - Confirm booking
- `GET /api/bookings/:id/track` - Track booking

### Movers (`/api/movers`)

- `GET /api/movers` - List movers
- `GET /api/movers/:id` - Get mover details
- `POST /api/movers/:id/reviews` - Add review

### Payments (`/api/payments`)

- `POST /api/payments/mpesa/initiate` - Initiate M-PESA payment
- `POST /api/payments/mpesa/callback` - M-PESA callback
- `GET /api/payments/:id` - Get payment details

## Error Handling

The API utility functions automatically handle errors:

```javascript
import { apiPost } from "../utils/api";

try {
  const booking = await apiPost("/bookings", bookingData);
  console.log("Booking created:", booking);
} catch (error) {
  console.error("Failed to create booking:", error.message);
  // Show error to user
  toast.error(error.message);
}
```

## Authentication

The API utilities automatically include the authentication token from localStorage:

```javascript
// After login, store the token
localStorage.setItem("auth_token", token);

// All subsequent API calls will include the token
const bookings = await apiGet("/bookings"); // Token included automatically

// On logout, remove the token
localStorage.removeItem("auth_token");
```

## Testing API Integration

### Development Mode

1. Start the Flask backend:

   ```bash
   cd /path/to/backend
   python run.py
   ```

2. Start the Vite dev server:

   ```bash
   cd smartmovefrontend/smartmove
   npm run dev
   ```

3. The Vite dev server will proxy API requests to `http://localhost:5001/api`

### Production Mode

1. Build the frontend:

   ```bash
   cd smartmovefrontend/smartmove
   npm run build
   ```

2. Start Flask (which serves both API and frontend):

   ```bash
   python run.py
   ```

3. Access the application at `http://localhost:5001`

## Migration from Mock Data

To migrate from mock data to real API calls:

1. **Replace localStorage calls** with API service calls:

   ```javascript
   // Before (mock data)
   const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");

   // After (real API)
   import { getBookings } from "../services/bookingService";
   const bookings = await getBookings();
   ```

2. **Update state management** to handle async data:

   ```javascript
   const [bookings, setBookings] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
     const fetchBookings = async () => {
       try {
         const data = await getBookings();
         setBookings(data);
       } catch (error) {
         console.error("Failed to fetch bookings:", error);
       } finally {
         setLoading(false);
       }
     };

     fetchBookings();
   }, []);
   ```

3. **Add error handling** for API failures:

   ```javascript
   const [error, setError] = useState(null);

   try {
     const data = await createBooking(bookingData);
     setBookings([...bookings, data]);
   } catch (err) {
     setError(err.message);
     toast.error("Failed to create booking");
   }
   ```

## Best Practices

1. **Always use service modules** instead of calling API utilities directly in components
2. **Handle loading states** to show spinners while data is being fetched
3. **Handle errors gracefully** and show user-friendly error messages
4. **Use environment variables** for configuration, never hardcode URLs
5. **Store sensitive data** (tokens) securely in localStorage, not in state
6. **Clear tokens on logout** to prevent unauthorized access
7. **Use try-catch blocks** for all async API calls
8. **Validate data** before sending to API
9. **Show success feedback** to users after successful operations
10. **Implement retry logic** for failed requests when appropriate

## Troubleshooting

### CORS Errors in Development

If you see CORS errors:

1. Ensure Flask backend is running on port 5001
2. Check that CORS is configured in Flask for `http://localhost:5173`
3. Verify Vite proxy configuration in `vite.config.mjs`

### 404 Errors

If API endpoints return 404:

1. Verify the endpoint path includes `/api/` prefix
2. Check that Flask blueprints are registered with `/api/` prefix
3. Ensure the backend route exists

### Authentication Errors

If you get 401 Unauthorized:

1. Check that token is stored in localStorage as `auth_token`
2. Verify token is not expired
3. Ensure Authorization header is being sent

## Additional Resources

- [Flask Backend API Documentation](../../README.md)
- [Vite Configuration](./vite.config.mjs)
- [Environment Variables](./.env)
