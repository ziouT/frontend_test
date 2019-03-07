const express = require('express');
const os = require('os');
const csv = require('csv-parser');
const fs = require('fs');
const app = express();

const results = {};

fs.createReadStream('src/data/kingdomsdata2.csv')
    .pipe(csv())
    .on('data', (data) => {
        // results.push(data)
        for (let key in data) {
            if(!results.hasOwnProperty(key)) {
                results[key] = [];
            }
            results[key].push(data[key]);
        }
    })
    .on('end', () => {
        // console.log(results)
        app.listen(process.env.PORT || 3000, () => console.log(`Listening on port ${process.env.PORT || 3000}!`));
    });
    
app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/data', (req, res) => res.send({ data: results}));
    









