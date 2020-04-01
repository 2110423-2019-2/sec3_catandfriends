const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var collectionName = "message";

const messageSchema = new Schema(
  {
    roomId: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    timeStamp: {
      type: Date,
      required: true
    }
  },
  {
    collection: collectionName,
    versionKey: false
  }
);

const messageModel = mongoose.model("messageModel", messageSchema);

module.exports = messageModel;
