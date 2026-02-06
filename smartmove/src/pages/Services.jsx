import React from 'react'
import './Services.css'

export default function Services({ onNavigate }) {
  return (
    <div className="services-page">
      {/* Header is rendered globally by the app; services content follows */}

      <div className="content-container">
        {/* Intro */}
        <section className="services-hero">
          <span className="services-tag-pill">Comprehensive Solutions</span>
          <h1>Moving Services for Every Need</h1>
          <p>
            From local moves to cross-country relocations, we offer a complete
            range of professional moving services tailored to your requirements.
          </p>
        </section>

        {/* Services Grid */}
        <section className="services-grid">
          <ServiceCard
            title="Local Moving"
            description="Moving within Nairobi, Kisumu, Nakuru and surrounding areas"
            image="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&q=80&w=800"
            features={[
              "Same-day service available",
              "Professional loading and unloading",
              "Furniture disassembly and reassembly",
              "Basic insurance included",
            ]}
            price="Starting at KES 29,900"
            onQuote={() => onNavigate('booking')}
          />

          <ServiceCard
            title="Inter-City Moving"
            description="Relocations between Kenyan cities"
            image="https://images.unsplash.com/photo-1520038410233-7141be7e6f97?auto=format&fit=crop&q=80&w=800"
            features={[
              "Door-to-door service",
              "Real-time tracking",
              "Full-value protection",
              "Flexible scheduling",
            ]}
            price="Custom Quote"
            onQuote={() => onNavigate('booking')}
          />

          <ServiceCard
            title="Office Relocation"
            description="Commercial moving for businesses"
            image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"
            features={[
              "Minimal business downtime",
              "IT equipment handling",
              "After-hours moving available",
              "Project management included",
            ]}
            price="Custom Quote"
            onQuote={() => onNavigate('booking')}
          />

          <ServiceCard
            title="Specialty Items"
            description="Moving delicate and valuable items"
            image="https://images.unsplash.com/photo-1566121316354-f2a402d4850d?auto=format&fit=crop&q=80&w=800"
            features={[
              "Piano and organ moving",
              "Fine art transportation",
              "Antique furniture care",
              "Custom solutions available",
            ]}
            price="Starting at KES 39,900"
            onQuote={() => onNavigate('booking')}
          />
        </section>

        {/* Why Choose Us */}
        <section className="why-choose">
          <p className="subtitle">Why Choose SmartMove</p>
          <h2>We're committed to making your move smooth, safe, and stress-free</h2>
          
          <div className="usp-grid">
            <div className="usp-card">
              <div className="usp-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l2 5 5 .5-4 3 1.2 5L12 14l-4.2 1.5L9 10 5 7l5-.5L12 2z" />
                </svg>
              </div>
              <h4>Fully Licensed & Insured</h4>
              <p>Your belongings are protected every step of the way</p>
            </div>
            <div className="usp-card">
              <div className="usp-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5V8a2 2 0 00-2-2h-3M7 20H2V8a2 2 0 012-2h3m6 0H9" />
                </svg>
              </div>
              <h4>Experienced Team</h4>
              <p>Trained professionals with years of moving expertise</p>
            </div>
            <div className="usp-card">
              <div className="usp-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7" />
                </svg>
              </div>
              <h4>Satisfaction Guaranteed</h4>
              <p>We're not happy until you're happy with your move</p>
            </div>
          </div>
        </section>
      </div>

      {/* Black Footer CTA */}
      <footer className="footer-cta">
        <p>Ready to Get Started?</p>
        <h2>Get a personalized quote for your move in just a few minutes</h2>
        <button className="btn-footer" onClick={() => onNavigate('booking')}>Get Free Quote →</button>
      </footer>
    </div>
  )
}

function ServiceCard({ title, description, image, features, price, onQuote }) {
  return (
    <div className="service-card">
      <div className="image-wrapper">
        <img src={image} alt={title} />
      </div>
      <div className="service-content">
        <div className="card-header">
           <div className="mini-icon">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
             </svg>
           </div>
           <div>
             <h3>{title}</h3>
             <p className="service-desc">{description}</p>
           </div>
        </div>

        <ul className="feature-list">
          {features.map((item, index) => (
            <li key={index}><span className="check">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </span> {item}</li>
          ))}
        </ul>

        <div className="service-footer">
          <span className="price">{price}</span>
          <button className="btn-quote-outline" onClick={onQuote}>Get Quote →</button>
        </div>
      </div>
    </div>
  )
}

