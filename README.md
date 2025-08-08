# Driving License Tracker System

## Project Overview
The Driving License Tracker is a comprehensive system designed to manage traffic violations, license verifications, and fine payments between traffic officers, administrators, and citizens. This web-based application streamlines the process of reporting traffic violations, tracking fines, and managing payments between these different user roles.

## Table of Contents
1. [Technology Stack](#technology-stack)
2. [System Architecture](#system-architecture)
3. [Key Features](#key-features)
4. [User Roles and Functionalities](#user-roles-and-functionalities)
5. [Frontend Implementation](#frontend-implementation)
6. [Backend Implementation](#backend-implementation)
7. [Database Schema](#database-schema)
8. [Authentication and Security](#authentication-and-security)
9. [File Upload System](#file-upload-system)
10. [API Endpoints](#api-endpoints)
11. [Installation and Setup](#installation-and-setup)
12. [Future Enhancements](#future-enhancements)

## Technology Stack

### Frontend
- **React.js**: A JavaScript library for building user interfaces
- **React Router**: For navigation between different components/pages
- **React Bootstrap**: UI component library for responsive design
- **Axios**: HTTP client for making API requests
- **JWT Decode**: For decoding JWT tokens
- **CSS**: Custom styling for components

### Backend
- **Node.js**: JavaScript runtime for server-side development
- **Express.js**: Web application framework for Node.js
- **MySQL**: Relational database management system
- **JSON Web Tokens (JWT)**: For secure authentication
- **Bcrypt**: For password hashing
- **Multer**: For handling file uploads
- **Cors**: For enabling cross-origin resource sharing

## System Architecture

The Driving License Tracker follows a client-server architecture with a clear separation of concerns:

1. **Client-side (Frontend)**: 
   - Built with React.js for creating dynamic and responsive user interfaces
   - Organized into reusable components for maintainability
   - Uses React Router for navigation and state management for data handling
   - Makes HTTP requests to the backend API using Axios

2. **Server-side (Backend)**: 
   - Built with Node.js and Express.js
   - Provides RESTful API endpoints for the frontend to interact with
   - Handles business logic, data validation, and database operations
   - Implements authentication using JWT tokens

3. **Database**: 
   - MySQL database for storing user data, violations, payments, etc.
   - Structured with relationships between different entities

4. **File Storage**:
   - Uses Multer for handling file uploads (payment receipts)
   - Stores files on the server filesystem with secure naming

## Key Features

1. **Multi-role Authentication System**:
   - Different interfaces for citizens, officers, and administrators
   - Secure login and registration flows with JWT authentication

2. **Violation Management**:
   - Officers can record traffic violations with details
   - Auto-linking violations to registered users by license number
   - Comprehensive violation tracking system

3. **Payment Processing**:
   - Citizens can submit payments for violations
   - Receipt upload functionality
   - Payment verification by administrators

4. **Administrative Dashboard**:
   - User management (create, update, delete)
   - Officer management
   - Violation oversight
   - Payment verification

5. **Responsive Design**:
   - Mobile-friendly user interface for all user types
   - Consistent experience across devices

6. **Realtime Notifications**:
   - Status updates for payments and violations
   - System alerts for important actions

## User Roles and Functionalities

### 1. Citizens
- Register with driving license information
- View their violations and payment status
- Submit payments for pending violations
- Upload payment receipts
- Track payment verification status

### 2. Traffic Officers
- Record new violations
- Search citizens by driving license
- View violation history
- View registered users

### 3. Administrators
- Manage citizen accounts (create, view, update, delete)
- Manage officer accounts (create, view, update, delete)
- Verify payments submitted by citizens
- View system statistics and generate reports
- Oversee all violations and payments in the system

## Frontend Implementation

### Component Structure

```
frontend/src/
├── components/
│   ├── Auth/
│   │   ├── Login.js         # Authentication interface for all user types
│   │   └── Register.js      # Registration form for citizens
│   ├── Dashboard/
│   │   ├── AdminDashboard.js       # Admin interface with management tools
│   │   ├── CitizenDashboard.js     # Simplified dashboard (not actively used)
│   │   ├── OfficerDashboard.js     # Officer interface for violations
│   │   ├── OfficerDashboard_fixed.js # Updated officer interface
│   │   └── UserDashboard.js        # Citizen interface for violations & payments
│   ├── Landing/
│   │   └── LandingPage.js          # Initial landing page
│   └── Payment/
│       └── PaymentSubmission.js    # Payment form with receipt upload
├── utils/
│   ├── api.js              # API integration with Axios
│   ├── config.js           # Configuration settings
│   └── ProtectedRoute.js   # Route protection based on user role
└── styles/                 # CSS styles for components
```

### Key React Hooks Used

1. **useState**: For managing component-level state like form data, UI states, etc.
   ```javascript
   const [users, setUsers] = useState([]);
   const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
   ```

2. **useEffect**: For handling side effects like data fetching, subscriptions, etc.
   ```javascript
   useEffect(() => {
     const fetchData = async () => {
       // API calls to get data
     };
     fetchData();
   }, [dependencies]);
   ```

3. **useNavigate**: For programmatic navigation between routes
   ```javascript
   const navigate = useNavigate();
   // Later used to redirect
   navigate('/login');
   ```

4. **Custom Hooks**: For reusable logic across components
   ```javascript
   // Example of how auth logic might be organized
   const { user, isAuthenticated } = useAuth();
   ```

### State Management

The application uses React's built-in state management solutions:

1. **Component State**: Using useState for component-specific data
2. **Props Drilling**: Passing data between parent and child components
3. **Local Storage**: For persisting authentication tokens and user information

### Modal Implementation

The application uses React Bootstrap's Modal component for various dialogs:
- Confirmation dialogs (delete user/officer, confirm payment)
- Violation details view
- User profile view
- Payment details view

Example:
```javascript
<Modal show={showDeleteUserModal} onHide={() => setShowDeleteUserModal(false)} centered size="sm" className="confirm-modal">
    <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <p>Are you sure you want to delete this user?</p>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteUserModal(false)}>
            Cancel
        </Button>
        <Button variant="danger" onClick={confirmDeleteUser}>
            OK
        </Button>
    </Modal.Footer>
</Modal>
```

## Backend Implementation

### Route Structure

```
Backend/
├── routes/
│   ├── admin.js       # Admin-specific endpoints
│   ├── auth.js        # Authentication endpoints
│   ├── officers.js    # Officer management endpoints
│   ├── payments.js    # Payment processing endpoints
│   ├── users.js       # User management endpoints
│   └── violations.js  # Violation management endpoints
├── middleware/
│   └── auth.js        # JWT authentication middleware
└── database/
    ├── connection.js  # Database connection setup
    └── sql files      # Database schema and sample data
```

### Authentication Middleware

The `auth.js` middleware verifies JWT tokens and protects routes:

```javascript
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }
        
        req.user = user;
        next();
    });
};
```

### File Upload Implementation

The application uses Multer for handling file uploads, particularly for payment receipts:

```javascript
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/receipts/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'receipt-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        // Only allow certain file types
        const allowedTypes = /jpeg|jpg|png|pdf/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only JPEG, PNG, and PDF files are allowed'));
        }
    }
});
```

### Database Connection

The application connects to MySQL using a connection pool:

```javascript
const mysql = require('mysql2');
const config = require('../config/database.json');

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

module.exports = connection;
```

## Database Schema

The database consists of several interconnected tables:

1. **Users**: Stores citizen information
   - user_id (PK)
   - name
   - email
   - phone_number
   - driving_license_number
   - password (hashed)
   - date_of_birth
   - address

2. **Officers**: Stores traffic officer information
   - officer_id (PK)
   - officer_name
   - officer_email
   - officer_phone
   - password (hashed)
   - role (Police Officer, Admin)

3. **Violations**: Records traffic violations
   - violation_id (PK)
   - user_id (FK to Users, can be NULL for unregistered drivers)
   - officer_id (FK to Officers)
   - driving_license_number
   - violation_date
   - violation_type
   - violation_description
   - fine_amount
   - location
   - payment_status (Pending, Paid)
   - payment_submitted (Boolean)

4. **Payments**: Records payment submissions
   - payment_id (PK)
   - violation_id (FK to Violations)
   - payment_amount
   - payment_date
   - receipt_file (path to uploaded receipt)
   - status (Submitted, Confirmed)

## Authentication and Security

1. **Password Security**:
   - Passwords are hashed using bcrypt before storage
   - No plain-text passwords are stored or transmitted

2. **JWT Authentication**:
   - Login generates a signed JWT token
   - Token contains user ID, role, and expiration
   - Token is verified on protected routes

3. **Protected Routes**:
   - Backend: Express middleware checks for valid JWT
   - Frontend: React Router with ProtectedRoute component

4. **Input Validation**:
   - Server-side validation on all inputs
   - Client-side validation for immediate feedback

## File Upload System

The application handles file uploads through the following process:

1. **Frontend**: Uses FormData to submit files with payment information
   ```javascript
   const formData = new FormData();
   formData.append('receipt', paymentForm.receipt);
   formData.append('violation_id', violationId);
   formData.append('payment_amount', paymentForm.amount);
   ```

2. **Backend**: Processes uploads using Multer middleware
   - Validates file types (JPEG, PNG, PDF)
   - Limits file size (5MB)
   - Generates unique filenames
   - Stores files in uploads/receipts/ directory

3. **Storage**: Files are saved on the server filesystem with references in the database

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new citizen
- `POST /api/auth/login` - Login for citizens, officers, and admins

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get specific user
- `GET /api/users/:id/violations` - Get violations for a user

### Officers
- `GET /api/officers` - Get all officers (admin only)
- `POST /api/officers` - Create a new officer (admin only)
- `DELETE /api/officers/:id` - Delete an officer (admin only)

### Violations
- `GET /api/violations` - Get all/filtered violations
- `POST /api/violations` - Create a new violation (officer only)
- `PUT /api/violations/:id/status` - Update violation status (admin only)

### Payments
- `POST /api/payments` - Submit a new payment with receipt
- `GET /api/payments` - Get all payments (admin only)
- `GET /api/payments/violation/:id` - Get payments for a violation
- `PUT /api/admin/payments/:id/confirm` - Confirm a payment (admin only)

## Installation and Setup

### Prerequisites
- Node.js and npm
- MySQL

### Backend Setup
1. Clone the repository
2. Navigate to the Backend directory
3. Install dependencies:
   ```
   npm install
   ```
4. Configure database in `config/database.json`
5. Run the server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory
2. Install dependencies:
   ```
   npm install
   ```
3. Configure API base URL in `src/utils/config.js`
4. Run the development server:
   ```
   npm start
   ```

## Future Enhancements

1. **Real-time Notifications**: Using WebSockets for live updates
2. **Payment Gateway Integration**: Direct online payment options
3. **Advanced Analytics**: Violation trends and statistics dashboard
4. **Mobile Application**: Dedicated mobile apps for all user types
5. **Document Verification**: AI-based verification of uploaded receipts

---

This project was developed as a comprehensive system to streamline traffic violation management between citizens, traffic officers, and administrative personnel, with a focus on usability, security, and efficient workflow management.
