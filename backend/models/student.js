const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const collectionName = "student";

const studentSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true
    },
    scheduleId: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true
    }
  },
  {
    collection: collectionName,
    versionKey: false
  }
);

const studentModel = mongoose.model("studentModel", studentSchema);

module.exports = studentModel;
