CREATE DATABASE IF NOT EXISTS SRMS;
USE SRMS;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Customer (
    customerNumber VARCHAR(50) PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    telephone VARCHAR(20),
    address TEXT
);

CREATE TABLE IF NOT EXISTS Product (
    productCode VARCHAR(50) PRIMARY KEY,
    productName VARCHAR(255) NOT NULL,
    quantitySold INT DEFAULT 0,
    unitPrice DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS Sale (
    invoiceNumber VARCHAR(50) PRIMARY KEY,
    salesDate DATE NOT NULL,
    paymentMethod VARCHAR(50) NOT NULL,
    totalAmountPaid DECIMAL(10, 2) NOT NULL,
    customerNumber VARCHAR(50),
    productCode VARCHAR(50),
    FOREIGN KEY (customerNumber) REFERENCES Customer(customerNumber),
    FOREIGN KEY (productCode) REFERENCES Product(productCode)
);

INSERT INTO users (username, password) VALUES ('admin', '$2b$10$EixZaYb4Jv5n93X5d7q7Ze4Y8X9V6B5N4M3L2K1J0H9G8F7E6D5C4B');
