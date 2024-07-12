const { Transform } = require('stream');

const fs = require('fs');

const transformer = new Transform({
    transform(chunk, encoding, callback) {
        const array = JSON.parse(chunk);

        let nullItems = array.filter(element => element.name === null);

        nullItems.forEach(element => {
            array.splice(array.indexOf(element), 1);
        });

        this.push(JSON.stringify(array));

        callback();
    }
});

const readable = fs.createReadStream('./data.json');

const writable = fs.createWriteStream('./filtered_data.json');

readable.pipe(transformer).pipe(writable); 