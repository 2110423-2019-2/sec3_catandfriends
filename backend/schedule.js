const express = require("express");
const router = express.Router();
const ScheduleModel = require("./models/schedule");
const CourseModel = require("./models/course");
const UserModel = require("./models/user");
const RequestModel = require("./models/request");
const format = require("./commonFunc/format");

router.get("/", async (req, res) => {
  const studentId = req.user._id;
  // console.log(studentId);
  const schedule = await ScheduleModel.findOne({ studentId });
  // console.log(schedule);

  let listOfCourse = [];
  (schedule.listOfCourse).forEach((id) => {
    listOfCourse.push({ _id: id });
  });

  // console.log(listOfCourse);

  for (let i = 0; i < listOfCourse.length; i++) {
    // console.log(listOfCourse[i]._id);
    const courseInfo = await CourseModel.findById(listOfCourse[i]._id);
    const userInfo = await UserModel.findOne({ _id: courseInfo.tutorId });
    const requestInfo = await RequestModel.findOne({ tutorId: courseInfo.tutorId, studentId: studentId, courseId: courseInfo._id });
    // console.log(requestInfo);

    listOfCourse[i].courseName = courseInfo.courseName;
    listOfCourse[i].tutorName = userInfo.firstName + " " + userInfo.lastName;
    listOfCourse[i].enrollDate = requestInfo ? format.formatDate(requestInfo.lastModified) : null;
    listOfCourse[i].duration = format.formatDuration(courseInfo);
    listOfCourse[i].day = format.formatCourseDay(courseInfo);
  }

  // console.log(listOfCourse);
  res.status(200).json(listOfCourse).end();
});

module.exports = router;
