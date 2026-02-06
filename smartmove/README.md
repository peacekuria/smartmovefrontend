# SmartMove Frontend

**SmartMove Frontend** is a scalable React application built with Vite and Tailwind CSS. It serves as the client-facing interface for managing moves, bookings, dashboards, and services for movers, clients, and admins.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Client Dashboard**: Manage bookings, view quotes, and track moves.
- **Admin Dashboard**: Monitor users, manage content, and oversee operations.
- **Mover Dashboard**: Track jobs, update statuses, and manage tasks.
- **Authentication**: Login and registration using secure forms.
- **Responsive UI**: Built with Tailwind CSS for mobile and desktop support.
- **Protected Routes**: Secure pages based on user roles.

---

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router
- **Version Control**: Git + GitHub

---

## Project Structure

smartmovefrontend/
├── smartmove/ # Main source folder
│ ├── src/
│ │ ├── components/ # Reusable React components
│ │ ├── context/ # Context API for auth & state
│ │ ├── pages/ # Page-level components (Login, Dashboard, etc.)
│ │ ├── style.css # Global CSS
│ │ └── main.jsx # Entry point
├── .gitignore # Git ignore rules
├── package.json # Project dependencies
├── tailwind.config.js # Tailwind configuration
└── vite.config.js # Vite configuration


---

## Installation

1. Clone your forked repository:

```bash
git clone https://github.com/YourUsername/smartmovefrontend.git
cd smartmovefrontend

