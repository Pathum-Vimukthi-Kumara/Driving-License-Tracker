import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Card } from 'react-bootstrap';
import '../../styles/officer-dashboard.css';

const OfficerDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="officer-dashboard">
            <Navbar expand="lg" className="officer-navbar">
                <Container>
                    <Navbar.Brand>
                        <i className="fas fa-user me-2"></i>
                        Citizen
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="officer-content">
                <Container>
                    {/* Welcome Section */}
                    <div className="officer-welcome">
                        <h2>Welcome back, pathum!</h2>
                        <p>Here's an overview of your driving license status and violations.</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="officer-stats">
                        <Card className="officer-stat-card">
                            <Card.Body>
                                <div className="officer-stat-number">7</div>
                                <div className="officer-stat-label">Total Violations</div>
                            </Card.Body>
                        </Card>
                        
                        <Card className="officer-stat-card">
                            <Card.Body>
                                <div className="officer-stat-number">1</div>
                                <div className="officer-stat-label">Pending Payments</div>
                            </Card.Body>
                        </Card>
                        
                        <Card className="officer-stat-card">
                            <Card.Body>
                                <div className="officer-stat-number">6</div>
                                <div className="officer-stat-label">Paid Violations</div>
                            </Card.Body>
                        </Card>
                    </div>

                    {/* Profile Card */}
                    <div className="profile-card">
                        <div className="profile-header">
                            <div className="profile-avatar">P</div>
                            <div className="profile-info">
                                <h3>pathum</h3>
                                <p>License: L001234568</p>
                            </div>
                        </div>
                        <div className="profile-details">
                            <div className="profile-detail">
                                <div className="profile-detail-label">Phone</div>
                                <div className="profile-detail-value">netadmin@admin.com</div>
                            </div>
                            <div className="profile-detail">
                                <div className="profile-detail-label">Date of Birth</div>
                                <div className="profile-detail-value">6/20/2025</div>
                            </div>
                            <div className="profile-detail">
                                <div className="profile-detail-label">Address</div>
                                <div className="profile-detail-value">Balpatiya, Galle District</div>
                            </div>
                        </div>
                    </div>

                    {/* Violations Table */}
                    <div className="violations-section">
                        <div className="violations-header">
                            <h4>Violation History</h4>
                        </div>
                        <div className="table-responsive">
                            <table className="violations-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Violation</th>
                                        <th>Description</th>
                                        <th>Fine amount</th>
                                        <th>Status</th>
                                        <th>Officer</th>
                                        <th>Payment</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Jun 20, 2025, 07:33 AM</td>
                                        <td>Illegal Parking</td>
                                        <td>Illegal Parking</td>
                                        <td>2000</td>
                                        <td><span className="status-badge paid">Paid</span></td>
                                        <td>Officer John Doe</td>
                                        <td>Paid 2000</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="action-btn view">View</button>
                                                <button className="action-btn edit">Edit</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Jun 25, 2025, 07:33 AM</td>
                                        <td>Illegal Turn</td>
                                        <td>Illegal Turn</td>
                                        <td>500</td>
                                        <td><span className="status-badge paid">Paid</span></td>
                                        <td>Officer John Doe</td>
                                        <td>Paid 500</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="action-btn view">View</button>
                                                <button className="action-btn edit">Edit</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Jun 30, 2025, 07:33 AM</td>
                                        <td>Illegal Turn</td>
                                        <td>Illegal Turn</td>
                                        <td>500</td>
                                        <td><span className="status-badge pending">Pending</span></td>
                                        <td>Officer John Doe</td>
                                        <td>Pending</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="action-btn view">View</button>
                                                <button className="action-btn edit">Edit</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default OfficerDashboard;
