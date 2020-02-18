const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var collectionName = 'schedule';

const scheduleSchema = new Schema({
    scheduleId: String,
    studentId: String,
    listOfCourse: Array,
    createdDate: { type: Date },
    lastModified: { type: Date }
}, {
    collection: collectionName,
    versionKey: false  
});

const ScheduleModel = mongoose.model('ScheduleModel', scheduleSchema);

module.exports = ScheduleModel;