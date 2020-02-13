const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var collectionName = 'course_request';

const requestSchema = new Schema({
    requestId: String,
    courseId: String,
    tutorId: String,
    studentId: String,
    status: { type: Boolean, default: false },
    createdTime: { type: Date},
    lastModified: { type: Date}
}, {
    collection: collectionName,
    versionKey: false,
});

const RequestModel = mongoose.model('RequestModel', requestSchema);

module.exports = RequestModel;