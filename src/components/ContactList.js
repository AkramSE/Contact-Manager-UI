import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditContact from './EditContact'; 
import Swal from 'sweetalert2';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [editingContact, setEditingContact] = useState(null); 
    const [searchTerm, setSearchTerm] = useState(''); 
    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = async () => {
        try {
            const result = await axios.get("http://localhost:8080/users/17/contacts");
            setContacts(result.data);
        } catch (error) {
            console.error("Backend se data nahi laya ja saka: ", error);
        }
    };

  const deleteContact = async (contactId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:8080/users/17/contacts/${contactId}`);
                setContacts(contacts.filter(contact => contact.id !== contactId)); 
                
                Swal.fire(
                    'Deleted!',
                    'Your contact has been deleted.',
                    'success'
                )
            } catch (error) {
                console.error("Delete karne mein error aaya:", error);
                Swal.fire('Error!', 'Something went wrong.', 'error');
            }
        }
    };
    const startEdit = (contact) => {
        setEditingContact(contact);
    };

    const handleUpdateSuccess = () => {
        setEditingContact(null);
        loadContacts();
    };

    const handleCancel = () => {
        setEditingContact(null);
    }; 
    const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
});
    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
    <h2 className="text-primary mb-0">All Contacts</h2>
    <input 
        type="text" 
        className="form-control w-25" 
        placeholder="Search by name..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
    />
</div>

            {editingContact && (
                <EditContact 
                    contactToEdit={editingContact} 
                    onUpdateSuccess={handleUpdateSuccess} 
                    onCancel={handleCancel} 
                />
            )}

            <div className="card shadow mt-3">
                <div className="card-body">
                    <table className="table table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(filteredContacts) && filteredContacts.map((contact, index) => (
                                <tr key={contact.id}>
                                    <td>{contact.firstName}</td>
                                    <td>{contact.lastName || '-'}</td>
                                    <td>{contact.emails && contact.emails.length > 0 ? contact.emails[0].emailAddress : 'N/A'}</td>
                                    <td>{contact.phones && contact.phones.length > 0 ? contact.phones[0].phoneNumber : 'N/A'}</td>
                                    <td>
                                        <button 
                                            className="btn btn-sm btn-info me-2 text-white" 
                                            onClick={() => startEdit(contact)}>
                                            Edit
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-danger" 
                                            onClick={() => deleteContact(contact.id)}>
                                            Delete
                                        </button>
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