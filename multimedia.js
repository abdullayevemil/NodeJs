const express = require('express');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

let files = [];

router.get('/', (req, res) => {
    res.json(files);
});

router.post('/upload', upload.array('myfile'), (req, res) => {
    req.files.forEach(file => {
        files.push({ 
            name: file.filename, 
            extension: file.mimetype.split('/')[1]
        });
    });

    console.log(files);

    res.send('file uploaded');
});

module.exports = router;