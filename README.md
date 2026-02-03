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

## Project Structure

src/
│
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ForgotPassword.jsx
│   │
│   ├── client/
│   │   ├── ClientDashboard.jsx
│   │   ├── BookMove.jsx
│   │   ├── Quotes.jsx
│   │   └── ClientProfile.jsx
│   │
│   ├── mover/
│   │   ├── MoverDashboard.jsx
│   │   ├── AssignedMoves.jsx
│   │   └── Inventory.jsx
│   │
│   ├── admin/
│   │   ├── AdminDashboard.jsx
│   │   ├── Moves.jsx
│   │   ├── Customers.jsx
│   │   ├── Analytics.jsx
│   │   └── Quotes.jsx
│
├── components/
│   ├── navbar/
│   │   └── Navbar.jsx
│   │
│   ├── sidebar/
│   │   └── Sidebar.jsx
│   │
│   ├── booking/
│   │   ├── BookingCard.jsx
│   │   └── QuoteCard.jsx
│   │
│   ├── inventory/
│   │   └── InventoryItem.jsx
│   │
│   ├── map/
│   │   └── MapView.jsx
│   │
│   ├── messaging/
│   │   ├── MessageThread.jsx
│   │   └── MessageInput.jsx
│
├── layouts/
│   ├── ClientLayout.jsx
│   ├── MoverLayout.jsx
│   └── AdminLayout.jsx
│
├── routes/
│   ├── ProtectedRoute.jsx
│   └── AppRoutes.jsx
│
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── bookingService.js
│   └── quotationService.js
│
├── hooks/
│   ├── useAuth.js
│   └── useRole.js
│
├── context/
│   └── AuthContext.jsx
│
├── utils/
│   ├── formatCurrency.js
│   └── constants.js
│
├── App.jsx
├── main.jsx
└── index.css

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
