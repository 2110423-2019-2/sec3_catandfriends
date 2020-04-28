const express = require("express");
const moment = require("moment-timezone");
const reportModel = require("./models/report");
const router = express.Router();

router.post("/", async (req, res) => {
  var reportingUserId = req.user._id;
  var createdTime = moment.tz(Date.now(), "Asia/Bangkok")._d;
  // console.log({
  //   ...req.body,
  //   reportingUserId,
  //   createdTime,
  // });
  var report = await reportModel.create({
    ...req.body,
    reportingUserId,
    createdTime,
  });

  res.status(201).send({ message: "Report sent successfully" });
});

module.exports = router;
