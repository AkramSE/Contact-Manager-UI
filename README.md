# 📱 Contact Manager - React Frontend Client

![React](https://img.shields.io/badge/React-18.x-61DAFB.svg?logo=react)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3.svg?logo=bootstrap)
![Axios](https://img.shields.io/badge/Axios-HTTP_Client-blue.svg)
![SweetAlert2](https://img.shields.io/badge/SweetAlert2-Popups-FF0000.svg)

A modern, responsive, and fully functional Single Page Application (SPA) built with **React**. This serves as the interactive client-side interface for the Contact Manager system, seamlessly communicating with the secure [Spring Boot REST API](https://github.com/AkramSE/Contact-Manager-API.git) to handle user data operations with enterprise-level UI/UX standards.

## 🎨 Live Demo / Screenshots

*(Replace the placeholder below with an actual screenshot of your beautiful paginated table and modals)*
> `![Dashboard UI](./screenshot.png)`

## ✨ Key Features

*   **🔐 Secure User Sessions:** Fully functional Login and Registration screens with JWT token management stored securely in local storage.
*   **📊 Paginated Data Tables:** Effortlessly display large datasets with server-side pagination, ensuring fast load times and a clean interface.
*   **🔍 Real-Time Search Filtering:** Instantly search and filter contact lists by name using dynamic state management and efficient API querying.
*   **🪟 Premium Modals for CRUD:** Create and Update operations are handled through beautiful, highly responsive, and centered overlay Modals, providing a seamless user experience without page reloads.
*   **⚡ Asynchronous API Calls:** Robust integration with secured backend endpoints using `Axios` interceptors and modern `async/await` syntax.
*   **📱 Responsive Design:** Mobile-first, sleek user interface powered by **Bootstrap 5**.
*   **🔔 Interactive Feedback:** Professional success alerts and confirmation dialogs for critical actions (like deleting a contact) integrated via **SweetAlert2**.

## 🛠️ Technical Stack

*   **Frontend Framework:** React.js
*   **Styling & UI:** Bootstrap 5 / Custom CSS
*   **HTTP Client:** Axios
*   **Alerts & Modals:** SweetAlert2
*   **State Management:** React Hooks (`useState`, `useEffect`)
*   **Development Environment:** Node.js & npm

## 📁 Architecture & Folder Structure

```text
src/
 ├── components/       
 │    ├── ContactList.js     # Main Dashboard with Pagination & Search
 │    ├── AddContact.js      # Modal Form for Creating Contacts
 │    ├── EditContact.js     # Modal Form for Updating Contacts
 │    ├── Login.js           # Authentication Entry
 │    ├── Register.js        # User Onboarding
 │    └── UserProfile.js     # Profile Management & Password Change
 ├── App.js            # Main Router & Layout Configuration
 ├── index.js          # React DOM Rendering
 └── App.css           # Global Custom Styles 

 🔗 Links & Let's Connect
⚙️ Backend API: Contact Manager API Repository
https://github.com/AkramSE/Contact-Manager-API.git

💼 LinkedIn:  Let's connect on LinkedIn!
 https://linkedin.com/in/muhammad-akram-se