const express = require("express");
const router = express.Router();
const path = require('path');
const crypto = require('crypto');
const multer = require("multer");
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose2 = require('mongoose');
const tutorModel = require("./models/tutor");
const UserModel = require("./models/user");

require("dotenv").config();
mongoose2.set("useNewUrlParser", true);
mongoose2.set("useUnifiedTopology", true);

const mongoURIUpload = process.env.MONGO_DB_UPLOAD;
const conn = mongoose2.createConnection(mongoURIUpload);

let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose2.mongo);
  gfs.collection('verify_documents');
});

const storage = new GridFsStorage({
  url: mongoURIUpload,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, async (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        // console.log(filename);

        const fileInfo = {
          filename: filename,
          bucketName: 'verify_documents'
        };

        let tutorInfo = await tutorModel.findOne({ userId: req.user._id });
        // console.log(tutorInfo.verificationDocument);
        if (tutorInfo.verificationDocument !== null) {
          await gfs.remove({ filename: tutorInfo.verificationDocument, root: 'verify_documents' });
          // console.log('Remove old');
        }

        await tutorModel.findOneAndUpdate(
          { userId: req.user._id },
          {
            verificationDocument: filename
          },
          {
            useFindAndModify: false
          }
        );
        // console.log('Updated');

        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

router.get('/file/:filename', async (req, res) => {
  let userId = req.user._id;
  let count = await UserModel.countDocuments({
    _id: userId,
    role: "admin"
  });

  if (count) {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exist'
        });
      }
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    });
  } else {
    res.status(401).send('Permission denied')
  }
});

router.post('/', upload.single('file'), (req, res) => {
  // console.log("Received");
  res.status(200).send(req.file);
});



module.exports = router;
