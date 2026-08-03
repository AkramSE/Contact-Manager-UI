# 💻 Contact Manager - Enterprise React Frontend

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3?style=for-the-badge&logo=bootstrap)
![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5A29E4?style=for-the-badge)
![Deployment](https://img.shields.io/badge/Deployed_On-Vercel-black?style=for-the-badge&logo=vercel)
![Security](https://img.shields.io/badge/Security-JWT-blue?style=for-the-badge&logo=jsonwebtokens)
![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)

A production-ready, enterprise-grade frontend application engineered with **React** and **Bootstrap 5**. Designed with a focus on clean architecture, seamless user experience (UX), and modern frontend development practices. 

This application serves as the user interface for the [Contact Manager Spring Boot API](https://github.com/AkramSE/Contact-Manager-API) and provides secure authentication, responsive glassmorphism design, and highly optimized REST API communication.

---

## 🚀 Live Demo & Integration

The frontend is fully deployed and seamlessly integrated with our cloud-hosted backend:

- **🌐 Live Application:** [Secure Contact Manager (Vercel)](https://contact-manager-ui-alpha.vercel.app)
- **☁️ Frontend Hosting:** Deployed on **Vercel** for global edge-network delivery and continuous integration.
- **⚙️ Backend API:** Connected to the **Railway** production Spring Boot API.

---

## ✨ Enterprise Features

- 🔐 **Identity & Security:** Complete JWT Authentication flow (Login/Register) with Protected Routes and secure token storage.
- 📇 **Resource Management:** Full Contact CRUD Operations with a clean, interactive dashboard.
- 🔍 **Data Optimization:** Real-time Search and robust Pagination support.
- 📊 **Bulk Operations:** Seamless CSV Export and Import functionalities with file validation.
- 🎨 **Modern UX/UI:** Bootstrap 5 styling featuring a custom Glassmorphism UI, SweetAlert2 notifications, and full mobile responsiveness.
- 🔄 **Advanced Networking:** Centralized Axios Interceptors for automated token injection and global error handling.

---

## 🛠 Technology Stack

| Category | Technology |
|-----------|------------|
| **Core Framework** | React 18 |
| **Styling & UI** | Bootstrap 5, Glassmorphism CSS |
| **Routing** | React Router DOM v6 |
| **Network & HTTP** | Axios (with Interceptors) |
| **State Management**| React Hooks & Context API |
| **Notifications** | SweetAlert2 |
| **Icons** | React Icons |
| **Deployment** | Vercel |

---

## 📂 Architecture & Structure

```text
src/
│
├── assets/         # Static files, images, and global styles
├── components/     # Reusable UI components (Navbar, ContactCard, etc.)
├── context/        # Global state management for authentication
├── hooks/          # Custom React Hooks
├── pages/          # Main application views (Dashboard, Login, Register)
├── routes/         # Protected route wrappers and navigation logic
├── services/       # Centralized API calls and Axios configurations
├── utils/          # Helper functions and constants
├── App.js          # Root component and route definitions
└── index.js        # Application entry point


⚙️ Local Development Setup
To run this frontend application locally and connect it to your local or live backend API:
1. Clone the Repository 
git clone [https://github.com/AkramSE/Contact-Manager-UI.git](https://github.com/AkramSE/Contact-Manager-UI.git)
cd Contact-Manager-UI
 

2. Environment Configuration
Create a .env file in the root directory to define your backend API URL: 
# For local Spring Boot backend:
REACT_APP_API_BASE_URL=http://localhost:8080

# Or connect directly to the live production API:
# REACT_APP_API_BASE_URL=[https://contact-manager-api-production-0aa6.up.railway.app](https://contact-manager-api-production-0aa6.up.railway.app)
 
3. Install Dependencies & Run 
npm install
npm start
 

The application will launch in development mode at http://localhost:3000.
🔄 API Communication Strategy
The application uses a centralized API service with Axios interceptors to automatically handle security: 
// Every outgoing request automatically attaches the JWT
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


And ha isko project ko mene live Kiya hai in clouds ka use kar ke Frontend: Vercel par live hai Backend: Railway par live hai Database (MySQL): Aiven par live hai Vercel link: ye hai https://contact-manager-ui-alpha.vercel.app/contacts 

Railway link: ye hai https://contact-manager-api-production-0aa6.up.railway.app Ab isko best of best and enterprise professional readme genarte kar ke do ek hi single file Mai Mai only copy paste karo
