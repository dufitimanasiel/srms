const express = require('express');
const pool = require('../config/db');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { invoiceNumber, salesDate, paymentMethod, totalAmountPaid, customerNumber, productCode } = req.body;
        
        await pool.query(
            'INSERT INTO Sale (invoiceNumber, salesDate, paymentMethod, totalAmountPaid, customerNumber, productCode) VALUES (?, ?, ?, ?, ?, ?)',
            [invoiceNumber, salesDate, paymentMethod, totalAmountPaid, customerNumber, productCode]
        );
        
        res.status(201).json({ message: 'Sale added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const [sales] = await pool.query(`
            SELECT s.*, c.firstName, c.lastName, p.productName 
            FROM Sale s 
            LEFT JOIN Customer c ON s.customerNumber = c.customerNumber 
            LEFT JOIN Product p ON s.productCode = p.productCode
        `);
        res.json(sales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:invoiceNumber', async (req, res) => {
    try {
        const { invoiceNumber } = req.params;
        const { salesDate, paymentMethod, totalAmountPaid, customerNumber, productCode } = req.body;
        
        await pool.query(
            'UPDATE Sale SET salesDate = ?, paymentMethod = ?, totalAmountPaid = ?, customerNumber = ?, productCode = ? WHERE invoiceNumber = ?',
            [salesDate, paymentMethod, totalAmountPaid, customerNumber, productCode, invoiceNumber]
        );
        
        res.json({ message: 'Sale updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:invoiceNumber', async (req, res) => {
    try {
        const { invoiceNumber } = req.params;
        
        await pool.query('DELETE FROM Sale WHERE invoiceNumber = ?', [invoiceNumber]);
        
        res.json({ message: 'Sale deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
