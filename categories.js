const express = require('express');

const router = express.Router();

router.get('/categories', (req, res) => {
    const categories = [...new Set(Object.values(employees).flatMap(e => e.department))]

    res.json(categories);
});

module.exports = router