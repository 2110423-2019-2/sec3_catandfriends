const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const courseRoute = require('./course');
const requestRoute = require('./request');
const profileRoute = require('./profile');
const scheduleRoute = require('./schedule');
const mongoose = require('mongoose')

const fs = require('fs');
let usernamePassword = "";

try {
  const usernPassws = fs.readFileSync('./secret.a', 'utf8');
  const usernPasswList = usernPassws.split(";");
  usernamePassword = usernPasswList[1];//select permission here
  //console.log(usernPasswList);
} catch (err) {
  console.error(err);
}

function connectToDatabase() {
  try {
    // console.log(usernamePassword);
    mongoose.connect('mongodb+srv://' + usernamePassword + '@cluster0-gcbxg.mongodb.net/TutorHere', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Successful connecting to database.');
  } catch (error) {
    console.log('Error connecting to database.');
    throw new Error('CONNECTION ERROR');
  }
}

connectToDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/courses', courseRoute);
app.use('/requests', requestRoute);
app.use('/profile', profileRoute);
app.use('/schedule', scheduleRoute);

app.listen(8000, () => {
  console.log("Start server at port 8000.");
});
