const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var collectionName = "course_request";

const requestSchema = new Schema(
  {
    // requestId: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    courseId: {
      type: String,
      required: true
    },
    tutorId: {
      type: String,
      required: true
    },
    studentId: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      default: false,
      required: true
    },
    createdTime: {
      type: Date,
      required: true
    },
    lastModified: {
      type: Date,
      required: true
    }
  },
  {
    collection: collectionName,
    versionKey: false
  }
);

const RequestModel = mongoose.model("RequestModel", requestSchema);

module.exports = RequestModel;
