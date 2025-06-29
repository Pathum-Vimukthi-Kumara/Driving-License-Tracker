# Driving License Tracking System

A comprehensive web application for managing driving license violations, payments, and enforcement activities. Built with React.js frontend and Node.js backend.

## Features

### For Citizens (Users)
- **User Registration & Login**: Create account with driving license details
- **Violation Dashboard**: View all violations and their status
- **Payment Submission**: Upload payment receipts for violations
- **Profile Management**: Update personal information

### For Police Officers
- **Officer Portal**: Dedicated dashboard for law enforcement
- **License Search**: Find drivers by license number
- **Violation Filing**: Create new violation records
- **Violation Tracking**: Monitor filed violations and payment status

### For Administrators
- **System Overview**: Comprehensive dashboard with statistics
- **User Management**: Manage citizen accounts
- **Officer Management**: Create and manage officer accounts
- **Violation Oversight**: Review all violations system-wide
- **Payment Processing**: Monitor and verify payments

## Technology Stack

### Backend
- **Node.js** with Express.js
- **MySQL** database
- **JWT** authentication
- **Bcrypt** for password hashing
- **Multer** for file uploads
- **CORS** for cross-origin requests

### Frontend
- **React.js** with functional components
- **React Router** for navigation
- **Bootstrap** for responsive UI
- **Axios** for API calls
- **React Bootstrap** for components

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL database
- npm or yarn package manager

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```


3. Run the database schema (execute the SQL commands provided in the project description)

4. (Optional) Insert sample data:
```sql
-- Execute the contents of Backend/database/sample_data.sql
```

6. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/violations` - Get user violations

### Officers
- `GET /api/officers/profile` - Get officer profile
- `GET /api/officers/violations` - Get officer violations
- `GET /api/officers/search-user/:licenseNumber` - Search user by license

### Violations
- `POST /api/violations` - Create violation
- `GET /api/violations` - Get all violations
- `GET /api/violations/:id` - Get violation by ID
- `PUT /api/violations/:id/status` - Update violation status

### Payments
- `POST /api/payments` - Submit payment
- `GET /api/payments` - Get all payments
- `GET /api/payments/violation/:violationId` - Get payments by violation

### Admin
- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/officers` - Get all officers
- `POST /api/admin/officers` - Create officer
- `DELETE /api/admin/users/:id` - Delete user
- `DELETE /api/admin/officers/:id` - Delete officer

## Database Schema

### Users Table
- `user_id` (Primary Key)
- `name`, `email`, `phone_number`
- `driving_license_number` (Unique)
- `password`, `address`, `date_of_birth`
- `registration_date`

### Officers Table
- `officer_id` (Primary Key)
- `officer_name`, `officer_email`, `officer_phone`
- `password`, `role` (Police Officer/Admin)
- `registration_date`

### Violations Table
- `violation_id` (Primary Key)
- `user_id` (Foreign Key), `officer_id` (Foreign Key)
- `violation_type`, `violation_description`
- `violation_date`, `fine_amount`
- `payment_status` (Pending/Paid)

### Payments Table
- `payment_id` (Primary Key)
- `violation_id` (Foreign Key)
- `payment_amount`, `payment_date`
- `receipt_file`

### Admin Table
- `admin_id` (Primary Key)
- `admin_name`, `admin_email`
- `admin_password`, `registration_date`

## Sample Login Credentials

After running the sample data script:

### Admin
- Email: `admin@system.com`
- Password: `admin123`

### Officer
- Email: `john.smith@police.com`
- Password: `officer123`

### User
- Email: `john.citizen@email.com`
- Password: `user123`

## File Structure

```
driving-license-project/
├── Backend/
│   ├── database/
│   │   ├── connection.js
│   │   └── sample_data.sql
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── admin.js
│   │   ├── auth.js
│   │   ├── officers.js
│   │   ├── payments.js
│   │   ├── users.js
│   │   └── violations.js
│   ├── uploads/receipts/
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Dashboard/
│   │   │   └── Payment/
│   │   ├── styles/
│   │   │   ├── admin-dashboard.css
│   │   │   ├── auth.css
│   │   │   ├── officer-dashboard.css
│   │   │   └── user-dashboard.css
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── ProtectedRoute.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please create an issue in the repository.
