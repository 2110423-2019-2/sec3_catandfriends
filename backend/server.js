const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const courseRoute = require('./course');
const requestRoute = require('./request');
const profileRoute = require('./profile');
const scheduleRoute = require('./schedule');
const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.MONGO_DB,{useUnifiedTopology: true, useNewUrlParser:true});
mongoose.connection.on('error', err => {logError(err);});
mongoose.connection.on('connected', () => {console.log("Connected")});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/courses', courseRoute);
app.use('/requests', requestRoute);
app.use('/profile', profileRoute);
app.use('/schedule', scheduleRoute);

app.listen(8000, () => {
  console.log("Start server at port 8000.");
});
