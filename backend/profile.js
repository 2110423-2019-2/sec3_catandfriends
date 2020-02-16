const express = require("express");
const router = express.Router();
const userModel = require("./models/user");
const tutorModel = require("./models/tutor");
const studentModel = require("./models/student");

router.get("/", async (req, res, next) => {
  const userId = req.query.userId;
  let profile = await userModel.findById(userId, err => {
    return next(err);
  });
  profile.password = undefined;
  switch (profile.role) {
    case "tutor":
      let tutorProfile = await tutorModel.findOne(
        { userId },
        { _id: 0, userId: 0 }
      );
      profile = { ...profile.toObject(), ...tutorProfile.toObject() };
      break;
    case "student":
      let studentProfile = await studentModel.findOne(
        { userId },
        { _id: 0, userId: 0 }
      );
      profile = { ...profile.toObject(), ...studentProfile.toObject() };
      break;
  }
  profile.owner = true;
  if (req.user._id != userId) {
    switch (profile.role) {
      case "tutor":
        profile.email = undefined;
        profile.ssn = undefined;
        profile.premiumStatus = undefined;
        profile.verificationDocument = undefined;
        profile.owner = false;
        break;
      case "student":
        profile.email = undefined;
        profile.ssn = undefined;
        profile.scheduleId = undefined;
        profile.owner = false;
        break;
    }
  }
  return res.status(200).send(profile);
});

module.exports = router;
