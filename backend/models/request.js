const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var collectionName = 'course_request';

const requestSchema = new Schema({
    requestId: String,
    courseId: String,
    tutorId: String,
    studentId: String,
    status: Boolean,
    timeStamp: { type: Date, default: Date.now }
}, {
    collection: collectionName, versionKey: false  
});

const RequestModel = mongoose.model('RequestModel', requestSchema);

module.exports = RequestModel;