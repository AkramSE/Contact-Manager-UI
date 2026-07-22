import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactList = () => {
    // 1. Data store karne ke liye ek state banayi
    const [contacts, setContacts] = useState([]);

    // 2. Jaise hi page load ho, data fetch karo
    useEffect(() => {
        loadContacts();
    }, []);

    // 3. Spring Boot se data mangwane ka function
    const loadContacts = async () => {
        try {
            // Yahan hum apne Spring Boot API ko aawaz de rahe hain
            const result = await axios.get("http://localhost:8080/users/8/contacts");
            setContacts(result.data); // Jo data aaya, usay save kar liya
       } catch (error) {
          console.error("Backend se data nahi laya ja saka: ", error);
         }
       }; 

        const deleteContact = async (contactId) => {
        try {
           await axios.delete(`http://localhost:8080/users/8/contacts/${contactId}`);
           window.location.reload(); // Delete hone ke baad page refresh ho jayega
           } catch (error) {
             console.error("Delete karne mein error aaya:", error);
        }
}; 

    return (
        <div className="container mt-4">
            <h2 className="text-primary mb-4">All Contacts</h2>
            <div className="card shadow">
                <div className="card-body">
                    <table className="table table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 4. Real data ko table mein loop lagakar dikhana */}
                            {Array.isArray(contacts) && contacts.map((contact, index) => (
                                <tr key={index}>
                                    <td>{contact.firstName} {contact.lastName}</td>
                                    <td>{contact.emails && contact.emails.length > 0 ? contact.emails[0].emailAddress : "No Email"}</td>
                                    <td>{contact.phones && contact.phones.length > 0 ? contact.phones[0].phoneNumber : "No Phone"}</td>
                                    <td>
                                        <button onClick={() => deleteContact(contact.id)} className="btn btn-sm btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ContactList;