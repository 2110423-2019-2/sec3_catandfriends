const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var collectionName = 'course';

const courseSchema = new Schema({
    courseId: String,
    courseName: String,
    dayAndTime: [String],
    startDate: Date,
    endDate: Date,
    tutorId: String,
    amountOfStudent: Number,
    listOfStudentId: [String],
    description: String,
    courseFee: Number,
    createdTime: Date,
    lastModified: Date
}, {
    collection: collectionName, versionKey: false  
});

const CourseModel = mongoose.model('CourseModel', courseSchema);

module.exports = CourseModel;