import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddContact from './components/AddContact'; // Form ko import kar rahe hain
import ContactList from './components/ContactList'; // Table ko import kar rahe hain

function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 fw-bold text-dark">My Contact Manager</h1>
      
      {/* 1. Yahan sirf ek baar Form dikhega */}
      <div className="mb-5">
        <AddContact /> 
      </div>
      
      {/* 2. Yahan sirf ek baar Table aur Search dikhega */}
      <div>
        <ContactList />
      </div>
    </div>
  );
}

export default App;