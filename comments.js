//create web server

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to read comments');
        }
        res.send(JSON.parse(data));
    });
});

app.post('/comments', (req, res) => {
    fs.readFile('./comments.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to read comments');
        }
        const comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('./comments.json', JSON.stringify(comments), err => {
            if (err) {
                console.error(err);
                res.status(500).send('Failed to write comments');
            }
            res.send(comments);
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});