const express = require('express');

const fs = require('fs');

const router = express.Router();

let employees = [];

fs.readFile('employees.json', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        employees = JSON.parse(data);
    }
})

router.get('/', (req, res) => {
    const categories = [...new Set(Object.values(employees).flatMap(e => e.department))]

    res.json(categories);
});

module.exports = router