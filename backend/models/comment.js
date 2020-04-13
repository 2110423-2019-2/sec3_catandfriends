const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var collectionName = "comment";

const commentSchema = new Schema(
    {
        courseId: {
            type: String,
            required: true
        },
        studentId: {
            type: String,
            required: true
        },
        text: {
            type: String,
            default: ""
        },
        rating: {
            type: Number,
            default: null
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

const CommentModel = mongoose.model("CommentModel", commentSchema);

module.exports = CommentModel;
