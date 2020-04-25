const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var collectionName = "report";

const reportSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    moreInfo: {
      type: String,
      required: true,
    },
    reportingUserId: {
      type: String,
      required: true,
    },
    reportedUserId: {
      type: String,
      required: true,
    },
    createdTime: {
      type: Date,
      required: true,
    },
  },
  {
    collection: collectionName,
    versionKey: false,
  }
);

const reportModel = mongoose.model("reportModel", reportSchema);

module.exports = reportModel;
