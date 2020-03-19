const express = require("express");
const router = express.Router();
const userModel = require("./models/user");
const tutorModel = require("./models/tutor");
const studentModel = require("./models/student");

router.get("/", async (req, res, next) => {
  const userId = req.query.userId;
  var profile;
  if (!userId) {
    profile = await userModel.findById(req.user._id);
    profile.password = undefined;
    switch (profile.role) {
      case "tutor":
        let tutorProfile = await tutorModel.findOne(
          { userId: req.user._id },
          { _id: 0, userId: 0 }
        );
        profile = { ...profile.toObject(), ...tutorProfile.toObject() };
        break;
      case "student":
        let studentProfile = await studentModel.findOne(
          { userId: req.user._id },
          { _id: 0, userId: 0 }
        );
        profile = { ...profile.toObject(), ...studentProfile.toObject() };
        break;
    }
    profile.owner = true;
  } else {
    profile = await userModel.findById(userId);
    profile.password = undefined;
    switch (profile.role) {
      case "tutor":
        let tutorProfile = await tutorModel.findOne(
          { userId },
          { _id: 0, userId: 0 }
        );
        profile = { ...profile.toObject(), ...tutorProfile.toObject() };
        // profile.email = undefined;
        profile.ssn = undefined;
        profile.premiumStatus = undefined;
        profile.verificationDocument = undefined;
        profile.owner = false;
        break;
      case "student":
        let studentProfile = await studentModel.findOne(
          { userId },
          { _id: 0, userId: 0 }
        );
        profile = { ...profile.toObject(), ...studentProfile.toObject() };
        // profile.email = undefined;
        profile.ssn = undefined;
        profile.scheduleId = undefined;
        profile.owner = false;
        break;
    }
  }
  return res.status(200).send(profile);
});
router.put("/", async (req, res) => {
  const userId = req.user._id;
  const payload = req.body;
  await CourseModel.updateOne({ _id: userId }, { $set: payload });
  res.status(201).json("update complete");

});
module.exports = router;
