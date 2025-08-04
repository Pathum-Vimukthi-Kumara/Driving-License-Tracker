import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Navbar, Nav } from 'react-bootstrap';
import '../../styles/landing-page.css';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };

    const handleRoleSelect = (role) => {
        navigate('/login', { state: { role } });
    };

    return (
        <div className="landing-page">
            {/* Navigation */}
            <Navbar expand="lg" className="navbar">
                <Container>
                    <Navbar.Brand href="#home">
                        <i className="fas fa-car"></i> Driving License Tracker
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
    
                            <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>
                            <Nav.Link onClick={() => navigate('/register')}>Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Hero Section */}
            <section className="hero-section">
                <Container>
                    <div className="hero-content">
                        <h1 className="hero-title">
                            <i className="fas fa-car hero-icon"></i>
                            Driving License Tracker
                        </h1>
                        <p className="hero-subtitle">
                            Comprehensive license management for citizens and law enforcement
                        </p>
                        <Button 
                            className="cta-button"
                            size="lg"
                            onClick={handleGetStarted}
                        >
                            Get started
                        </Button>
                    </div>
                </Container>
            </section>

            {/* Features Section */}
            <section className="features-section" id="features">
                <Container>
                    
                    
                    <Row className="justify-content-center">
                        {/* Citizens Card */}
                        <Col lg={4} md={6} className="mb-4">
                            <Card 
                                className="feature-card h-100 citizen-card"
                                onClick={() => handleRoleSelect('citizen')}
                            >
                                <Card.Body className="text-center">
                                    <div className="feature-icon">
                                        <i className="fas fa-user"></i>
                                    </div>
                                    <Card.Title className="feature-title">
                                        For Citizens
                                    </Card.Title>
                                    <Card.Text className="feature-description">
                                        View your driving license information, check violation status, pay fines online, and track your payment history.
                                    </Card.Text>
                                    <ul className="feature-list">
                                        <li>View license details</li>
                                        <li>Check violations</li>
                                        <li>Pay fines online</li>
                                        <li>Payment history</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Police Officers Card */}
                        <Col lg={4} md={6} className="mb-4">
                            <Card 
                                className="feature-card h-100 officer-card"
                                onClick={() => handleRoleSelect('officer')}
                            >
                                <Card.Body className="text-center">
                                    <div className="feature-icon">
                                        <i className="fas fa-shield-alt"></i>
                                    </div>
                                    <Card.Title className="feature-title">
                                        For Police Officers
                                    </Card.Title>
                                    <Card.Text className="feature-description">
                                        Search license holders, record traffic violations, track violation history, and monitor payment status.
                                    </Card.Text>
                                    <ul className="feature-list">
                                        <li>Search licenses</li>
                                        <li>Record violations</li>
                                        <li>Track history</li>
                                        <li>Monitor payments</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Security Card */}
                        <Col lg={4} md={6} className="mb-4">
                            <Card className="feature-card h-100 security-card">
                                <Card.Body className="text-center">
                                    <div className="feature-icon">
                                        <i className="fas fa-lock"></i>
                                    </div>
                                    <Card.Title className="feature-title">
                                        Secure & Reliable
                                    </Card.Title>
                                    <Card.Text className="feature-description">
                                        Built with modern security practices, encrypted data transmission, and reliable cloud infrastructure.
                                    </Card.Text>
                                    <ul className="feature-list">
                                        <li>Secure authentication</li>
                                        <li>Encrypted data</li>
                                        <li>Cloud infrastructure</li>
                                        <li>Real-time updates</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <Container>
                    <Row>
                        <Col className="text-center">
                            <p className="footer-text">
                                © 2025 Driving License Tracker. Built for efficient license management.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
};

export default LandingPage;
