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
  profile = await userModel.findById(userId);
  const payload = req.body;
  if(payload.role != undefined){
    res.status(400).json("you can't change your role");
    return ;
  }
  if(payload.ssn != undefined){
    res.status(400).json("you can't chage your ssn");
    return ;
  }
  if(payload.email != undefined){
    res.status(400).json("you can't chage your email");
    return ;
  }
  if(payload.password != undefined){
    res.status(400).json("you can't chage your password");
    return ;
  }
  if(payload.birthDate != undefined){
    res.status(400).json("you can't chage your birthDate");
    return ;
  }
  if(payload.verified != undefined){
    res.status(400).json("you can't chage your verification");
    return ;
  }
  if(payload.firstName!= undefined &&payload.firstName.length > 32){
    res.status(400).json("your first name is too long");
    return ;
  }
  if(payload.lastName!= undefined && payload.lastName.length > 32){
    res.status(400).json("your last name is too long");
    return ;
  }
  if(payload.phoneNumber!=undefined){
    if(/^[0-9]+$/.test(payload.phoneNumber)==false || payload.phoneNumber.length!=10){
      res.status(400).json("your phone number must be 10 digit");
      return ;
    }
    
  }
  if(payload.gender != "Female" || payload.gender != "Male"){
    res.status(400).json("your gender can only be Female or Male");
      return ;
  }
  await userModel.updateOne({ _id: userId }, { $set: payload });
  await profile.save();
  console.log("after update");
  console.log(profile);
  res.status(201).json("update complete");

});
module.exports = router;
