const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const loginRoute = require("./login");
const signupRoute = require("./signup");
const courseRoute = require("./course");
const requestRoute = require("./request");
const profileRoute = require("./profile");
const scheduleRoute = require("./schedule");
const fileRoute = require("./file");
const searchRoute = require("./search");
const messageRoute = require("./message");
const commentRoute = require("./comment");
const reportRoute = require("./report");

const verifyRoute = require("./verify");
const mongoose = require("mongoose");
require("./auth/auth");
require("dotenv").config();

mongoose.connect(process.env.MONGO_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection.on("error", (err) => {
  logError(err);
});
mongoose.connection.on("connected", () => {
  console.log("Connected");
});

mongoose.set("useCreateIndex", true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use(
  "/courses",
  passport.authenticate("jwt-profile", { session: false }),
  courseRoute
);
app.use(
  "/requests",
  passport.authenticate("jwt-profile", { session: false }),
  requestRoute
);
app.use(
  "/profile",
  passport.authenticate("jwt-profile", { session: false }),
  profileRoute
);
app.use(
  "/schedule",
  passport.authenticate("jwt-profile", { session: false }),
  scheduleRoute
);
app.use("/search", searchRoute);
app.use(
  "/file",
  passport.authenticate("jwt-profile", { session: false }),
  fileRoute
);
app.use("/verify", verifyRoute);
app.use(
  "/message",
  passport.authenticate("jwt-profile", { session: false }),
  messageRoute
);
app.use(
  "/comment",
  passport.authenticate("jwt-profile", { session: false }),
  commentRoute
);
app.use(
  "/report",
  passport.authenticate("jwt-profile", { session: false }),
  reportRoute
);

app.listen(8000, () => {
  console.log("Start server at port 8000.");
});
