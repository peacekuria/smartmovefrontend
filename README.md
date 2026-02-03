# SmartMove Frontend

SmartMove is a web-based moving assistant designed to simplify and organize the house-moving process. The platform enables users to manage inventory, obtain moving cost estimates, book verified movers, and track their move in real time through a clean and intuitive interface.

This repository contains the frontend of the SmartMove application, built with React, Vite, and Tailwind CSS, and designed to integrate with a Flask and PostgreSQL backend.

## Project Overview

The SmartMove frontend provides the user interface for:

- User authentication and session management
- Inventory checklist management by room type
- Moving cost quotation and estimation
- Browsing and booking approved movers
- Viewing booking and move status updates
- Real-time mover tracking
- Role-based access control for clients, movers, and admins

The application is implemented as a Single Page Application (SPA) using Vite for fast development and optimized production builds.

## Tech Stack

- Vite – Development server and build tool
- React – Component-based UI library
- JavaScript (ES6+)
- Tailwind CSS – Utility-first styling framework
- HTML5
- Git & GitHub – Version control and collaboration

## Updated Project Structure

```text
smartmove-frontend/
│
├── public/
│   └── index.html                # Base HTML file
│
├── src/
│   ├── assets/                   # Images, icons, static files
│   │
│   ├── components/
│   │   ├── home/                 # Home page sections
│   │   │   ├── HeroSection.jsx
│   │   │   ├── FeaturesSection.jsx
│   │   │   ├── QuotePreview.jsx
│   │   │   └── CallToAction.jsx
│   │   │
│   │   ├── quotes/               # Quotation-related components
│   │   │   └── QuoteForm.jsx
│   │   │
│   │   ├── Navbar.jsx            # Navigation bar
│   │   ├── Footer.jsx            # Footer component
│   │   └── ProtectedRoute.jsx    # Role-based route protection
│   │
│   ├── pages/
│   │   ├── Home.jsx              # Landing page
│   │   ├── Quote.jsx             # Full quotation page
│   │   ├── Booking.jsx           # Booking flow page
│   │   ├── Tracker.jsx           # Real-time mover tracking
│   │   ├── Login.jsx             # Login page
│   │   ├── Register.jsx          # Registration page
│   │   ├── Dashboard.jsx         # Role-based dashboard
│   │   └── NotFound.jsx          # 404 page
│   │
│   ├── services/
│   │   └── api.js                # Backend API communication
│   │
│   ├── context/
│   │   └── AuthContext.jsx       # Global authentication state
│   │
│   ├── App.jsx                   # Root application component
│   ├── main.jsx                  # Application entry point
│   └── index.css                 # Tailwind and global styles
│
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
 ## Installation and Setup
Clone the repository
git clone https://github.com/your-org/smartmovefrontend.git

Navigate into the project directory
cd smartmovefrontend

Install dependencies
npm install

Running the Development Server
npm run dev


Open your browser and navigate to:

http://localhost:5173

License

This project was developed for educational purposes.
