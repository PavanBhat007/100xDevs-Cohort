const bodyParser = require('body-parser');
const express = require('express');
const port = 3000;

const app = express();

app.use(bodyParser.json()); // use body parser for json data

app.get('/', (req, res) => {
    res.send("Hello world!!");
});

app.post("/post", (req, res) => {
    console.log(req.headers);
    console.log(req.body);
});

app.listen(port, () => {
    console.log("Server listening on port", port);
});