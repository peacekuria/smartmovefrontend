import React, { useState } from "react";
import "./Booking.css";

export default function Booking({ onNavigate, selectedMover, onConfirm }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    moveType: "",
    moveDate: "",
    fromAddress: "",
    fromCity: "",
    fromZip: "",
    toAddress: "",
    toCity: "",
    toZip: "",
    homeSize: "",
    items: "",
    packing: false,
    storage: false,
    insurance: false,
    name: "",
    phone: "",
    email: "",
  });

  const steps = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2v2m0 18v-6"
          />
        </svg>
      ),
      label: "Move Details",
      sub: "Where and when",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 9l9-6 9 6v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
      ),
      label: "Home Details",
      sub: "Size and layout",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 3v4M8 3v4"
          />
        </svg>
      ),
      label: "Services",
      sub: "What you need",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2v2m0 16v2"
          />
        </svg>
      ),
      label: "Contact Info",
      sub: "Get your quote",
    },
  ];

  function handleNext() {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finalize: if an onConfirm handler exists, call it with mover and date
      if (onConfirm) {
        if (!formData.moveDate)
          return alert("Please select a move date before confirming.");
        onConfirm({
          mover: selectedMover,
          date: formData.moveDate,
          contact: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
          },
        });
      } else {
        alert("Quote request submitted! We will contact you shortly.");
        onNavigate("home");
      }
    }
  }

  function handleBack() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  return (
    <div className="booking-page">
      {/* Header is rendered globally by the app; booking content follows */}

      <div className="booking-content">
        <div className="booking-header">
          <h2>Get Your Free Quote</h2>
          <p>
            Fill out the form below to receive a personalized moving estimate
          </p>
        </div>

        {/* Stepper */}
        <div className="booking-steps">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step-item ${currentStep === index + 1 ? "active" : ""} ${currentStep > index + 1 ? "completed" : ""}`}
              onClick={() =>
                currentStep > index + 1 && setCurrentStep(index + 1)
              }
            >
              <div className="step-icon">{step.icon}</div>
              <span className="step-label">{step.label}</span>
              <span className="step-sub">{step.sub}</span>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="booking-card">
          <h3 className="form-section-title">
            Step {currentStep} of 4: {steps[currentStep - 1].label}
          </h3>

          {/* Selected mover card */}
          <div style={{ marginBottom: 16 }}>
            {selectedMover ? (
              <div
                className="card"
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    background: "#eef2ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    color: "#4338ca",
                  }}
                >
                  {selectedMover.avatar || selectedMover.name?.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>{selectedMover.name}</div>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>
                    {selectedMover.reviews} reviews • $
                    {selectedMover.pricePerKm}/km
                  </div>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <button
                    className="btn-secondary"
                    onClick={() => onNavigate("movers")}
                  >
                    Change
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ color: "#6b7280" }}>No mover selected</div>
                <button
                  className="btn-primary"
                  onClick={() => onNavigate("movers")}
                >
                  Choose Mover
                </button>
              </div>
            )}
          </div>

          {/* Step 1: Move Details */}
          {currentStep === 1 && (
            <div className="step-content">
              <div className="form-group">
                <label>Move Type</label>
                <select
                  name="moveType"
                  className="form-input"
                  value={formData.moveType}
                  onChange={handleChange}
                >
                  <option value="">Select move type</option>
                  <option value="local">Local Move</option>
                  <option value="intercity">Inter-City Move</option>
                  <option value="office">Office Relocation</option>
                </select>
              </div>

              <div className="form-group">
                <label>Preferred Move Date</label>
                <input
                  type="date"
                  name="moveDate"
                  className="form-input"
                  value={formData.moveDate}
                  onChange={handleChange}
                />
              </div>

              <LocationGroup
                title="Moving From"
                data={formData}
                prefix="from"
                handleChange={handleChange}
              />
              <LocationGroup
                title="Moving To"
                data={formData}
                prefix="to"
                handleChange={handleChange}
              />
            </div>
          )}

          {/* Step 2: Home Details */}
          {currentStep === 2 && (
            <div className="step-content">
              <div className="form-group">
                <label>Home Size</label>
                <select
                  name="homeSize"
                  className="form-input"
                  value={formData.homeSize}
                  onChange={handleChange}
                >
                  <option value="">Select home size</option>
                  <option value="bedsitter">Bedsitter</option>
                  <option value="studio">Studio</option>
                  <option value="1br">1 Bedroom</option>
                  <option value="2br">2 Bedrooms</option>
                  <option value="3br">3 Bedrooms</option>
                  <option value="4br">4+ Bedrooms</option>
                </select>
              </div>

              <div className="form-group">
                <label>Approximate Number of Items</label>
                <input
                  type="number"
                  name="items"
                  className="form-input"
                  placeholder="e.g., 20"
                  value={formData.items}
                  onChange={handleChange}
                />
              </div>

              <div className="inventory-tips">
                <p
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginBottom: "12px",
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6M12 3v2m0 14v2m7-9h2M3 12H1m16.07 6.07l1.41 1.41M4.22 4.22L5.64 5.64M16.07 5.93l1.41-1.41M4.22 19.78l1.42-1.42"
                    />
                  </svg>
                  Use our{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate("inventory");
                    }}
                  >
                    Inventory Checklist
                  </a>{" "}
                  to count your items
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Services */}
          {currentStep === 3 && (
            <div className="step-content">
              <p
                style={{
                  fontSize: "14px",
                  color: "#374151",
                  marginBottom: "20px",
                }}
              >
                Select additional services you may need:
              </p>

              <div className="services-checkboxes">
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    name="packing"
                    checked={formData.packing}
                    onChange={handleChange}
                  />
                  <span className="checkbox-label">
                    <span className="checkbox-title">Packing Services</span>
                    <span className="checkbox-desc">
                      We pack your items professionally
                    </span>
                  </span>
                </label>

                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    name="storage"
                    checked={formData.storage}
                    onChange={handleChange}
                  />
                  <span className="checkbox-label">
                    <span className="checkbox-title">Storage</span>
                    <span className="checkbox-desc">
                      Secure storage for your belongings
                    </span>
                  </span>
                </label>

                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    name="insurance"
                    checked={formData.insurance}
                    onChange={handleChange}
                  />
                  <span className="checkbox-label">
                    <span className="checkbox-title">Full Insurance</span>
                    <span className="checkbox-desc">
                      Comprehensive coverage for your move
                    </span>
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Contact Info */}
          {currentStep === 4 && (
            <div className="step-content">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="input-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    placeholder="+254 700 000 000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="booking-actions">
            <button className="btn-back" onClick={handleBack}>
              ← Back
            </button>
            <button className="btn-next" onClick={handleNext}>
              {currentStep === 4 ? "Get Quote" : "Next →"}
            </button>
          </div>
        </div>

        <p className="security-note">
          🔒 Your information is secure and will never be shared
        </p>
      </div>
    </div>
  );
}

function LocationGroup({ title, data, prefix, handleChange }) {
  return (
    <div className="location-group">
      <p className="location-title">{title}</p>
      <div className="form-group">
        <label>Street Address</label>
        <input
          className="form-input"
          placeholder="123 Main St"
          name={`${prefix}Address`}
          value={data[`${prefix}Address`]}
          onChange={handleChange}
        />
      </div>
      <div className="input-row">
        <div className="form-group">
          <label>City</label>
          <input
            className="form-input"
            placeholder="City"
            name={`${prefix}City`}
            value={data[`${prefix}City`]}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>ZIP Code</label>
          <input
            className="form-input"
            placeholder="12345"
            name={`${prefix}Zip`}
            value={data[`${prefix}Zip`]}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
