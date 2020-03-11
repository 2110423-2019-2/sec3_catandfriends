const express = require("express");
const passport = require("passport");

const router = express.Router();

router.post("/", async (req, res, next) => {
  passport.authenticate("signup", errmsg => {
    if (errmsg) {
      console.log(errmsg);
      return res.status(400).json({ errmsg });
    } else {
      res.json({
        message: "Signup successful",
        user: req.user
      });
    }
  })(req, res, next);
});
// router.post(
//   "/",
//   passport.authenticate("signup", { session: false }),
//   async (req, res, next) => {
//     res.json({
//       message: "Signup successful",
//       user: req.user
//     });
//   }
// );

module.exports = router;
