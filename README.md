# SmartMove Frontend

**SmartMove** is a modern, professional React-based web application that streamlines the moving industry by providing comprehensive solutions for clients, movers, and administrators. This frontend application offers intuitive interfaces for booking moves, tracking inventory, managing jobs, and overseeing platform operations.

[![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)](https://vitejs.dev)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs)](https://nodejs.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Available Routes](#available-routes)
- [Component Architecture](#component-architecture)
- [Authentication & Authorization](#authentication--authorization)
- [Styling](#styling)
- [Development](#development)
- [Contributing](#contributing)

---

## Overview

SmartMove Frontend is a comprehensive solution for managing moving services. It caters to three primary user roles:

- **Clients**: Plan moves, book movers, track inventory, and monitor move progress
- **Movers**: Accept and manage jobs, update move status, communicate with clients
- **Admins**: Oversee platform operations, approve movers, monitor bookings, view analytics

The application emphasizes user experience with responsive design, smooth navigation, and role-based access control.

---

## Features

### For Clients

- **Inventory Management**: Track and organize items for your move
- **Move Booking**: Browse movers and book services with transparent pricing
- **Location Pinning**: Pin pickup and drop-off locations on interactive maps
- **Real-time Tracking**: Monitor move progress with live updates
- **Responsive Dashboard**: Manage all your moves from one place

### For Movers

- **Job Management**: View available jobs and accept assignments
- **Status Updates**: Update move progress in real-time
- **Client Communication**: Direct messaging with clients
- **Dashboard Analytics**: Track completed moves and earnings

### For Admins

- **User Management**: Approve and manage mover registrations
- **Booking Oversight**: Monitor all platform bookings
- **Analytics**: View platform metrics and insights
- **Content Management**: Manage services and platform settings

### General Features

- **Secure Authentication**: Role-based login and registration
- **Protected Routes**: Access control based on user roles
- **Professional UI**: Clean, modern, and intuitive interface
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Toast Notifications**: Real-time user feedback and alerts
- **Navigation**: Smooth page transitions with global header

---

## Tech Stack

| Category               | Technology                |
| ---------------------- | ------------------------- |
| **Frontend Framework** | React 18.2                |
| **Build Tool**         | Vite 5.0                  |
| **Styling**            | Custom CSS + Tailwind CSS |
| **State Management**   | React Context API         |
| **Notifications**      | React Toastify            |
| **Icons**              | React Icons               |
| **Version Control**    | Git                       |

---

## Project Structure

```
smartmovefrontend/
├── smartmove/                          # Main application folder
│   ├── src/
│   │   ├── components/                 # Reusable React components
│   │   │   ├── AuthForm.jsx           # Authentication form wrapper
│   │   │   ├── Header.jsx             # Global navigation header
│   │   │   └── ProtectedRoute.jsx     # Role-based route protection
│   │   │
│   │   ├── context/                    # Global state management
│   │   │   └── AuthContext.jsx        # Authentication & user state
│   │   │
│   │   ├── pages/                      # Page-level components
│   │   │   ├── Home.jsx               # Landing page with role exploration
│   │   │   ├── Home.css               # Home page styling
│   │   │   │
│   │   │   ├── Login.jsx              # User authentication
│   │   │   ├── Login.css              # Login page styling
│   │   │   │
│   │   │   ├── Signup.jsx             # User registration
│   │   │   ├── Signup.css             # Signup page styling
│   │   │   │
│   │   │   ├── About.jsx              # Company information
│   │   │   ├── About.css              # About page styling
│   │   │   │
│   │   │   ├── Services.jsx           # Service offerings
│   │   │   ├── Services.css           # Services styling
│   │   │   │
│   │   │   ├── ClientDashboard.jsx    # Client main dashboard
│   │   │   ├── ClientDashboard.css    # Client dashboard styling
│   │   │   │
│   │   │   ├── MoverDashboard.jsx     # Mover main dashboard
│   │   │   ├── MoverDashboard.css     # Mover dashboard styling
│   │   │   │
│   │   │   ├── Admin.jsx              # Admin control panel
│   │   │   ├── AdminDashboard.css     # Admin dashboard styling
│   │   │   │
│   │   │   ├── MyMoves.jsx            # Client's move history
│   │   │   ├── MyMoves.css            # MyMoves styling
│   │   │   │
│   │   │   ├── Movers.jsx             # Browse available movers
│   │   │   ├── Movers.css             # Movers list styling
│   │   │   │
│   │   │   ├── Booking.jsx            # Booking confirmation page
│   │   │   ├── Booking.css            # Booking styling
│   │   │   │
│   │   │   ├── Inventory.jsx          # Item inventory management
│   │   │   ├── Inventory.css          # Inventory styling
│   │   │   │
│   │   │   ├── MapView.jsx            # Location mapping & tracking
│   │   │   └── MapView.css            # MapView styling
│   │   │
│   │   ├── App.jsx                    # Root component & routing logic
│   │   ├── main.jsx                   # React DOM entry point
│   │   ├── style.css                  # Global styles & utilities
│   │   └── index.html                 # HTML template
│   │
│   ├── package.json                   # Dependencies & scripts
│   ├── vite.config.mjs                # Vite build configuration
│   ├── README.md                      # Application documentation
│   └── netlify.toml                   # Netlify deployment config
│
├── netlify.toml                       # Root netlify config
├── README.md                          # This file
└── .gitignore                         # Git ignore rules
```

---

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18.0 or higher)
- **npm** (v9.0 or higher)
- **Git**

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/smartmovefrontend.git
   cd smartmovefrontend
   ```

2. **Navigate to the smartmove directory**

   ```bash
   cd smartmove
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Verify installation**
   ```bash
   npm list react react-dom vite
   ```

---

## Getting Started

### Development Server

Start the development server with hot module reloading:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

This generates a `dist/` folder with minified assets ready for deployment.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

---

## Available Routes

| Route               | Component       | Access Level | Description                        |
| ------------------- | --------------- | ------------ | ---------------------------------- |
| `/`                 | Home            | Public       | Landing page with role exploration |
| `/services`         | Services        | Public       | Available moving services          |
| `/about`            | About           | Public       | Company information & team         |
| `/login`            | Login           | Public       | User authentication                |
| `/signup`           | Signup          | Public       | New user registration              |
| `/client-dashboard` | ClientDashboard | Client Only  | Client main dashboard              |
| `/mymoves`          | MyMoves         | Client Only  | Client's move history              |
| `/movers`           | Movers          | Client Only  | Browse available movers            |
| `/booking`          | Booking         | Client Only  | Booking confirmation               |
| `/inventory`        | Inventory       | Client Only  | Item inventory management          |
| `/map`              | MapView         | Client Only  | Location mapping & tracking        |
| `/mover-dashboard`  | MoverDashboard  | Mover Only   | Mover job management               |
| `/admin`            | Admin           | Admin Only   | Admin control panel                |

---

## Component Architecture

### Component Hierarchy

```
App (Root)
├── Header
│   └── Navigation Links
├── Pages (Routed)
│   ├── Home
│   ├── Services
│   ├── About
│   ├── Login
│   ├── Signup
│   ├── ClientDashboard
│   ├── MoverDashboard
│   └── Admin
└── ProtectedRoute (Wrapper)
    └── Dashboard Components
```

### Key Components

**Header.jsx** - Global navigation and user information

- Displays navigation links
- Shows user profile when authenticated
- Provides logout functionality
- Sticky positioning for accessibility

**ProtectedRoute.jsx** - Role-based access control

- Validates user role before rendering
- Redirects unauthorized users to home page
- Wrapper component for dashboard pages

**AuthForm.jsx** - Reusable authentication UI

- Standardized form styling
- Input validation
- Error handling

---

## Authentication & Authorization

### Authentication Flow

1. User visits `/login` or `/signup`
2. Credentials are validated (mock authentication)
3. User object is stored in AuthContext
4. Data persisted to localStorage
5. User is redirected to role-specific dashboard

### User Roles

| Role       | Dashboard       | Permissions                               |
| ---------- | --------------- | ----------------------------------------- |
| **Client** | ClientDashboard | Browse movers, book services, track moves |
| **Mover**  | MoverDashboard  | Accept jobs, update status                |
| **Admin**  | Admin           | Manage platform, view analytics           |

### Mock Credentials

For development/testing:

```
Client:  any@email.com + any password
Mover:   any@email.com + any password
Admin:   admin@smartmove.com + any password
```

**Demo Accounts** are available directly from login page.

---

## Styling

### CSS Organization

- **Global Styles**: `style.css` - Reset, variables, utilities
- **Page Styles**: Individual `.css` files per page component
- **Responsive Design**: Media queries for mobile/tablet/desktop
- **Color Scheme**: Professional blues, grays, and accent colors
- **Typography**: Inter font family for optimal readability

### CSS Features

- CSS variables for consistent theming
- Flexbox and CSS Grid layouts
- Smooth transitions and hover effects
- Mobile-first responsive design
- Professional shadows and spacing

---

## Development

### Code Conventions

- **Components**: PascalCase, export as default
- **Files**: kebab-case for CSS, PascalCase for JSX
- **State Management**: React Context API only
- **Styling**: Scoped CSS files per component/page

### Hot Module Reloading (HMR)

Changes to files automatically reload in the browser during development. No manual refresh needed.

### Debugging

1. Use React Developer Tools browser extension
2. Check browser console for errors
3. Use `console.log()` for variable inspection
4. Inspect network requests in DevTools

---

## Contributing

We welcome contributions! Here's how to get involved:

### Steps to Contribute

1. **Fork the repository**

   ```bash
   gh repo fork yourusername/smartmovefrontend
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow code conventions
   - Test thoroughly
   - Keep commits atomic

4. **Commit your changes**

   ```bash
   git commit -m "feat: add your feature description"
   ```

5. **Push to your branch**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Provide clear description
   - Reference related issues
   - Request review from maintainers

### Commit Message Format

```
type(scope): description

feat: add new feature
fix: resolve bug
docs: update documentation
style: format code
refactor: restructure code
test: add tests
chore: maintenance tasks
```

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## Contact & Support

For questions or support, please:

- Open an [Issue](https://github.com/yourusername/smartmovefrontend/issues)
- Contact the development team
- Check existing documentation

---

## Acknowledgments

- Built with React and Vite for optimal performance
- Designed with modern web standards
- Community-driven improvements welcome

---

**SmartMove** - Making moving simple, efficient, and stress-free.

Last Updated: February 2026
