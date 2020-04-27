const express = require("express");
const router = express.Router();
const messageModel = require("./models/message");
const roomModel = require("./models/room");
const moment = require("moment-timezone");

//by room ID
router.get("/", async (req, res) => {
  var roomId = req.query.roomId;

  var messages = await messageModel.find({ roomId }).sort({ timeStamp: 1 });

  return res.status(200).send(messages);
});

router.get("/room", async (req, res) => {
  var userId0 = req.user._id;
  var userId1 = req.query.userId;

  var room =
    (await roomModel.findOne({ userId0, userId1 })) ||
    (await roomModel.findOne({ userId0: userId1, userId1: userId0 }));
  if (!room) {
    room = await roomModel.create({ userId0, userId1 });
  }
  return res.status(200).send(room);
});

router.get("/rooms", async (req, res) => {
  var userId = req.user._id;
  var room1 = await roomModel.find({ userId0: userId }, { userId0: 0 });
  for (let i = 0; i < room1.length; i++) {
    room1[i] = room1[i].toObject();
    room1[i].userId = room1[i].userId1;
    delete room1[i].userId1;
  }

  var room2 = await roomModel.find({ userId1: userId }, { userId1: 0 });
  for (let i = 0; i < room2.length; i++) {
    room2[i] = room2[i].toObject();
    room2[i].userId = room2[i].userId0;
    delete room2[i].userId0;
  }
  var rooms = [...room1, ...room2];
  // console.log(rooms);

  return res.status(200).send(rooms);
});

router.post("/", async (req, res) => {
  var { roomId, message } = req.body;
  var userId = req.user._id;
  var timeStamp = moment.tz(Date.now(), "Asia/Bangkok")._d;
  // console.log(timeStamp);

  var messageObject = await messageModel.create({
    roomId,
    message,
    timeStamp,
    userId,
  });

  return res.status(201).send({ message: "Message sent successfully" });
});

module.exports = router;
