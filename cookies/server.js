const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const { redirect } = require('next/dist/server/api-utils');
const saltRounds = 10;

app.use(express.static('public'));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = [];

app.post('/register', (req, res) => {
    if(!req.body) {
        res.status(400).send('invalid data');

        return;
    }

    let user = req.body;

    const hash = bcrypt.hashSync(req.body.password, saltRounds);

    user.password = hash;

    user.id = users.length + 1;

    users.push(user);

    res.status(201).redirect('/');
});

app.post('/login', (req, res) => {
    if(!req.body) {
        res.status(400).send('invalid data');

        return;
    }

    let user = req.body;

    let originalUser = users.find(u => u.username == user.username);

    if(!originalUser) {
        res.status(400).send('invalid username or password');

        return;
    }

    const loginSuccess = bcrypt.compareSync(user.password, originalUser.password);

    if(!loginSuccess) {
        res.status(400).send('invalid username or password');

        return;
    }

    res.cookie('user', originalUser, { maxAge: 900000, httpOnly: true });

    res.status(200).redirect('/');
});

app.post('/logout', (req, res) => {
    res.clearCookie('user');

    res.status(200).send('success');
});

app.get('/cookie', (req, res) => {
    const cookie = req.cookies['user'];

    res.send(cookie);
});

app.delete('/delete', (req, res) => {
    const cookie = req.cookies['user'];

    const index = users.findIndex(u => u.username == cookie.username);

    users.splice(index, 1);

    res.clearCookie('user');

    res.status(200).send('success')
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
