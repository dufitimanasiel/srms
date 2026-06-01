const express = require('express');
const pool = require('../config/db');
const router = express.Router();

router.get('/daily', async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        
        const [customers] = await pool.query('SELECT COUNT(*) as count FROM Customer');
        const [products] = await pool.query('SELECT COUNT(*) as count FROM Product');
        const [sales] = await pool.query('SELECT COUNT(*) as count, SUM(totalAmountPaid) as total FROM Sale WHERE salesDate = ?', [today]);
        const [saleDetails] = await pool.query(`
            SELECT s.*, c.firstName, c.lastName, p.productName 
            FROM Sale s 
            LEFT JOIN Customer c ON s.customerNumber = c.customerNumber 
            LEFT JOIN Product p ON s.productCode = p.productCode 
            WHERE s.salesDate = ?
        `, [today]);
        
        res.json({
            customers: customers[0].count,
            products: products[0].count,
            sales: sales[0].count,
            totalAmount: sales[0].total || 0,
            saleDetails
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/weekly', async (req, res) => {
    try {
        const today = new Date();
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const weekAgoStr = weekAgo.toISOString().split('T')[0];
        
        const [customers] = await pool.query('SELECT COUNT(*) as count FROM Customer');
        const [products] = await pool.query('SELECT COUNT(*) as count FROM Product');
        const [sales] = await pool.query('SELECT COUNT(*) as count, SUM(totalAmountPaid) as total FROM Sale WHERE salesDate >= ?', [weekAgoStr]);
        const [saleDetails] = await pool.query(`
            SELECT s.*, c.firstName, c.lastName, p.productName 
            FROM Sale s 
            LEFT JOIN Customer c ON s.customerNumber = c.customerNumber 
            LEFT JOIN Product p ON s.productCode = p.productCode 
            WHERE s.salesDate >= ?
        `, [weekAgoStr]);
        
        res.json({
            customers: customers[0].count,
            products: products[0].count,
            sales: sales[0].count,
            totalAmount: sales[0].total || 0,
            saleDetails
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/monthly', async (req, res) => {
    try {
        const today = new Date();
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthStartStr = monthStart.toISOString().split('T')[0];
        
        const [customers] = await pool.query('SELECT COUNT(*) as count FROM Customer');
        const [products] = await pool.query('SELECT COUNT(*) as count FROM Product');
        const [sales] = await pool.query('SELECT COUNT(*) as count, SUM(totalAmountPaid) as total FROM Sale WHERE salesDate >= ?', [monthStartStr]);
        const [saleDetails] = await pool.query(`
            SELECT s.*, c.firstName, c.lastName, p.productName 
            FROM Sale s 
            LEFT JOIN Customer c ON s.customerNumber = c.customerNumber 
            LEFT JOIN Product p ON s.productCode = p.productCode 
            WHERE s.salesDate >= ?
        `, [monthStartStr]);
        
        res.json({
            customers: customers[0].count,
            products: products[0].count,
            sales: sales[0].count,
            totalAmount: sales[0].total || 0,
            saleDetails
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
