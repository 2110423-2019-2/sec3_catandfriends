const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const collectionName = "tutor";

const tutorSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true
    },
    premiumStatus: {
      type: Boolean,
      required: true
    },
    verificationDocument: {
      type: String,
      unique: true,
      sparse: true
    }
  },
  {
    collection: collectionName,
    versionKey: false
  }
);

const tutorModel = mongoose.model("tutorModel", tutorSchema);

module.exports = tutorModel;
