const express = require("express");
const router = express.Router();
const multer = require("multer");
const tutorModel = require("./models/tutor");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public");
  },
  filename: async function(req, file, cb) {
    let fileName = `${req.user.email}.jpg`;
    try {
      let data = await tutorModel.findOneAndUpdate(
        { userId: req.user._id },
        {
          verificationDocument: fileName
        },
        {
          useFindAndModify: false
        }
      );
    } catch (err) {
      res.status(500).end();
    }
    cb(null, fileName);
  }
});

var upload = multer({ storage: storage }).single("file");

router.post("/", async function(req, res) {
  await upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

module.exports = router;
