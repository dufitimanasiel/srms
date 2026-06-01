const express = require('express');
const pool = require('../config/db');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { customerNumber, firstName, lastName, telephone, address } = req.body;
        
        await pool.query(
            'INSERT INTO Customer (customerNumber, firstName, lastName, telephone, address) VALUES (?, ?, ?, ?, ?)',
            [customerNumber, firstName, lastName, telephone, address]
        );
        
        res.status(201).json({ message: 'Customer added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const [customers] = await pool.query('SELECT * FROM Customer');
        res.json(customers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:customerNumber', async (req, res) => {
    try {
        const { customerNumber } = req.params;
        const { firstName, lastName, telephone, address } = req.body;
        
        await pool.query(
            'UPDATE Customer SET firstName = ?, lastName = ?, telephone = ?, address = ? WHERE customerNumber = ?',
            [firstName, lastName, telephone, address, customerNumber]
        );
        
        res.json({ message: 'Customer updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:customerNumber', async (req, res) => {
    try {
        const { customerNumber } = req.params;
        
        await pool.query('DELETE FROM Customer WHERE customerNumber = ?', [customerNumber]);
        
        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
