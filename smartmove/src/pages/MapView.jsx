import { useState, useEffect, useRef } from "react";
import "./MapView.css";
import { MapsService } from "../services/mapsService";

export default function MapView({ onNavigate }) {
  const [pin, setPin] = useState("");
  const [trackingStatus, setTrackingStatus] = useState("idle");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(null);
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markerRef = useRef(null);
  const autocompleteRef = useRef(null);

  // Load Google Maps on component mount
  useEffect(() => {
    async function initMap() {
      try {
        console.log("Fetching Google Maps API key...");
        // Fetch API key from backend
        const apiKey = await MapsService.getApiKey();
        console.log("API key received, loading Google Maps script...");

        // Load Google Maps script
        await MapsService.loadGoogleMapsScript(apiKey);
        console.log("Google Maps script loaded successfully");

        // Initialize map
        if (mapRef.current && window.google) {
          const defaultCenter = { lat: -1.286389, lng: 36.817223 }; // Nairobi, Kenya

          googleMapRef.current = new window.google.maps.Map(mapRef.current, {
            center: defaultCenter,
            zoom: 12,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
          });

          // Initialize marker
          markerRef.current = new window.google.maps.Marker({
            map: googleMapRef.current,
            position: defaultCenter,
            title: "Your Location",
            animation: window.google.maps.Animation.DROP,
          });

          console.log("Map initialized successfully");
          setMapLoaded(true);
        }
      } catch (error) {
        console.error("Failed to initialize map:", error);
        setMapError(`Failed to load map: ${error.message}`);
      }
    }

    initMap();
  }, []);

  // Initialize autocomplete when map is loaded
  useEffect(() => {
    if (mapLoaded && window.google && autocompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteRef.current,
        {
          componentRestrictions: { country: "ke" }, // Restrict to Kenya
          fields: [
            "address_components",
            "geometry",
            "name",
            "formatted_address",
          ],
        },
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          const location = place.geometry.location;
          googleMapRef.current.setCenter(location);
          googleMapRef.current.setZoom(15);

          markerRef.current.setPosition(location);
          markerRef.current.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(() => {
            markerRef.current.setAnimation(null);
          }, 2000);

          setPin(place.name || place.formatted_address);
          setTrackingStatus("active");
        }
      });
    }
  }, [mapLoaded]);

  function enableNotifications() {
    if (!("Notification" in window))
      return alert("Notifications not supported in this browser");
    Notification.requestPermission().then((p) => {
      if (p === "granted") {
        new Notification("SmartMove notifications enabled", {
          body: "You will receive updates about your move status.",
          icon: "/logo.svg",
        });
        setTrackingStatus("active");
      }
    });
  }

  function pinLocation() {
    if (!pin.trim()) {
      alert("Please enter an address or coordinates");
      return;
    }

    if (!window.google || !googleMapRef.current) {
      alert("Map is not loaded yet. Please wait.");
      return;
    }

    setTrackingStatus("pinning");

    // Use Geocoding API to convert address to coordinates
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: pin }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;

        googleMapRef.current.setCenter(location);
        googleMapRef.current.setZoom(15);

        markerRef.current.setPosition(location);
        markerRef.current.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {
          markerRef.current.setAnimation(null);
        }, 2000);

        setTrackingStatus("active");
        alert(`Location pinned: ${results[0].formatted_address}`);
      } else {
        setTrackingStatus("idle");
        alert("Location not found. Please try a different address.");
      }
    });
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setTrackingStatus("pinning");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        if (googleMapRef.current && markerRef.current) {
          googleMapRef.current.setCenter(location);
          googleMapRef.current.setZoom(15);

          markerRef.current.setPosition(location);
          markerRef.current.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(() => {
            markerRef.current.setAnimation(null);
          }, 2000);

          // Reverse geocode to get address
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location }, (results, status) => {
            if (status === "OK" && results[0]) {
              setPin(results[0].formatted_address);
            }
          });

          setTrackingStatus("active");
        }
      },
      (error) => {
        setTrackingStatus("idle");
        alert("Unable to retrieve your location: " + error.message);
      },
    );
  }

  function goBack() {
    // Prefer returning to the last visited page saved by App.navigate
    const last = localStorage.getItem("lastPage");
    if (last && last !== "map") {
      onNavigate && onNavigate(last);
      return;
    }

    // Fallback to role-based dashboard
    const previousRole = localStorage.getItem("userRole");
    if (previousRole === "mover") {
      onNavigate && onNavigate("mover-dashboard");
    } else if (previousRole === "admin") {
      onNavigate && onNavigate("admin");
    } else {
      onNavigate && onNavigate("client-dashboard");
    }
  }

  return (
    <div className="mapview-page animate-fadeIn">
      {/* Back Button */}
      <button className="btn-back-home" onClick={goBack}>
        ← Back
      </button>

      {/* Header */}
      <div className="card mb-6 header-card">
        <h2 className="text-2xl font-bold text-gray-900">Map & Tracking</h2>
        <p className="text-gray-600 mt-1">
          Pin locations for accurate quotes and real-time tracking
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2">
          <div className="card map-card overflow-hidden rounded-xl shadow-lg">
            <div className="map-container">
              {mapError ? (
                <div className="map-placeholder">
                  <div className="placeholder-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-red-500 font-medium">{mapError}</p>
                </div>
              ) : !mapLoaded ? (
                <div className="map-placeholder">
                  <div className="placeholder-icon">
                    <svg
                      className="animate-spin h-10 w-10 text-indigo-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-gray-500 font-medium">Loading Map...</p>
                </div>
              ) : (
                <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
              )}
            </div>

            {/* Pin Input */}
            <div className="mt-6 pin-input">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Location
              </label>
              <div className="flex gap-3 flex-wrap">
                <input
                  ref={autocompleteRef}
                  type="text"
                  placeholder="Enter address or coordinates"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="input-field flex-1"
                  disabled={!mapLoaded}
                />
                <button
                  onClick={pinLocation}
                  className="btn-primary"
                  disabled={!mapLoaded}
                >
                  Pin Location
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking Status & Quick Actions */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="card tracking-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Tracking Status
            </h3>
            <div
              className={`tracking-status p-4 rounded-xl mb-4 ${
                trackingStatus === "active"
                  ? "active"
                  : trackingStatus === "pinning"
                    ? "pinning"
                    : "idle"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="status-icon">
                  {trackingStatus === "active" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : trackingStatus === "pinning" ? (
                    <svg
                      className="animate-spin h-5 w-5 text-indigo-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {trackingStatus === "active"
                      ? "Tracking Active"
                      : trackingStatus === "pinning"
                        ? "Pinning Location..."
                        : "Not Tracking"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {trackingStatus === "active"
                      ? "Real-time updates enabled"
                      : "Enable notifications to track"}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={enableNotifications}
              className="btn-secondary w-full"
            >
              Enable Notifications
            </button>
          </div>

          <div className="card quick-actions-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={useCurrentLocation}
                className="quick-action-btn"
                disabled={!mapLoaded}
              >
                <p className="font-medium text-gray-900">Current Location</p>
                <p className="text-sm text-gray-500">
                  Use GPS to pin current location
                </p>
              </button>
              <button className="quick-action-btn" disabled>
                <p className="font-medium text-gray-900">Saved Locations</p>
                <p className="text-sm text-gray-500">
                  Access previously saved addresses
                </p>
              </button>
              <button className="quick-action-btn" disabled>
                <p className="font-medium text-gray-900">Route Planner</p>
                <p className="text-sm text-gray-500">Plan your moving route</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
