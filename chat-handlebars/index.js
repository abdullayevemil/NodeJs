const cors = require('cors');
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'emil',
    host: 'localhost',
    database: 'postgres',
    password: 'Secret123!',
    port: 5432,
});

Handlebars.registerHelper('equals', function (a, b) {
    return a == b;
});

const bodyParser = require('body-parser');

let app = express();

let HOST = 3000;

app.engine('handlebars', exphbs.engine());

app.set('view engine', 'handlebars');

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

app.get('/', async (req, res) => {
    const { rows } = await pool.query('SELECT name FROM chats');

    let chats = rows.map(row => row.name);

    res.render('index', { title: 'Chats', chats: chats, me: 'Ramin' });
});

app.get('/chats/:chatName', async (req, res) => {
    const { rows } = await pool.query('SELECT * FROM chats WHERE name = $1', [req.params.chatName]);

    const chat = rows[0];

    const messages = await pool.query('SELECT * FROM messages WHERE chatid = $1', [chat.id]);

    let friend = req.params.chatName.replace('Raminand', '');

    res.render('chat', { title: 'Chats', messages: messages.rows, friend: friend, me: 'Ramin' });
});

app.post('/save-photo', upload.single('files'), (req, res) => {
    console.log(req.file)
    if (req.file) {
        res.json({ info: 'Файл загружен' });
    } else {
        res.send({ info: 'Файл загружен' });
    }
});

app.post('/letter-sending', async (req, res) => {
    if (!req.body) {
        res.status(400).send('invalid data');

        return;
    }

    const newLetter = req.body;

    const chat = await pool.query('SELECT * FROM chats WHERE name = $1', [newLetter.chat]);

    const chatId = chat.rows[0].id;

    const { rows } = await pool.query(
        'INSERT INTO messages ("letter", "imageurl", "from", "to", "time", "chatid") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [newLetter.letter, newLetter.imageurl, newLetter.from, newLetter.to, newLetter.time, chatId]
    );

    res.json(rows[0]);
});

app.listen(HOST, () => {
    console.log(`http://localhost:${HOST}`)
})