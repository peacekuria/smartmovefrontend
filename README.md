# SmartMove Frontend 

SmartMove is a web-based platform designed to improve urban mobility by helping users plan, track, and manage their transportation more efficiently. This repository contains the **frontend** of the SmartMove application, built using modern web technologies for speed, scalability, and a smooth user experience.

---

##  Project Overview

The SmartMove frontend provides the user interface for:
- Browsing and interacting with transport-related features
- Viewing routes and movement-related data
- Authenticating users and managing sessions
- Displaying dynamic data from the backend API

The application is built as a **Single Page Application (SPA)** using **Vite** for fast development and optimized production builds.

---

## Tech Stack

- **Vite** – Fast development server and build tool
- **React** – Component-based UI development
- **JavaScript (ES6+)**
- **HTML5 & CSS3**
- **Git & GitHub** – Version control and collaboration

---

## Project Structure

```text
smartmove-frontend/
│
├── public/
│   └── index.html          # Base HTML file
│
├── src/
│   ├── assets/             # Images, icons, static files
│   │
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/              # Application pages (routes)
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   └── NotFound.jsx
│   │
│   ├── services/           # API calls and external services
│   │   └── api.js
│   │
│   ├── context/            # Global state management
│   │   └── AuthContext.jsx
│   │
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
│
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
 
## project installation
Clone the repository:

git clone https://github.com/your-org/smartmovefrontend.git
Navigate into the project folder:

cd smartmove-frontend
Install dependencies:

npm install


## Start the development server:

npm run dev


## Open your browser and visit:

http://localhost:5173
