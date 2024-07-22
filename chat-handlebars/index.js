const cors = require('cors');
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');

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

let files = fs.readdirSync('./chatFiles');

let chats = [];

files.forEach(element => {
    chats.push(element.split('.')[0]);
});

app.get('/', (req, res) => {
    res.render('index', { title: 'Chats', chats: chats, me: 'Ramin' });
});

app.get('/chats/:chatName', (req, res) => {
    fs.readFile(`./chatFiles/${req.params.chatName}.json`, 'utf-8', (err, data) => {
        if (err) {
            console.log('error: ', err)
        } else {
            let array = JSON.parse(data)

            let friend = array.find(e => e.to == 'Ramin').from;

            res.render('chat', { title: 'Chats', messages: array, friend: friend, me: 'Ramin' });
        }
    })
});

app.post('/save-photo', upload.single('files'), (req, res) => {
    console.log(req.file)
    if (req.file) {
        res.json({ info: 'Файл загружен' });
    } else {
        res.send({ info: 'Файл загружен' });
    }
});

app.post('/letter-sending', (req, res) => {
    if (req.body) {
        console.log(req.body)
        let letter = req.body
        fs.readFile(`./chatFiles/${letter.chat}.json`, 'utf-8', (err, data) => {
            if (err) {
                console.log(err)
            } else {
                let array = JSON.parse(data)
                if (array.length === 0) {
                    letter.id = 1
                } else {
                    letter.id = array.length + 1
                }

                array.push(req.body)
                stringifyedArray = JSON.stringify(array)
                fs.writeFile(`./chatFiles/${letter.chat}.json`, stringifyedArray, 'utf-8', (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json(array)
                    }
                })
            }
        })
    }

})

app.listen(HOST, () => {
    console.log(`http://localhost:${HOST}`)
})