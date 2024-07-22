const fs = require('fs');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

app = express();
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send', (req, res) => {
    let buffer1 = Buffer.from(req.body.input1); 
    
    let buffer2 = Buffer.from(req.body.input2); 
    
    let buffer3 = Buffer.from(req.body.input3); 
    
    let buffer4 = Buffer.from(req.body.input4); 
    
    let buffer5 = Buffer.from(req.body.input5); 

    let finalBuffer = Buffer.concat([buffer1, buffer2, buffer3, buffer4, buffer5]);
    
    let askiiArray = finalBuffer.toJSON().data;

    if (askiiArray.length > 1000) {
        askiiArray = askiiArray.slice(0, 1000)
    }

    fs.writeFileSync('data.txt', String.fromCharCode(...askiiArray), 'utf8');

    res.status(200).send('Success');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});