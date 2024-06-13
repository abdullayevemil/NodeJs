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

function checkSearch(req, res, next) {
    if (req.query.search) {
        if (/^[a-zA-Z]+$/.test(req.query.search) || /^[\u0400-\u04FF]+$/.test(req.query.search)) {
            next();
        } else {
            res.send('Name can contain only letters');
        }
    } else {
        next();
    }
}

router.get('/', checkSearch, (req, res) => {
    let filteredEmployees = employees;

    if (req.query.department) {
        filteredEmployees = employees.filter(e => e.department == req.query.department);
    }

    if (req.query.search) {
        filteredEmployees = filteredEmployees.filter(e => e.name.toLowerCase().includes(req.query.search.toLowerCase()) || req.query.search.toLowerCase().includes(e.name.toLowerCase()));
    }

    res.json(filteredEmployees);
});

module.exports = router