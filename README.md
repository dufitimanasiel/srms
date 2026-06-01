# Sales Record Management System (SRMS)

A full-stack web application for managing sales records built with React, Node.js, Express, and MySQL.

## Features

- **Customer Management**: Add and view customers
- **Product Management**: Add and view products
- **Sales Management**: Full CRUD operations (Create, Read, Update, Delete) for sales
- **Reports**: Daily, weekly, and monthly reports
- **User Authentication**: Login system with JWT
- **Responsive UI**: Built with Tailwind CSS

## ERD Diagram

The Entity Relationship Diagram is available in `ERD_Diagram.html`. Open this file in a web browser to view the diagram.

### Entities:
- **Customer**: customerNumber (PK), firstName, lastName, telephone, address
- **Product**: productCode (PK), productName, quantitySold, unitPrice
- **Sale**: invoiceNumber (PK), salesDate, paymentMethod, totalAmountPaid, customerNumber (FK), productCode (FK)

### Relationships:
- One Customer can have many Sales (1:N)
- One Product can have many Sales (1:N)

## Setup Instructions

### Prerequisites
- Node.js installed
- MySQL installed and running
- XAMPP or similar MySQL server (optional)

### 1. Database Setup

1. Open your MySQL client (phpMyAdmin, MySQL Workbench, etc.)
2. Import or run the SQL script from `backend-project/database.sql`
3. This will create:
   - Database: `SRMS`
   - Tables: `users`, `Customer`, `Product`, `Sale`
   - Default user: username `admin`, password `admin123`

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update `.env` file with your MySQL credentials:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=SRMS
   JWT_SECRET=your-secret-key-here-change-in-production
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

The backend will run on http://localhost:5000

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

The frontend will run on http://localhost:5173

## Usage

1. Open your browser and go to http://localhost:5173
2. Login with:
   - Username: `admin`
   - Password: `admin123`

3. Use the navigation menu to access different sections:
   - **Customers**: Add new customers and view customer list
   - **Products**: Add new products and view product list
   - **Sales**: Add, edit, delete, and view sales records
   - **Reports**: View daily, weekly, and monthly reports

## Project Structure

```
2sales record management system/
├── backend-project/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   ├── customers.js       # Customer routes
│   │   ├── products.js        # Product routes
│   │   ├── sales.js           # Sales routes (CRUD)
│   │   └── reports.js         # Reports routes
│   ├── .env                   # Environment variables
│   ├── database.sql           # Database schema
│   ├── package.json
│   └── server.js              # Main server file
├── frontend-project/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx      # Login component
│   │   │   ├── Navbar.jsx     # Navigation bar
│   │   │   ├── CustomerForm.jsx  # Customer management
│   │   │   ├── ProductForm.jsx   # Product management
│   │   │   ├── SalesForm.jsx     # Sales management (CRUD)
│   │   │   └── Reports.jsx       # Reports component
│   │   ├── App.jsx            # Main app with routing
│   │   ├── main.jsx           # React entry point
│   │   └── index.css          # Tailwind CSS
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
└── ERD_Diagram.html           # ERD diagram
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Customers
- `POST /api/customers` - Add customer
- `GET /api/customers` - Get all customers

### Products
- `POST /api/products` - Add product
- `GET /api/products` - Get all products

### Sales
- `POST /api/sales` - Add sale
- `GET /api/sales` - Get all sales
- `PUT /api/sales/:invoiceNumber` - Update sale
- `DELETE /api/sales/:invoiceNumber` - Delete sale

### Reports
- `GET /api/reports/daily` - Daily report
- `GET /api/reports/weekly` - Weekly report
- `GET /api/reports/monthly` - Monthly report

## Technologies Used

### Backend
- Node.js
- Express.js
- MySQL2
- JWT (jsonwebtoken)
- bcrypt
- CORS
- dotenv

### Frontend
- React 18
- React Router
- Axios
- Tailwind CSS
- Vite
