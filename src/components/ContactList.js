import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditContact from './EditContact';
import Swal from 'sweetalert2';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [editingContact, setEditingContact] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    // Triggers a data refresh when page, size, or search state changes. 
    useEffect(() => {
        loadContacts(currentPage, pageSize, searchTerm);
    }, [currentPage, pageSize, searchTerm]);

    const loadContacts = async (page = 0, size = 5, keyword = "") => {
        try {
            const currentToken = localStorage.getItem("jwtToken");
            const currentUserId = localStorage.getItem("userId");

            let url = `http://localhost:8080/users/${currentUserId}/contacts?page=${page}&size=${size}`;
            if (keyword) {
                url += `&keyword=${keyword}`;
            }

            const result = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${currentToken}`
                }
            });

            setContacts(result.data.content);
            setTotalPages(result.data.totalPages);
        } catch (error) {
            console.error("Failed to fetch data from the backend: ", error);
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
                const token = localStorage.getItem("jwtToken");
                const userId = localStorage.getItem("userId");
                await axios.delete(`http://localhost:8080/users/${userId}/contacts/${contactId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                // Refreshes the current page data after a successful deletion. 
                loadContacts(currentPage, pageSize, searchTerm);

                Swal.fire('Deleted!', 'Your contact has been deleted.', 'success');
            } catch (error) {
                console.error("Error occurred during deletion:", error);
                Swal.fire('Error!', 'Something went wrong.', 'error');
            }
        }
    };

    const startEdit = (contact) => {
        setEditingContact(contact);
    };

    const handleUpdateSuccess = () => {
        setEditingContact(null);
        loadContacts(currentPage, pageSize, searchTerm);
    };

    const handleCancel = () => {
        setEditingContact(null);
    };

    return (
        <div className="container mt-5">

            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 p-4 bg-white shadow-sm rounded-4 border">
                <h3 className="text-primary fw-bold mb-3 mb-md-0" style={{ letterSpacing: '0.5px' }}>
                    All Contacts
                </h3>

                <div className="input-group" style={{ maxWidth: '400px', width: '100%' }}>
                    <span className="input-group-text bg-light border-end-0 text-muted px-3" style={{ borderTopLeftRadius: '50rem', borderBottomLeftRadius: '50rem' }}>
                        🔍
                    </span>
                    <input
                        type="text"
                        className="form-control border-start-0 bg-light shadow-none py-2"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(0); 
                        }}
                        style={{ borderTopRightRadius: '50rem', borderBottomRightRadius: '50rem', borderLeft: 'none' }}
                    />
                </div>
            </div>

            <div className="card shadow-lg border-0 rounded-4 overflow-hidden mb-5">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light text-secondary text-uppercase" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                                <tr>
                                    <th className="px-4 py-3 fw-semibold">Title</th>
                                    <th className="py-3 fw-semibold">First Name</th>
                                    <th className="py-3 fw-semibold">Last Name</th>
                                    <th className="py-3 fw-semibold">Email</th>
                                    <th className="py-3 fw-semibold">Phone</th>
                                    <th className="py-3 fw-semibold text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(contacts) && contacts.map((contact) => (
                                    <tr key={contact.id}>
                                        <td className="px-4 fw-medium text-dark">{contact.title}</td>
                                        <td>{contact.firstName}</td>
                                        <td>{contact.lastName || '-'}</td>
                                        <td className="text-muted">{contact.emails && contact.emails.length > 0 ? contact.emails[0].emailAddress : 'N/A'}</td>
                                        <td className="text-muted">{contact.phones && contact.phones.length > 0 ? contact.phones[0].phoneNumber : 'N/A'}</td>
                                        <td className="text-center">
                                            <button
                                                className="btn btn-sm btn-info me-2 text-white shadow-sm rounded-pill px-3"
                                                onClick={() => startEdit(contact)}>
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger shadow-sm rounded-pill px-3"
                                                onClick={() => deleteContact(contact.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {contacts.length === 0 && (
                            <div className="text-center p-5 text-muted">
                                <h6 className="mb-0">No contacts found...</h6>
                            </div>
                        )}
                    </div>
                </div>

                <div className="card-footer bg-white border-top-0 p-4">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <button
                            className="btn btn-outline-primary rounded-pill px-4"
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 0}
                        >
                            Previous
                        </button>

                        <div className="d-flex align-items-center gap-4">
                            <span className="fw-semibold text-muted small">
                                Page {currentPage + 1} of {totalPages === 0 ? 1 : totalPages}
                            </span>

                            <div className="d-flex align-items-center bg-light px-3 py-1 rounded-pill border">
                                <label className="me-2 mb-0 small fw-bold text-secondary">Rows:</label>
                                <select
                                    className="form-select form-select-sm border-0 bg-transparent shadow-none p-0 text-primary fw-bold"
                                    value={pageSize}
                                    onChange={(e) => {
                                        setPageSize(Number(e.target.value));
                                        setCurrentPage(0);
                                    }}
                                    style={{ cursor: 'pointer', width: '40px' }}
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                </select>
                            </div>
                        </div>

                        <button
                            className="btn btn-outline-primary rounded-pill px-4"
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage >= totalPages - 1 || totalPages === 0}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Rendered last to ensure the modal appears on top. */} 
            {editingContact && (
                <EditContact
                    contactToEdit={editingContact}
                    onUpdateSuccess={handleUpdateSuccess}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default ContactList;