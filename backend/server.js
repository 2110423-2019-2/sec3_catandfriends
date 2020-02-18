const express = require("express");
const passport = require("passport");
const app = express();
const bodyParser = require("body-parser");
const courseRoute = require('./course');
const requestRoute = require('./request');
const profileRoute = require('./profile');
const scheduleRoute = require('./schedule');
const searchRoute = require('./search');
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);
require('dotenv').config();
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGO_DB,{useUnifiedTopology: true, useNewUrlParser:true});
mongoose.connection.on('error', err => {logError(err);});
mongoose.connection.on('connected', () => {console.log("Connected")});
const cors = require("cors");
const courseRoute = require("./course");
const requestRoute = require("./request");
const profileRoute = require("./profile");
const scheduleRoute = require("./schedule");
const loginRoute = require("./login");
const signupRoute = require("./signup");
const mongoose = require("mongoose");
require("dotenv").config();
require("./auth/auth");

mongoose.connect(process.env.MONGO_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
mongoose.connection.on("error", err => {
  logError(err);
});
mongoose.connection.on("connected", () => {
  console.log("Connected");
});
mongoose.set("useCreateIndex", true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/courses", courseRoute);
app.use("/requests", requestRoute);
app.use(
  "/profile",
  passport.authenticate("jwt-profile", {
    session: false
  }),
  profileRoute
);
app.use("/schedule", scheduleRoute);
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use('/courses', courseRoute);
app.use('/requests', requestRoute);
app.use('/profile', profileRoute);
app.use('/schedule', scheduleRoute);
app.use('/search', searchRoute);

app.listen(8000, () => {
  console.log("Start server at port 8000.");
});
