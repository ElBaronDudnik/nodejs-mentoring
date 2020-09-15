import { csv } from 'csvtojson';
import * as fs from 'fs';
import { pipeline } from 'stream';

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
