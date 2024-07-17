const express = require('express');

const fs = require('fs');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

let files = [];

const imageExtensions = [
    'apng', 'png', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp'
];

function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            onError(err);

            return;
        }
        filenames.forEach(filename => {
            let fileNameParts = filename.split('.');

            let extension = fileNameParts[fileNameParts.length - 1];

            if (imageExtensions.includes(extension)) {
                files.push({
                    name: filename,
                    extension: extension
                });
            }

            console.log(files);
        });
    });
}

readFiles('public/');

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

    res.send('file uploaded');
});

module.exports = router;