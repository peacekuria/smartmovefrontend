import { useState, useEffect, useRef } from "react";
import "./MapView.css";
import { MapsService } from "../services/mapsService";

export default function MapView({ onNavigate }) {
  const [pin, setPin] = useState("");
  const [trackingStatus, setTrackingStatus] = useState("idle");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(null);
  const [isLive, setIsLive] = useState(false);
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markerRef = useRef(null);
  const moverMarkerRef = useRef(null);
  const autocompleteRef = useRef(null);
  const watchIdRef = useRef(null);
  const trackingIntervalRef = useRef(null);

  // Load Google Maps on component mount
  useEffect(() => {
    async function initMap() {
      try {
        console.log("Fetching Google Maps API key...");
        const apiKey = await MapsService.getApiKey();
        await MapsService.loadGoogleMapsScript(apiKey);

        if (mapRef.current && window.google) {
          const defaultCenter = { lat: -1.286389, lng: 36.817223 }; // Nairobi
          googleMapRef.current = new window.google.maps.Map(mapRef.current, {
            center: defaultCenter,
            zoom: 12,
            styles: [
              { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }
            ]
          });

          markerRef.current = new window.google.maps.Marker({
            map: googleMapRef.current,
            position: defaultCenter,
            title: "Your Location",
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#4F46E5",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "#FFFFFF",
            }
          });

          setMapLoaded(true);
        }
      } catch (error) {
        console.error("Failed to initialize map:", error);
        setMapError(`Failed to load map: ${error.message}`);
      }
    }
    initMap();

    return () => {
      if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
      if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current);
    };
  }, []);

  // Live Tracking Logic
  useEffect(() => {
    if (!isLive || !mapLoaded) {
      if (watchIdRef.current) navigator.geolocation.clearWatch(watchIdRef.current);
      if (trackingIntervalRef.current) clearInterval(trackingIntervalRef.current);
      return;
    }

    const role = localStorage.getItem("userRole");

    // Start watching position
    if (navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          markerRef.current.setPosition(loc);
          if (googleMapRef.current) googleMapRef.current.panTo(loc);

          // If Mover, report location
          if (role === 'mover') {
            MapsService.updateLocation(loc.lat, loc.lng);
          }
        },
        (err) => console.error("Tracking error:", err),
        { enableHighAccuracy: true }
      );
    }

    // If Client, poll for mover location
    if (role === 'client') {
      // Find an active booking id - for demo we'll use a placeholder or check localStorage
      const activeBooking = JSON.parse(localStorage.getItem("activeBooking") || "null");
      if (activeBooking && activeBooking.id) {
        trackingIntervalRef.current = setInterval(async () => {
          try {
            const moverLoc = await MapsService.getMoverLocation(activeBooking.id);
            if (moverLoc.status === 'assigned' && moverLoc.lat) {
              const pos = { lat: moverLoc.lat, lng: moverLoc.lng };
              if (!moverMarkerRef.current) {
                moverMarkerRef.current = new window.google.maps.Marker({
                  map: googleMapRef.current,
                  position: pos,
                  title: moverLoc.mover_name || "Mover",
                  icon: "https://maps.google.com/mapfiles/ms/icons/truck.png"
                });
              } else {
                moverMarkerRef.current.setPosition(pos);
              }
            }
          } catch (e) {
            console.error("Failed to fetch mover location", e);
          }
        }, 5000);
      }
    }
  }, [isLive, mapLoaded]);

  // Existing methods simplified/preserved
  function useCurrentLocation() {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    setTrackingStatus("pinning");
    navigator.geolocation.getCurrentPosition((pos) => {
      const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      googleMapRef.current.setCenter(loc);
      googleMapRef.current.setZoom(15);
      markerRef.current.setPosition(loc);
      setTrackingStatus("active");
    });
  }

  function toggleLiveTracking() {
    setIsLive(!isLive);
    setTrackingStatus(!isLive ? "active" : "idle");
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
              className={`tracking-status p-4 rounded-xl mb-4 ${isLive
                  ? "active"
                  : trackingStatus === "pinning"
                    ? "pinning"
                    : "idle"
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="status-icon">
                  {isLive ? (
                    <div className="live-pulse" />
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
                    {isLive
                      ? "Live Tracking Active"
                      : trackingStatus === "pinning"
                        ? "Pinning Location..."
                        : "Not Tracking"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {isLive
                      ? "Your location is being updated live"
                      : "Enable live tracking for real-time updates"}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={toggleLiveTracking}
              className={`w-full py-3 rounded-xl font-semibold transition-all ${isLive
                  ? "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
                }`}
            >
              {isLive ? "Stop Tracking" : "Start Live Tracking"}
            </button>
            <button
              onClick={enableNotifications}
              className="btn-secondary w-full mt-3"
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
