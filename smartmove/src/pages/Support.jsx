import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  FiPhone,
  FiMail,
  FiClock,
  FiMessageCircle,
  FiArrowLeft,
  FiSend,
  FiHelpCircle,
  FiX,
} from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Support.css";

export default function Support({ onNavigate }) {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("contact");
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "👋 Hello! I'm SmartMove AI Assistant. How can I help you today?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [supportForm, setSupportForm] = useState({
    subject: "",
    message: "",
    type: "general",
  });

  const aiResponses = {
    payment:
      "For payment-related issues, our team processes payouts every Friday. Please allow 2-3 business days for the transfer. If you haven't received payment within this timeframe, please contact support directly at +254 741 234 567.",
    job: "You can track your job status in real-time through the dashboard. For job-related issues, please provide the job ID and we'll assist you immediately.",
    account:
      "For account issues like password reset or profile updates, you can manage these in your account settings. If you need further assistance, our support team is available 24/7.",
    booking:
      "To book a move, simply browse available movers/services on the platform and click 'Book Now'. You'll receive a confirmation email within minutes.",
    default:
      "Thanks for your question! For more specific assistance, please describe your issue in detail below or contact our support team directly.",
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      sender: "user",
      text: chatInput,
    };

    setChatMessages([...chatMessages, userMessage]);

    let response = aiResponses.default;
    const lowerInput = chatInput.toLowerCase();

    if (
      lowerInput.includes("payment") ||
      lowerInput.includes("payout") ||
      lowerInput.includes("earning")
    ) {
      response = aiResponses.payment;
    } else if (
      lowerInput.includes("job") ||
      lowerInput.includes("move") ||
      lowerInput.includes("track")
    ) {
      response = aiResponses.job;
    } else if (
      lowerInput.includes("account") ||
      lowerInput.includes("password") ||
      lowerInput.includes("profile")
    ) {
      response = aiResponses.account;
    } else if (
      lowerInput.includes("book") ||
      lowerInput.includes("booking") ||
      lowerInput.includes("reserve")
    ) {
      response = aiResponses.booking;
    }

    setTimeout(() => {
      const botMessage = {
        id: chatMessages.length + 2,
        sender: "bot",
        text: response,
      };
      setChatMessages((prev) => [...prev, botMessage]);
    }, 600);

    setChatInput("");
  };

  const submitSupportForm = (e) => {
    e.preventDefault();
    if (!supportForm.subject || !supportForm.message) {
      toast.warning("⚠️ Please fill in all fields");
      return;
    }

    toast.success(
      "✅ Your message has been sent to support. We'll reply within 2 hours.",
    );
    setSupportForm({ subject: "", message: "", type: "general" });
    setActiveTab("contact");
  };

  return (
    <div className="support-page">
      <ToastContainer position="top-right" autoClose={3500} />

      {/* HEADER */}
      <header className="support-header">
        <button
          className="btn-back"
          onClick={() => onNavigate && onNavigate("home")}
        >
          <FiArrowLeft /> Back
        </button>
        <div className="header-content">
          <h1>🤝 Support & Help Center</h1>
          <p>Get help from our support team or AI assistant</p>
        </div>
      </header>

      {/* QUICK CONTACT CARDS */}
      <section className="quick-contact">
        <div className="contact-card phone">
          <FiPhone className="contact-icon" />
          <h3>Phone Support</h3>
          <p className="contact-number">+254 741 234 567</p>
          <p className="contact-hours">Mon-Sun, 7:00 AM - 10:00 PM</p>
        </div>

        <div className="contact-card email">
          <FiMail className="contact-icon" />
          <h3>Email Support</h3>
          <p className="contact-number">support@smartmove.ke</p>
          <p className="contact-hours">Response within 2 hours</p>
        </div>

        <div className="contact-card chat">
          <FiHelpCircle className="contact-icon" />
          <h3>AI Assistant</h3>
          <button className="btn-ai-chat" onClick={() => setShowAIChat(true)}>
            Start Chat
          </button>
          <p className="contact-hours">Available 24/7</p>
        </div>
      </section>

      {/* TAB NAVIGATION */}
      <div className="support-tabs">
        <button
          className={`tab-btn ${activeTab === "contact" ? "active" : ""}`}
          onClick={() => setActiveTab("contact")}
        >
          📧 Contact Support
        </button>
        <button
          className={`tab-btn ${activeTab === "faq" ? "active" : ""}`}
          onClick={() => setActiveTab("faq")}
        >
          ❓ FAQ
        </button>
        <button
          className={`tab-btn ${activeTab === "tracking" ? "active" : ""}`}
          onClick={() => setActiveTab("tracking")}
        >
          📍 Issue Tracking
        </button>
      </div>

      {/* TAB CONTENT */}
      <section className="support-content">
        {activeTab === "contact" && (
          <div className="tab-panel">
            <h2>📧 Send us a Message</h2>
            <form onSubmit={submitSupportForm} className="support-form">
              <div className="form-group">
                <label>Issue Type *</label>
                <select
                  value={supportForm.type}
                  onChange={(e) =>
                    setSupportForm({ ...supportForm, type: e.target.value })
                  }
                  className="form-select"
                >
                  <option value="general">General Question</option>
                  <option value="payment">Payment Issue</option>
                  <option value="job">Job/Booking Issue</option>
                  <option value="account">Account Issue</option>
                  <option value="bug">Report a Bug</option>
                </select>
              </div>

              <div className="form-group">
                <label>Subject *</label>
                <input
                  type="text"
                  placeholder="Brief subject of your issue..."
                  value={supportForm.subject}
                  onChange={(e) =>
                    setSupportForm({ ...supportForm, subject: e.target.value })
                  }
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Message *</label>
                <textarea
                  placeholder="Please describe your issue in detail..."
                  value={supportForm.message}
                  onChange={(e) =>
                    setSupportForm({ ...supportForm, message: e.target.value })
                  }
                  className="form-textarea"
                  rows="6"
                ></textarea>
              </div>

              <button type="submit" className="btn-submit">
                <FiSend /> Send Message
              </button>
            </form>
          </div>
        )}

        {activeTab === "faq" && (
          <div className="tab-panel">
            <h2>❓ Frequently Asked Questions</h2>
            <div className="faq-list">{/* FAQ items as before */}</div>
          </div>
        )}

        {activeTab === "tracking" && (
          <div className="tab-panel">
            <h2>📍 Your Support Tickets</h2>
            <div className="tickets-list">{/* Ticket items as before */}</div>
          </div>
        )}
      </section>

      {/* AI ASSISTANT MODAL */}
      {showAIChat && (
        <div className="ai-chat-modal">
          <div className="chat-container">
            <div className="chat-header">
              <h3>🤖 AI Assistant</h3>
              <button
                className="btn-close-chat"
                onClick={() => setShowAIChat(false)}
              >
                <FiX />
              </button>
            </div>

            <div className="chat-messages">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  <div className="message-content">{msg.text}</div>
                </div>
              ))}
            </div>

            <form onSubmit={sendMessage} className="chat-form">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me anything..."
                className="chat-input"
              />
              <button type="submit" className="btn-send">
                <FiSend />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
