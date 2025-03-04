const express = require('express')

const app = express();

app.get('/sum', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.send((a + b).toString());
});

app.get('/interest', (req, res) => {
    const principal = parseInt(req.query.principal);
    const time = parseInt(req.query.time);
    const rate = parseInt(req.query.rate);

    res.send(((principal * time * rate)/100).toString());
});

app.listen(3000);