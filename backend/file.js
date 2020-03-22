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
const VERIFY_DOCUMENTS = 'verify_documents';
const PAYMENT_DOCUMENTS = 'payment_documents';
const VERIFY_DOCUMENTS_PATH = '/verifyFile/upload';
const PAYMENT_VERIFY_DOCUMENTS_PATH = '/paymentFile/verify/upload';
const PAYMENT_PREMUIM_DOCUMENTS_PATH = '/paymentFile/premium/upload';
const conn = mongoose2.createConnection(mongoURIUpload);

let verifyDocumentsGFS;
conn.once('open', () => {
  verifyDocumentsGFS = Grid(conn.db, mongoose2.mongo);
  verifyDocumentsGFS.collection(VERIFY_DOCUMENTS);

  // paymentDocumentsGFS = Grid(conn.db, mongoose2.mongo);
  // paymentDocumentsGFS.collection(PAYMENT_DOCUMENTS);
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
        let routePath = req.route.path;
        let collection;
        switch (routePath) {
          case (VERIFY_DOCUMENTS_PATH):
            collection = VERIFY_DOCUMENTS;
            break;
          case (PAYMENT_VERIFY_DOCUMENTS_PATH):
            collection = PAYMENT_DOCUMENTS;
            break;
          case (PAYMENT_PREMUIM_DOCUMENTS_PATH):
            collection = PAYMENT_DOCUMENTS;
            break;
          default:
            return reject(err);
        }

        const fileInfo = {
          filename: filename,
          bucketName: collection
        };

        let tutorInfo = await tutorModel.findOne({ userId: req.user._id });

        switch (routePath) {
          case (VERIFY_DOCUMENTS_PATH):
            if (tutorInfo.verificationDocument !== null) {
              await verifyDocumentsGFS.remove({ filename: tutorInfo.verificationDocument, root: collection });
              console.log('old verifyFile removed');
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
            console.log('verifyFile Updated');
            break;
          case (PAYMENT_VERIFY_DOCUMENTS_PATH):
            if (tutorInfo.verificationPayment !== null) {
              await gfs.remove({ filename: tutorInfo.verificationPayment, root: collection });
              console.log('old verify paymentFile removed');
            }
            await tutorModel.findOneAndUpdate(
              { userId: req.user._id },
              {
                verificationPayment: filename
              },
              {
                useFindAndModify: false
              }
            );
            console.log('verify paymentFile updated');
            break;
          case (PAYMENT_PREMUIM_DOCUMENTS_PATH):
            if (tutorInfo.premiumPayment !== null) {
              await gfs.remove({ filename: tutorInfo.premiumPayment, root: collection });
              console.log('old premium paymentFile removed');
            }
            await tutorModel.findOneAndUpdate(
              { userId: req.user._id },
              {
                premiumPayment: filename
              },
              {
                useFindAndModify: false
              }
            );
            console.log('premium paymentFile updated');
            break;
          default:
            console.log("No route");
            return reject(err);
        }

        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

router.get('/verifyFile', async (req, res) => {
  const tutorId = req.query.tutorId;
  const userId = req.user._id;

  let owner = tutorId == userId ? true : false;
  let admin = await UserModel.countDocuments({
    _id: userId,
    role: "admin"
  });

  if (admin || owner) {
    let tutorInfo = await tutorModel.findOne({
      userId: tutorId,
    });
    const filename = tutorInfo.verificationDocument;

    verifyDocumentsGFS.files.findOne({ filename: filename }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exist'
        });
      }
      const readstream = verifyDocumentsGFS.createReadStream(file.filename);
      readstream.pipe(res);
      res.status(200);
    });
  } else {
    res.status(401).send('Permission denied')
  }
});

router.post('/verifyFile/upload', upload.single('file'), (req, res) => {
  console.log("verifyFile Received");
  res.status(201).send(req.file);
});

router.post('/paymentFile/verify/upload', upload.single('file'), (req, res) => {
  console.log("verify paymentFile Received");
  res.status(201).send(req.file);
});

router.post('/paymentFile/premium/upload', upload.single('file'), (req, res) => {
  console.log("premium paymentFile Received");
  res.status(201).send(req.file);
});

module.exports = router;
