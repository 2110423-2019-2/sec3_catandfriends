const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const courseRoute = require('./course');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/courses',courseRoute);

app.listen(8000, () => {
    console.log("Start server at port 8000.");
  });
