const express = require('express');
const pool = require('../config/db');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { productCode, productName, quantitySold, unitPrice } = req.body;
        
        await pool.query(
            'INSERT INTO Product (productCode, productName, quantitySold, unitPrice) VALUES (?, ?, ?, ?)',
            [productCode, productName, quantitySold || 0, unitPrice]
        );
        
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const [products] = await pool.query('SELECT * FROM Product');
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:productCode', async (req, res) => {
    try {
        const { productCode } = req.params;
        const { productName, quantitySold, unitPrice } = req.body;
        
        await pool.query(
            'UPDATE Product SET productName = ?, quantitySold = ?, unitPrice = ? WHERE productCode = ?',
            [productName, quantitySold, unitPrice, productCode]
        );
        
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/:productCode', async (req, res) => {
    try {
        const { productCode } = req.params;
        
        await pool.query('DELETE FROM Product WHERE productCode = ?', [productCode]);
        
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
