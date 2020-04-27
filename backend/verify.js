const express = require("express");
const router = express.Router();
const userModel = require("./models/user");

router.get("/", async (req, res, next) => {
  console.log("verifying");
  let user = userModel.findOne({ email: req.query.email }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      // console.log(user);
      if (user.password == req.query.hash) {
        // console.log("password mathced");
        userModel.findOneAndUpdate(
          user.toObject(),
          { $set: { verified: true } },
          {
            useFindAndModify: false,
          },
          (err, updatedUser) => {
            if (err) {
              res.send(err);
            } else {
              res.redirect("http://${process.env.SERVERIP}:3000/login");
              res.end();
            }
          }
        );
      }
    }
  });
});

module.exports = router;
