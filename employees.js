const express = require('express');

const router = express.Router();

router.get('/employees', (req, res) => {
    const filteredEmployees = employees.filter(e => e.department == req.query.department);

    const searchedEmployees = filteredEmployees.filter(e => e.name.toLowerCase().includes(req.query.search.toLowerCase()) || req.query.search.toLowerCase().includes(e.name.toLowerCase()));

    res.json(searchedEmployees);
});

module.exports = router