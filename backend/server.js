const express = require("express");
const passport = require("passport");
const app = express();
const cors = require("cors");
const loginRoute = require("./login");
const signupRoute = require("./signup");
const courseRoute = require("./course");
const requestRoute = require("./request");
const profileRoute = require("./profile");
const scheduleRoute = require("./schedule");
const searchRoute = require("./search");
const mongoose = require("mongoose");
require("./auth/auth");
require("dotenv").config();

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

app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/courses", courseRoute);
app.use("/requests", requestRoute);
app.use(
  "/profile",
  passport.authenticate("jwt-profile", { session: false }),
  profileRoute
);
app.use("/schedule", scheduleRoute);
app.use("/search", searchRoute);

app.listen(8000, () => {
  console.log("Start server at port 8000.");
});

// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, "public");
//   },
//   filename: function(req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// var upload = multer({ storage: storage }).single("file");

// app.post("/upload", function(req, res) {
//   upload(req, res, function(err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err);
//     } else if (err) {
//       return res.status(500).json(err);
//     }
//     return res.status(200).send(req.file);
//   });
// });
