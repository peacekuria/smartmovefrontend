import React, { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Booking.css";

export default function Booking({ onNavigate, selectedMover, onConfirm }) {
  const { user } = useContext(AuthContext);
  const moversRef = useRef();
  const [localSelectedMover, setLocalSelectedMover] = useState(
    selectedMover || null,
  );

  const MOVERS = [
    { id: 1, name: "QuickMove Ltd", rating: 4.7 },
    { id: 2, name: "SafeHands Movers", rating: 4.5 },
    { id: 3, name: "BudgetMove", rating: 4.0 },
  ];
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

  const [bookedDates, setBookedDates] = useState(new Set());

  useEffect(() => {
    try {
      const existing = JSON.parse(
        localStorage.getItem("bookingHistory") || "[]",
      );
      const dates = new Set(existing.map((b) => b.moveDate).filter(Boolean));
      setBookedDates(dates);
    } catch (e) {
      setBookedDates(new Set());
    }
  }, []);

  const todayIso = new Date().toISOString().split("T")[0];

  const handleDateChange = (e) => {
    const value = e.target.value;
    if (!value) {
      setFormData({ ...formData, moveDate: "" });
      return;
    }

    // Prevent past dates
    if (value < todayIso) {
      alert("Please choose a date today or in the future.");
      setFormData({ ...formData, moveDate: "" });
      return;
    }

    // Prevent booking on already-booked dates
    if (bookedDates.has(value)) {
      alert("Sorry — that date is already booked. Please choose another day.");
      setFormData({ ...formData, moveDate: "" });
      return;
    }

    setFormData({ ...formData, moveDate: value });
  };

  const steps = [
    { label: "Move Details", sub: "Where & when" },
    { label: "Home Details", sub: "Size & items" },
    { label: "Services", sub: "Additional services" },
    { label: "Contact Info", sub: "Your details" },
    { label: "Payment", sub: "Secure checkout" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step: Mpesa payment simulation
      handleMpesaPayment();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      // Step 1: navigate home
      onNavigate && onNavigate("home");
    }
  };

  function handleBookFromList(mover) {
    if (user && (user.role === "client" || user.role === "mover")) {
      setLocalSelectedMover(mover);
      // scroll to booking form
      setTimeout(() => {
        document
          .querySelector(".booking-card")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 120);
    } else {
      // prompt login as client by default
      onNavigate && onNavigate("login", { role: "client" });
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const calculateTotal = () => {
    const basePrice = 89900;
    const packingCost = formData.packing ? 15000 : 0;
    const storageCost = formData.storage ? 20000 : 0;
    const insuranceCost = formData.insurance ? 10000 : 0;
    return basePrice + packingCost + storageCost + insuranceCost;
  };

  const handleMpesaPayment = () => {
    // require signed-in user (client or mover) before allowing payment
    if (!user || (user.role !== "client" && user.role !== "mover")) {
      onNavigate && onNavigate("login", { role: "client" });
      return;
    }
    // ensure move date selected
    if (!formData.moveDate) {
      alert("Please select a preferred move date before proceeding.");
      setCurrentStep(1);
      return;
    }

    // disallow booking if date already taken (race-safe check)
    if (bookedDates.has(formData.moveDate)) {
      alert("That move date has just been booked. Please select another date.");
      setCurrentStep(1);
      return;
    }
    const total = calculateTotal();
    const transactionRef = "TXN-" + Date.now();

    // Simulate payment processing
    const bookingRecord = {
      id: transactionRef,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      from: `${formData.fromAddress}, ${formData.fromCity}`,
      to: `${formData.toAddress}, ${formData.toCity}`,
      moveDate: formData.moveDate,
      amount: total,
      status: "Completed",
      paymentMethod: "M-PESA",
      reference: transactionRef,
      services: {
        packing: formData.packing,
        storage: formData.storage,
        insurance: formData.insurance,
      },
      user: user
        ? { name: user.name, email: user.email, role: user.role }
        : null,
    };

    // Store booking in localStorage for history
    const existingBookings = JSON.parse(
      localStorage.getItem("bookingHistory") || "[]",
    );
    existingBookings.push(bookingRecord);
    localStorage.setItem("bookingHistory", JSON.stringify(existingBookings));

    // update local bookedDates set so UI reflects newly reserved date
    try {
      setBookedDates((prev) => {
        const next = new Set(prev);
        if (bookingRecord.moveDate) next.add(bookingRecord.moveDate);
        return next;
      });
    } catch (e) {}

    // Show confirmation
    alert(
      `Payment Successful!\n\nTransaction Reference: ${transactionRef}\nAmount: KES ${total.toLocaleString()}\n\nYour booking has been confirmed.`,
    );

    // Navigate back to dashboard
    const userRole = localStorage.getItem("userRole");
    if (userRole === "mover") {
      onNavigate && onNavigate("mover-dashboard");
    } else {
      onNavigate && onNavigate("client-dashboard");
    }
  };

  return (
    <div className="booking-page">
      {/* Available movers list (visible to all) */}
      <div
        className="available-movers"
        ref={moversRef}
        style={{ maxWidth: 1100, margin: "24px auto" }}
      >
        <h3>Available Moving Companies</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 12,
          }}
        >
          {MOVERS.map((m) => (
            <div
              key={m.id}
              style={{
                padding: 12,
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 8px 20px rgba(2,6,23,0.04)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>{m.name}</strong>
                  <div style={{ fontSize: 13, color: "#6b7280" }}>
                    {m.rating} ★
                  </div>
                </div>
                <div>
                  <button
                    className="btn-demo"
                    onClick={() => handleBookFromList(m)}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="booking-content">
        <div className="booking-header">
          <h2>Get Your Moving Quote</h2>
          <p>Fill in the form to get a personalized moving estimate</p>
        </div>

        {/* Stepper */}
        <div className="booking-steps">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step-item ${
                currentStep === index + 1 ? "active" : ""
              } ${currentStep > index + 1 ? "completed" : ""}`}
            >
              <div className="step-icon">{index + 1}</div>
              <span className="step-label">{step.label}</span>
              <span className="step-sub">{step.sub}</span>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="booking-card">
          <h3 className="form-section-title">
            Step {currentStep} of {steps.length}: {steps[currentStep - 1].label}
          </h3>

          {/* Step Content */}
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
                  <option value="">Select Move Type</option>
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
                  onChange={handleDateChange}
                  min={todayIso}
                />
                {bookedDates && bookedDates.size > 0 && (
                  <div style={{ marginTop: 8, fontSize: 13, color: "#b91c1c" }}>
                    Unavailable dates:{" "}
                    {Array.from(bookedDates).slice(0, 5).join(", ")}
                    {bookedDates.size > 5 ? "..." : ""}
                  </div>
                )}
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
                  <option value="">Select Home Size</option>
                  <option value="bedsitter">Bedsitter</option>
                  <option value="studio">Studio</option>
                  <option value="1br">1 Bedroom</option>
                  <option value="2br">2 Bedrooms</option>
                  <option value="3br">3 Bedrooms</option>
                  <option value="4br">4+ Bedrooms</option>
                </select>
              </div>
              <div className="form-group">
                <label>Approx. Number of Items</label>
                <input
                  type="number"
                  name="items"
                  className="form-input"
                  placeholder="e.g., 20"
                  value={formData.items}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="step-content">
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
                      Professional packing of items
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
                      Safe storage of belongings
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

          {currentStep === 5 && (
            <div className="step-content payment-content">
              <div className="payment-summary">
                <h4>Order Summary</h4>
                <div className="summary-line">
                  <span>Base Moving Service</span>
                  <span>KES 89,900</span>
                </div>
                {formData.packing && (
                  <div className="summary-line">
                    <span>Packing Services</span>
                    <span>KES 15,000</span>
                  </div>
                )}
                {formData.storage && (
                  <div className="summary-line">
                    <span>Storage Services</span>
                    <span>KES 20,000</span>
                  </div>
                )}
                {formData.insurance && (
                  <div className="summary-line">
                    <span>Full Insurance Coverage</span>
                    <span>KES 10,000</span>
                  </div>
                )}
                <div className="summary-total">
                  <span>Total Amount</span>
                  <span>KES {calculateTotal().toLocaleString()}</span>
                </div>
              </div>
              <div className="payment-info">
                <p className="confidentiality-notice">
                  All transactions are encrypted and confidential. Your payment
                  information is processed securely and will never be shared
                  with third parties.
                </p>
              </div>
              <button className="btn-mpesa" onClick={handleMpesaPayment}>
                Proceed to M-PESA Payment
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="booking-actions">
            <button className="btn-back" onClick={handleBack}>
              ← Back
            </button>
            <button className="btn-next" onClick={handleNext}>
              {currentStep === steps.length ? "Pay →" : "Next →"}
            </button>
          </div>
        </div>
        <p className="security-note">
          Your information is secure and will never be shared.
        </p>
        <p className="security-note">
          All payment information is encrypted and kept strictly confidential.
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
