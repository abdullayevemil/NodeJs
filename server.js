const express = require('express');

const cors = require('cors');

const employeesRoutes = require('./employees');

const cattegoriesRoutes = require('./departments');

const app = express();

app.use(cors());

app.use('/employees', employeesRoutes);

app.use('/departments', cattegoriesRoutes);

app.listen(8080)
