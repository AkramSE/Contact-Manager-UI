import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; 

const AddContact = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState(''); 
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSave = async (e) => {
        e.preventDefault(); 
        const phoneRegex = /^03\d{9}$/;
        if (!phoneRegex.test(phone)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Phone Number',
                text: 'Please enter a valid 11-digit Pakistani phone number starting with "03" (e.g., 03001234567).',
            });
            return; 
        }
        const newContact = {
            firstName: firstName,
            lastName: lastName,
            emails: [{ emailAddress: email }],
            phones: [{ phoneNumber: phone }]
        };

        try {
            await axios.post("http://localhost:8080/users/17/contacts", newContact);
            
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhone('');
            
            await Swal.fire({
                icon: 'success',
                title: 'Saved Successfully!',
                text: 'Your new contact has been successfully added to the list.',
                timer: 2000, 
                showConfirmButton: false
            });

            window.location.reload(); 
        } catch (error) {
            console.error("Save karne mein error aaya:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Could not connect to the backend server. Please try again later.'
            });
        }
    };

    return (
        <div className="card shadow mb-4 border-0">
            <div className="card-header bg-primary text-white text-center font-weight-bold">
                <h5 className="mb-0">Add New Contact</h5>
            </div>
            <div className="card-body bg-light">
                <form onSubmit={handleSave} className="row g-2 align-items-center">
                    <div className="col-md-3">
                        <input type="text" className="form-control" placeholder="First Name" 
                            value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="col-md-2">
                        <input type="text" className="form-control" placeholder="Last Name" 
                            value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="col-md-3">
                        <input type="email" className="form-control" placeholder="Enter Email" 
                            value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="col-md-3">
                        <input type="text" className="form-control" placeholder="Enter Phone" 
                            value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div className="col-md-1">
                        <button type="submit" className="btn btn-success w-100 fw-bold shadow-sm">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddContact;