const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var collectionName = "rating";

const ratingSchema = new Schema(
    {
        courseId: {
            type: String,
            required: true
        },
        studentId: {
            type: String,
            required: true
        },
        rating: {
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

const RatingModel = mongoose.model("RatingModel", ratingSchema);

module.exports = RatingModel;
