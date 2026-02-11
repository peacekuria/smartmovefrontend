import React, { useState } from "react";
import "./Home.css";
import SectionHeading from "../components/SectionHeading";

export default function Home({ onNavigate }) {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleSubscribe = () => {
    const email = (newsletterEmail || "").trim();
    const valid = /^\S+@\S+\.\S+$/.test(email);
    if (!valid) {
      alert("Please enter a valid email address to subscribe.");
      return;
    }

    // demo behavior: acknowledge subscription
    alert("Thanks for subscribing — we'll keep you updated.");
    setNewsletterEmail("");
  };

  return (
    <div className="home">
      {/* Global header is rendered by `Header` component in App.jsx */}

      <section className="hero">
        <div className="hero-left">
          <div className="hero-logo">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            SmartMove
          </div>
          <h1>Your Stress-Free Moving Solution</h1>
          <p>
            Plan, book, track, and manage your move — whether you're relocating,
            moving professionally, or managing operations. Built for clients,
            movers, and administrators alike.
          </p>

          <div className="role-info">
            <h3>Explore SmartMove</h3>
            <p className="explore-subtitle">
              Try a live demo or create an account below to experience the full
              platform
            </p>
          </div>

          <div className="features-cards">
            <div className="feature-card">
              <span className="feature-icon">✓</span>
              Fully Insured & Licensed
            </div>
            <div className="feature-card">
              <span className="feature-icon">✓</span>
              On-Time Guarantee
            </div>
            <div className="feature-card">
              <span className="feature-icon">✓</span>
              Transparent Pricing
            </div>
            <div className="feature-card">
              <span className="feature-icon">✓</span>
              5-Star Rated Service
            </div>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="Modern living room"
          />
        </div>
      </section>
      <section className="roles">
        <SectionHeading
          title={"Who is SmartMove for?"}
          subtitle={"Learn more about our target audience"}
        />
        <div className="role-cards">
          <div className="role-card client-card">
            <div className="role-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="7"
                  r="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h4>For Clients</h4>
            <p>
              Plan your move, book professional movers, track inventory and
              progress in real-time.
            </p>
            <div className="button-group">
              <button
                className="btn-demo"
                onClick={() => onNavigate("client-demo")}
              >
                ▶ View Demo
              </button>
              <button onClick={() => onNavigate("login", { role: "client" })}>
                Get Started →
              </button>
            </div>
          </div>

          <div className="role-card mover-card">
            <div className="role-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M5 11V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6m0 0H3v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="8"
                  cy="17"
                  r="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="16"
                  cy="17"
                  r="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h4>For Movers</h4>
            <p>
              Manage jobs, update move status, communicate with clients, and
              grow your business.
            </p>
            <div className="button-group">
              <button
                className="btn-demo"
                onClick={() => onNavigate("mover-demo")}
              >
                ▶ View Demo
              </button>
              <button onClick={() => onNavigate("login", { role: "mover" })}>
                Get Started →
              </button>
            </div>
          </div>

          <div className="role-card admin-card">
            <div className="role-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h4>For Admins</h4>
            <p>
              Oversee platform operations, approve movers, monitor bookings, and
              view analytics.
            </p>
            <div className="button-group">
              <button
                className="btn-demo"
                onClick={() => onNavigate("admin-demo")}
              >
                ▶ View Demo
              </button>
              <button onClick={() => onNavigate("login", { role: "admin" })}>
                Get Started →
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <div className="how-title">
            <SectionHeading
              title={"How SmartMove Works"}
              subtitle={"Three simple steps to get your move started"}
            />
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div>
                <h5>Plan Your Move</h5>
                <p>
                  Use our guided planner to list items, pick services, and
                  choose dates that fit your schedule.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div>
                <h5>Book Trusted Movers</h5>
                <p>
                  Compare mover profiles, reviews, and prices — then book
                  certified professionals with one click.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div>
                <h5>Track & Manage</h5>
                <p>
                  Monitor inventory, chat with your movers, and get real-time
                  updates until delivery is complete.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h3>What Customers Say</h3>
          <p className="explore-subtitle" style={{ textAlign: "center" }}>
            Real reviews from clients who trusted SmartMove
          </p>

          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <strong>Alex P.</strong>
              <p>
                Fast, professional, and great communication — made our move
                painless.
              </p>
            </div>

            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <strong>Sara L.</strong>
              <p>
                Transparent pricing and the movers were careful with our
                furniture. Highly recommend.
              </p>
            </div>

            <div className="testimonial-card">
              <div className="stars">★★★★☆</div>
              <strong>Devin R.</strong>
              <p>
                Good service and helpful support — small hiccup resolved
                quickly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-about">
            <h4>SmartMove</h4>
            <p className="notice">
              Your stress-free moving solution — plan, book, and track moves
              with confidence.
            </p>
            <div className="social-icons">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                alt="Instagram"
                onClick={() => window.open("https://instagram.com", "_blank")}
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                alt="WhatsApp"
                onClick={() => window.open("https://wa.me/", "_blank")}
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="Facebook"
                onClick={() => window.open("https://facebook.com", "_blank")}
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                alt="Twitter"
                onClick={() => window.open("https://twitter.com", "_blank")}
              />
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("services");
              }}
            >
              Services
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("about");
              }}
            >
              About
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("inventory");
              }}
            >
              Inventory
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("booking");
              }}
            >
              Booking
            </a>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p className="contact-item">123 Main St, Suite 200, City</p>
            <p className="contact-item">Email: support@smartmove.example</p>
            <p className="contact-item">Phone: +1 (555) 123-4567</p>
          </div>

          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p className="notice">
              Subscribe for updates, tips, and promotions.
            </p>
            <div className="newsletter">
              <input
                placeholder="Your email"
                aria-label="newsletter email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <button onClick={handleSubscribe}>Subscribe</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} SmartMove. All rights reserved.
          </div>
          <div className="footer-legal">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("support");
              }}
            >
              Support
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("about");
              }}
            >
              About
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
