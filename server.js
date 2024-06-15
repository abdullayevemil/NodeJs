const express = require('express');

const bodyParser = require('body-parser');

const multimediaRoutes = require('./multimedia');

app = express();

app.use(express.static('public'));

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/multimedia', multimediaRoutes);

app.listen(8080);