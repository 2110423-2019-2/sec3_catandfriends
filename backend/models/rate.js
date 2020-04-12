const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var collectionName = "rate";

const rateSchema = new Schema(
    {
        courseId: {
            type: String,
            required: true
        },
        studentId: {
            type: String,
            required: true
        },
        rate: {
            type: Number,
        },
        createdTime: {
            type: Date,
            required: true
        },
        lastModified: {
            type: Date,
            required: true
        }
    }, {
    collection: collectionName,
    versionKey: false
}
);

const RateModel = mongoose.model("RateModel", rateSchema);

module.exports = RateModel;
