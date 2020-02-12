const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var collectionName = 'course_request';
const moment = require('moment-timezone');
const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

const requestSchema = new Schema({
    requestId: String,
    courseId: String,
    tutorId: String,
    studentId: String,
    status: { type: Boolean, default: false },
    createdTime: { type: Date, default: dateThailand._d },
    lastModified: { type: Date, default: dateThailand._d }
}, {
    collection: collectionName,
    versionKey: false,
});

const RequestModel = mongoose.model('RequestModel', requestSchema);

module.exports = RequestModel;