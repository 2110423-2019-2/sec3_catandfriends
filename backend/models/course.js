const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var collectionName = 'course';

const courseSchema = new Schema({
    //_id: String,
    //courseId: {type: String,required: true,unique: true},
    courseName: { type: String, required: true },
    dayAndStartTime: { type: [Number], required: true },
    dayAndEndTime: { type: [Number], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    tutorId: { type: String, required: true },
    amountOfStudent: { type: Number, required: true },
    totalAmountOfStudent: { type: Number, required: true, default: 0 },
    listOfStudentId: { type: [String] },
    listOfStudentRequest: { type: [String] },
    description: { type: String, required: true },
    courseFee: { type: Number, required: true },
    category: { type: String, required: true },
    day: String,
    duration: String,
    premiumTutorStatus: Boolean,
    isAvailable: Boolean,
    sumOfRating: { type: Number, required: true, default: 0 },
    requestStatus: String,
    numberOfRating: { type: Number, required: true, default: 0 },
    createdTime: { type: Date, required: true },
    lastModified: { type: Date, required: true }

}, {
    collection: collectionName, versionKey: false
});

const CourseModel = mongoose.model('CourseModel', courseSchema);

module.exports = CourseModel;