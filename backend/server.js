const express = require('express');
const app = express();
const bodyParser = require("body-parser");
// const courseRoute = require('./course');
// const requestRoute = require('./request');
// const profileRoute = require('./profile');
// const scheduleRoute = require('./schedule');
var multer = require('multer')
var cors = require('cors');

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.use('/courses',courseRoute);
// app.use('/requests',requestRoute);
// app.use('/profile',profileRoute);
// app.use('/schedule',scheduleRoute);


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')

app.post('/upload',function(req, res) {
     
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
    return res.status(200).send(req.file)

  })

});

app.listen(8000, () => {
  console.log("Start server at port 8000.");
});