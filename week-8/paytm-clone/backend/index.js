const express = require("express");
const cors = require("cors");
const router = require("./routes/index.js");

app.use(cors());
app.use(express.json());

// all calls starting with /api/v1 are given to "router"
app.use("api/v1", router);
app.listen(8080);
