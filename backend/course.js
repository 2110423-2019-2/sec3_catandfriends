const express = require("express");
const router = express.Router();
const CourseModel = require("./models/course");
const userModel = require("./models/user");
const requestModel = require("./models/request");
const format = require("./commonFunc/format");
const moment = require("moment-timezone");
const to = require("await-to-js").default;

router.get("/", async (req, res) => {
  let courseId = req.query.courseId;
  let user = await userModel.findById(req.user._id);
  const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
  // console.log(await CourseModel.find({listOfStudentId:["987654321"]
  // }));
  //console.log(courseId);
  if (courseId != undefined) {
    // console.log(courseId);
    let course = await CourseModel.findById(courseId);
    // console.log(course);
    if (course == undefined || course.length == 0) {
      // var s = "this course hasn't been created yet";
      // console.log(s);
      res.status(400).json("course not found");
      return ;
    } else {
      let tutor = await userModel.findById(course.tutorId);
      course = { ...course.toObject() };
      course.tutorName = tutor.firstName + " " + tutor.lastName;
      course.owner = course.tutorId == req.user._id;
      // console.log(course);
      let s = "";
      for (j = 0; j < 7; j++) {
        if (course["dayAndStartTime"][j] == null) continue;
        if (j == 0) s += "Mon ";
        else if (j == 1) s += "Tue ";
        else if (j == 2) s += "Wed ";
        else if (j == 3) s += "Thu ";
        else if (j == 4) s += "Fri ";
        else if (j == 5) s += "Sat ";
        else if (j == 6) s += "Sun ";
        s +=
          format.formatRangeOfTime(
            course["dayAndStartTime"][j],
            course["dayAndEndTime"][j]
          ) + "/ ";
      }
      course.day = s.slice(0, s.length - 2);
      let requestable = true;

      let requestCount = await requestModel.countDocuments({
        studentId: req.user._id,
        courseId: course._id
      });
      let userCount = await userModel.countDocuments({
        _id: req.user._id,
        role: "tutor"
      });
      if (!!requestCount || !!userCount || course.amountOfStudent == 0)
        requestable = false;

      course.startDate = format.formatDate(course.startDate);
      course.endDate = format.formatDate(course.endDate);

    }
    console.log(req.user._id);
    
    console.log(user);
  if (user.role == "tutor") {
      course.requestStatus = "unrequestable";
  } if (user.role == "student") {
    studentId= req.user._id
    let c = await requestModel.find({courseId: courseId});
      console.log("\n\nc\n"+c+"\n\n");
    let reqcourse = await requestModel.find({StudentId: studentId, courseId: courseId});
      console.log(reqcourse);
    if(reqcourse.length!=0){
      if(c.status ==1){
        course.requestStatus = "enrolled";
      }
      else if(c.status = 0){
        course.requestStatus = "requested";
      }
    }
      else if(dateThailand._d > course.endDate)
        course.requestStatus = "course expired";
      else if(course.amountOfStudent > course.totalAmountOfStudent)
        course.requestStatus = "course full";
      else if(!checkAvailable(studentId,courseId))
        course.requestStatus = "overlaped";
      else
        course.requestStatus = "requestable";
    
     //console.log(s);
  }
    console.log(course);
    res.status(200).json(course);
  }
  else if(user.role =="tutor"){
      let course = await CourseModel.find({tutorId: user._id});
      console.log(course);
    for(i=0; i<course.length;i++){
      course[i] = { ...course[i].toObject() };
      course[i].tutorName = user.firstName + " " + user.lastName;
      course[i].owner = course[i].tutorId == user._id;
      // console.log(course);
      let s = "";
      for (j = 0; j < 7; j++) {
        if (course[i]["dayAndStartTime"][j] == null) continue;
        if (j == 0) s += "Mon ";
        else if (j == 1) s += "Tue ";
        else if (j == 2) s += "Wed ";
        else if (j == 3) s += "Thu ";
        else if (j == 4) s += "Fri ";
        else if (j == 5) s += "Sat ";
        else if (j == 6) s += "Sun ";
        s +=
          format.formatRangeOfTime(
            course[i]["dayAndStartTime"][j],
            course[i]["dayAndEndTime"][j]
          ) + "/ ";
      }
      course[i].day = s.slice(0, s.length - 2);
      let userCount = await userModel.countDocuments({
        _id: req.user._id,
        role: "tutor"
      });
      course[i].startDate = format.formatDate(course[i].startDate);
      course[i].endDate = format.formatDate(course[i].endDate);
      course.requestable=false;

    }
    res.status(200).json(course);
      
  }
  else{
    for (i = 0; i < courses.length; i++) {
      let s = [];
      let courses = await requestModel.find({studentId: req.user._id});
      console.log(courses[i].courseId);
      let status = courses[i].status;
      console.log("status = "+status)
      let message = "status: ";
      let c = await CourseModel.findById(courses[i].courseId,
        {dayAndStartTime:0, dayAndEndTime:0, listOfStudentId:0, listOfStudentRequest:0, createdTime:0, lastModified:0});
        if(status ==1){
          message = message+"enroll successful";
        }
        else if(status ==0){
          message = message+"waiting for tutor confirmation";
        }
        else if(status ==-1){
          message = message+"the enrollment was rejected";
        }
        console.log(c);
        s.push(message);
        s.push(c);
        res.status(200).json(s);
        return ;
    }
  }
  
});

router.post("/", async (req, res) => {
  let tutorId = req.user._id;
  const payload = req.body;
  const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
  payload.createdTime = dateThailand._d;
  payload.lastModified = dateThailand._d;
  payload.tutorId = tutorId;
  payload.category = payload.category.toLowerCase();
  if (Object.keys(payload).length != 13) {
    console.log(Object.keys(payload).length);
    console.log("input is incomplete");
    res.status(400).json("input is incomplete");
  } else if (payload["dayAndStartTime"].length != 7) {
    console.log("dayAndStartTime is incorrect");
    res.status(400).json("dayAndStartTime is incorrect");
    //res.status(400).end();
  } else if (payload["dayAndEndTime"].length != 7) {
    console.log("dayAndEndTime is incorrect");
    res.status(400).json("dayAndEndTime is incorrect");
    //res.status(400).end();
  }
  else {
    let course = await CourseModel.findOne({ courseName: payload["courseName"] });
    if (course != undefined) {
      console.log(course);
      console.log(course["courseName"] + " " + payload["courseName"]);
      console.log("it's already has this courseName");
      //res.status(400).json(course);
      res.status(400).json("it's already has this courseName");
      return;
    }
    for (i = 0; i < 7; i++) {
      if (payload["dayAndStartTime"][i] == null && payload["dayAndEndTime"][i] != null) {
        res.status(400).json("StartTime is invalid");
        return;
      }
      else if (payload["dayAndStartTime"][i] != null && payload["dayAndEndTime"][i] == null) {
        res.status(400).json("EndTime is invalid");
        return;
      }
      else if (payload["dayAndStartTime"][i] > payload["dayAndEndTime"][i]) {
        res.status(400).json("StartTime must be before endTime");
        return;
      }
    }
    payload.tutorId = req.user._id;
    const courses = new CourseModel(payload);
    console.log(courses);
    res.status(201).json(courses);
    await courses.save();

    console.log("klfsal");
    //res.status(201).end();
  }
});

router.put("/", async (req, res) => {
  const payload = req.body;
  const course = await CourseModel.findOne({ _id: payload["_id"] });
  // console.log(course[0]);
  //console.log(payload);
  // console.log(course.length);
  if (course == undefined || course.length == 0) {
    var s = "this course isn't create yet";
    console.log(s);
    res.status(400).json(s);
  } else if (course.tutorId != req.user._id) {
    console.log(course);
    console.log(course.tutorId + " " + req.user._id);
    res.status(400).json("you are not the course owner");
    return;

  } else if (
    payload["dayAndStartTime"] != undefined &&
    payload["dayAndStartTime"].length != 7
  ) {
    console.log("dayAndStartTime is incorrect");
    res.status(400).json("dayAndStartTime is incorrect");
    //res.status(400).end();
  } else if (
    payload["dayAndEndTime"] != undefined &&
    payload["dayAndEndTime"].length != 7
  ) {
    console.log("dayAndEndTime is incorrect");
    res.status(400).json("dayAndEndTime is incorrect");
    //res.status(400).end();
  } else {
    for (i = 0; i < 7; i++) {
      if (payload["dayAndStartTime"] != undefined && payload["dayAndEndTime"] != undefined) {
        if (payload["dayAndStartTime"][i] == null && payload["dayAndEndTime"][i] != null) {
          res.status(400).json("StartTime is invalid");
          return;
        }
        else if (payload["dayAndStartTime"][i] != null && payload["dayAndEndTime"][i] == null) {
          res.status(400).json("EndTime is invalid");
          return;
        }
        else if (payload["dayAndStartTime"][i] > payload["dayAndEndTime"][i]) {
          res.status(400).json("StartTime must be before endTime");
          return;
        }
      }
      else if (payload["dayAndStartTime"] != undefined) {
        if (payload["dayAndStartTime"][i] == null && course["dayAndEndTime"][i] != null) {
          res.status(400).json("StartTime is invalid");
          return;
        }
        else if (payload["dayAndStartTime"][i] != null && course["dayAndEndTime"][i] == null) {
          res.status(400).json("EndTime is invalid");
          return;
        }
        else if (payload["dayAndStartTime"][i] > course["dayAndEndTime"][i]) {
          res.status(400).json("StartTime must be before endTime");
          return;
        }
      }
      else if (payload["dayAndEndTime"] != undefined) {
        if (course["dayAndStartTime"][i] == null && payload["dayAndEndTime"][i] != null) {
          res.status(400).json("StartTime is invalid");
          return;
        }
        else if (course["dayAndStartTime"][i] != null && payload["dayAndEndTime"][i] == null) {
          res.status(400).json("EndTime is invalid");
          return;
        }
        else if (course["dayAndStartTime"][i] > payload["dayAndEndTime"][i]) {
          res.status(400).json("StartTime must be before endTime");
          return;
        }
      }
    }
    const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
    /*for(var k in payload)
            course[0][k] = payload[k];*/
    payload.lastModified = dateThailand._d;
    await CourseModel.updateOne({ _id: payload["_id"] }, { $set: payload });
    res.status(201).json("update complete");
  }
  //res.status(201).end();
});
async function checkAvailable(studentId, courseId) {
  let err, course;
  [err, course] = await to(CourseModel.findById(courseId));
  let courses;
  [err, courses] = await to(ScheduleModel.findOne({
    studentId: studentId
  }, {
    _id: 0,
    studentId: 0,
    createdDate: 0,
    lastModified: 0
  }));

  let listOfCourse = courses.listOfCourse;
  let available = true;
  for (let i = 0; i < listOfCourse.length; i++) {
    let courseQ;
    [err, courseQ] = await to(CourseModel.findOne({
      _id: listOfCourse[i]
    }, {
      _id: 0,
      dayAndStartTime: 1,
      dayAndEndTime: 1
    }));

    for (let j = 0; j < 7; j++) {
      if (courseQ.dayAndStartTime[j] == null || course.dayAndStartTime[j] == null) continue
      let a = [courseQ.dayAndStartTime[j], courseQ.dayAndEndTime[j]];
      let b = [course.dayAndStartTime[j], course.dayAndEndTime[j]];
      if (set.isIntersect(a, b)) available = false;
    }
  }
  return [err, available];
}
module.exports = router;
