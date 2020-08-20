const csv = require('csvtojson');
const fs = require('fs');
const { pipeline } = require('stream');

pipeline(
    fs.createReadStream('csv/csvtojson.csv'),
    csv(),
    fs.createWriteStream('csv/result.txt'),
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded.');
        }
    }
);
