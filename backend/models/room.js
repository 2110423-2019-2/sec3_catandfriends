const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var collectionName = "room";

const roomSchema = new Schema(
  {
    userId0: {
      type: String,
      required: true
    },
    userId1: {
      type: String,
      required: true
    }
  },
  {
    collection: collectionName,
    versionKey: false
  }
);

const roomModel = mongoose.model("roomModel", roomSchema);

module.exports = roomModel;
