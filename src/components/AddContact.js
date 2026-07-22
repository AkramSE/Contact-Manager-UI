import React, { useState } from 'react';
import axios from 'axios';

const AddContact = () => {
    const [contact, setContact] = useState({
        firstName: "",
        lastName: "", 
        title: "Mr",
        emails: [{ emailAddress: "" }],      
        phones: [{ phoneNumber: "", label: "Mobile" }] 
    });

    const handleFirstNameChange = (e) => {
        setContact({ ...contact, firstName: e.target.value });
    };

    const handleEmailChange = (e) => {
    setContact({ ...contact, emails: [{ emailAddress: e.target.value }] });
};

    const handlePhoneChange = (e) => {
        setContact({ ...contact, phones: [{ phoneNumber: e.target.value, label: "Mobile" }] });
    };

    const saveContact = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/users/8/contacts", contact);
            alert("Contact successfully save ho gaya!");
            window.location.reload();
        } catch (error) {
            console.error("Data save karne mein masla aaya:", error);
            alert("Error! Backend check karein.");
        }
    };

    return (
        <div className="container mt-4 mb-4">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h4 className="mb-0">Add New Contact</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={saveContact}>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <input type="text" className="form-control" 
                                       placeholder="Enter Name" required 
                                       value={contact.firstName} onChange={handleFirstNameChange} />
                            </div>
                           <div className="col-md-4 mb-3">
                              <input type="email" className="form-control" 
                               placeholder="Enter Email" required 
                                value={contact.emails[0].emailAddress} onChange={handleEmailChange} />
                             </div>
                            <div className="col-md-3 mb-3">
                                <input type="text" className="form-control" 
                                       placeholder="Enter Phone" required 
                                       value={contact.phones[0].phoneNumber} onChange={handlePhoneChange} />
                            </div>
                            <div className="col-md-1 mb-3">
                                <button type="submit" className="btn btn-success w-100">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddContact;