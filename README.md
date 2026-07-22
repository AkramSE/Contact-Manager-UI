# 🎨 Contact Manager - Frontend (React Client)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

A modern, responsive, and fully functional Single Page Application (SPA) built with **React**. This serves as the client-side interface for the Contact Manager system, seamlessly communicating with the Spring Boot REST API to handle user data operations.

## 🚀 Live Demo / Screenshots
> **Note:** *(Aap yahan baad mein apne khoobsurat table aur form ki screenshot add kar sakte hain. Example: `![App UI](./screenshot.png)`)*

## ✨ Key Features
* **Full CRUD Engine:** Effortlessly Create, Read, Update, and Delete contacts in real-time without page reloads.
* **Asynchronous API Calls:** Robust integration with backend endpoints using `Axios` and modern `async/await` syntax.
* **State Management:** Efficient UI updates and state control using React Hooks (`useState`, `useEffect`).
* **Responsive Design:** Mobile-first, sleek user interface powered by **Bootstrap**.
* **Graceful Error Handling:** Console and UI-level error handling for failed API requests to ensure a smooth user experience.

## 🛠️ Technical Stack
* **Frontend Framework:** React.js
* **Styling:** Bootstrap 5 / Custom CSS
* **HTTP Client:** Axios
* **Development Environment:** Node.js & npm

## 📂 Architecture & Folder Structure
```text
src/
 ├── components/       # Reusable UI components (ContactList, AddContact, etc.)
 ├── App.js            # Main application component & routing layout
 ├── index.js          # React DOM rendering entry point
 └── App.css           # Global stylesheets