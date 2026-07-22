import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditContact = ({ contactToEdit, onUpdateSuccess, onCancel }) => {
    // 1. State variables banayein, jin mein purana data pehle se set ho
    const [firstName, setFirstName] = useState(contactToEdit.firstName || '');
    const [lastName, setLastName] = useState(contactToEdit.lastName || '');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    // Jab component load ho, to pehla email aur phone set karein
    useEffect(() => {
        if (contactToEdit.emails && contactToEdit.emails.length > 0) {
            setEmail(contactToEdit.emails[0].emailAddress);
        }
        if (contactToEdit.phones && contactToEdit.phones.length > 0) {
            setPhone(contactToEdit.phones[0].phoneNumber);
        }
    }, [contactToEdit]);

    // 2. Data update karne ka function (Backend ko PUT request)
    const handleUpdate = async (e) => {
        e.preventDefault();

        // Backend ke mutabiq object banayein
        const updatedContact = {
            firstName: firstName,
            lastName: lastName,
            emails: [{ emailAddress: email }],
            phones: [{ phoneNumber: phone }]
        };

        try {
            // Yahan hum PUT request bhej rahe hain
            await axios.put(`http://localhost:8080/users/8/contacts/${contactToEdit.id}`, updatedContact);
            
            // Jab update ho jaye, toh main list ko refresh karne ka function call karein
            onUpdateSuccess();
        } catch (error) {
            console.error("Update karne mein error aaya:", error);
        }
    };

    return (
        <div className="card mt-3 shadow-sm border-primary">
            <div className="card-header bg-primary text-white">
                Edit Contact
            </div>
            <div className="card-body">
                <form onSubmit={handleUpdate}>
                    <div className="row mb-3">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="First Name" 
                                value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Last Name" 
                                value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder="Email Address" 
                            value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Phone Number" 
                            value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    
                    <button type="submit" className="btn btn-success me-2">Save Changes</button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditContact;