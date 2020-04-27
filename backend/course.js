const express = require("express");
const router = express.Router();
const CourseModel = require("./models/course");
const userModel = require("./models/user");
const tutorModel = require("./models/tutor");
const requestModel = require("./models/request");
const ScheduleModel = require("./models/schedule");
const set = require("./commonFunc/set");
const format = require("./commonFunc/format");
const moment = require("moment-timezone");
const to = require("await-to-js").default;

router.get("/", async (req, res) => {
  let courseId = req.query.courseId;
  let tutorId = req.query.tutorId;
  let user = await userModel.findById(req.user._id);
  const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

  // //console.log(await CourseModel.find({listOfStudentId:["987654321"]
  // }));
  // console.log(courseId);
  if (courseId) {
    let haveCourseR = await checkHaveCourse(courseId);
    err = haveCourseR[0];
    let haveCourse = haveCourseR[1];
    if (!haveCourse) {
      res
        .status(400)
        .json({
          err: "This course is not in the system",
        })
        .end();
      return;
    }
    // //console.log(courseId);
    let course = await CourseModel.findById(courseId);
    // console.log(course);
    if (course == undefined || course.length == 0) {
      // var s = "this course hasn't been created yet";
      // //console.log(s);
      res.status(400).json("course not found");
      return;
    } else {
      let tutor = await userModel.findById(course.tutorId);
      course = { ...course.toObject() };
      course.tutorName = tutor.firstName + " " + tutor.lastName;
      course.owner = course.tutorId == req.user._id;
      // //console.log(course);
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
      // let requestable = true;

      let requestCount = await requestModel.countDocuments({
        studentId: req.user._id,
        courseId: course._id,
      });
      let userCount = await userModel.countDocuments({
        _id: req.user._id,
        role: "tutor",
      });
      if (!!requestCount || !!userCount || course.amountOfStudent == 0)
        requestable = false;

      course.startDate = format.formatDate(course.startDate);
      course.endDate = format.formatDate(course.endDate);

      //console.log(req.user._id);

      if (user.role == "tutor") {
        course.requestStatus = "unrequestable";
        // console.log("1");
      } else if (user.role == "student") {
        // console.log("2");
        studentId = req.user._id;
        // let c = await requestModel.find({ courseId: courseId });
        //console.log("\n\nc\n" + c + "\n\n");
        let reqcourse = await requestModel.findOne({
          studentId: studentId,
          courseId: courseId,
        });
        const available = await checkAvailable(
          studentId,
          courseId,
          dateThailand._d
        );
        if (reqcourse) {
          if (reqcourse.status == 1) {
            course.requestStatus = "Enrolled";
          } else {
            course.requestStatus = "Requested";
          }
        } else if (dateThailand._d > course.endDate) {
          course.requestStatus = "Course Expired";
        } else if (course.amountOfStudent == 0) {
          course.requestStatus = "Course Full";
        } else if (!available[1]) {
          course.requestStatus = "Time Overlapped";
        } else {
          course.requestStatus = "requestable";
        }
        // console.log(course.requestStatus);
      } else {
        // course.requestStatus = "TS1989";
        // console.log("3");
      }
      // console.log(course.requestStatus);
      res.status(200).json(course);
    }
  } else if (tutorId) {
    let course = await CourseModel.find({ tutorId: tutorId });
    if (course.length == 0) {
      res.json([]);
      return;
    } else {
      for (let i = 0; i < course.length; i++) {
        let err, tutor;
        [err, tutor] = await to(
          userModel.findOne({
            _id: course[i].tutorId,
          })
        );
        if (err) {
          res.status(500).end();
          return;
        }
        course[i].premiumTutorStatus = tutor.premiumStatus;
        let tutorName = tutor.firstName + " " + tutor.lastName;
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
        s = "";
        let dateSplit = course[i].startDate.toString().split(" ");
        s += dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[3];
        dateSplit = course[i].endDate.toString().split(" ");
        s += " - " + dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[3];
        course[i].duration = s;
        course[i].isAvailable = course[i].amountOfStudent > 0 ? true : false;
        course[i].dayAndStartTime = undefined;
        course[i].dayAndEndTime = undefined;
        course[i].listOfStudentId = undefined;
        course[i] = {
          ...course[i].toObject(),
          tutorName: tutorName,
        };
      }
    }
    res.status(200).json(course);
  } else {
    res
      .status(400)
      .json({
        err: "Bad request",
      })
      .end();
  }
});

router.post("/", async (req, res) => {
  let tutorId = req.user._id;
  const tutor = await tutorModel.findOne({ userId: tutorId });
  if (tutor.verifyStatus == false) {
    res.status(400).json("you must verify document first");
    return;
  }
  const payload = req.body;
  const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
  payload.createdTime = dateThailand._d;
  payload.lastModified = dateThailand._d;
  payload.tutorId = tutorId;
  payload.category = payload.category.toLowerCase();
  if (Object.keys(payload).length != 13) {
    //console.log(Object.keys(payload).length);
    //console.log("input is incomplete");
    res.status(400).json("input is incomplete");
  } else if (payload["dayAndStartTime"].length != 7) {
    //console.log("dayAndStartTime is incorrect");
    res.status(400).json("dayAndStartTime is incorrect");
    //res.status(400).end();
  } else if (payload["dayAndEndTime"].length != 7) {
    //console.log("dayAndEndTime is incorrect");
    res.status(400).json("dayAndEndTime is incorrect");
    //res.status(400).end();
  } else {
    let course = await CourseModel.findOne({
      courseName: payload["courseName"],
    });
    if (course != undefined) {
      //console.log(course);
      //console.log(course["courseName"] + " " + payload["courseName"]);
      //console.log("it's already has this courseName");
      //res.status(400).json(course);
      res.status(400).json("it's already has this courseName");
      return;
    }
    for (i = 0; i < 7; i++) {
      if (
        payload["dayAndStartTime"][i] == null &&
        payload["dayAndEndTime"][i] != null
      ) {
        res.status(400).json("StartTime is invalid");
        return;
      } else if (
        payload["dayAndStartTime"][i] != null &&
        payload["dayAndEndTime"][i] == null
      ) {
        res.status(400).json("EndTime is invalid");
        return;
      } else if (payload["dayAndStartTime"][i] > payload["dayAndEndTime"][i]) {
        res.status(400).json("StartTime must be before endTime");
        return;
      }
    }
    payload.tutorId = req.user._id;
    const courses = new CourseModel(payload);
    //console.log(courses);
    res.status(201).json(courses);
    await courses.save();

    //console.log("klfsal");
    //res.status(201).end();
  }
});

router.put("/", async (req, res) => {
  const payload = req.body;
  const course = await CourseModel.findOne({ _id: payload["_id"] });
  // //console.log(course[0]);
  ////console.log(payload);
  // //console.log(course.length);
  if (course == undefined || course.length == 0) {
    var s = "this course isn't create yet";
    //console.log(s);
    res.status(400).json(s);
  } else if (course.tutorId != req.user._id) {
    //console.log(course);
    //console.log(course.tutorId + " " + req.user._id);
    res.status(400).json("you are not the course owner");
    return;
  } else if (
    payload["dayAndStartTime"] != undefined &&
    payload["dayAndStartTime"].length != 7
  ) {
    //console.log("dayAndStartTime is incorrect");
    res.status(400).json("dayAndStartTime is incorrect");
    //res.status(400).end();
  } else if (
    payload["dayAndEndTime"] != undefined &&
    payload["dayAndEndTime"].length != 7
  ) {
    //console.log("dayAndEndTime is incorrect");
    res.status(400).json("dayAndEndTime is incorrect");
    //res.status(400).end();
  } else {
    for (i = 0; i < 7; i++) {
      if (
        payload["dayAndStartTime"] != undefined &&
        payload["dayAndEndTime"] != undefined
      ) {
        if (
          payload["dayAndStartTime"][i] == null &&
          payload["dayAndEndTime"][i] != null
        ) {
          res.status(400).json("StartTime is invalid");
          return;
        } else if (
          payload["dayAndStartTime"][i] != null &&
          payload["dayAndEndTime"][i] == null
        ) {
          res.status(400).json("EndTime is invalid");
          return;
        } else if (
          payload["dayAndStartTime"][i] > payload["dayAndEndTime"][i]
        ) {
          res.status(400).json("StartTime must be before endTime");
          return;
        }
      } else if (payload["dayAndStartTime"] != undefined) {
        if (
          payload["dayAndStartTime"][i] == null &&
          course["dayAndEndTime"][i] != null
        ) {
          res.status(400).json("StartTime is invalid");
          return;
        } else if (
          payload["dayAndStartTime"][i] != null &&
          course["dayAndEndTime"][i] == null
        ) {
          res.status(400).json("EndTime is invalid");
          return;
        } else if (payload["dayAndStartTime"][i] > course["dayAndEndTime"][i]) {
          res.status(400).json("StartTime must be before endTime");
          return;
        }
      } else if (payload["dayAndEndTime"] != undefined) {
        if (
          course["dayAndStartTime"][i] == null &&
          payload["dayAndEndTime"][i] != null
        ) {
          res.status(400).json("StartTime is invalid");
          return;
        } else if (
          course["dayAndStartTime"][i] != null &&
          payload["dayAndEndTime"][i] == null
        ) {
          res.status(400).json("EndTime is invalid");
          return;
        } else if (course["dayAndStartTime"][i] > payload["dayAndEndTime"][i]) {
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
async function checkAvailable(studentId, courseId, dateThailand) {
  let err, course;
  [err, course] = await to(CourseModel.findById(courseId));
  let dayCourse = [course.startDate, course.endDate];

  let courses;
  [err, courses] = await to(
    ScheduleModel.findOne(
      {
        studentId: studentId,
      },
      {
        _id: 0,
        studentId: 0,
        createdDate: 0,
        lastModified: 0,
      }
    )
  );

  let listOfCourse = courses.listOfCourse;
  let available = true;
  let outerBreak = false;
  for (let i = 0; i < listOfCourse.length; i++) {
    let courseQ;
    [err, courseQ] = await to(
      CourseModel.findOne(
        {
          _id: listOfCourse[i],
        },
        {
          _id: 0,
          dayAndStartTime: 1,
          dayAndEndTime: 1,
          startDate: 1,
          endDate: 1,
        }
      )
    );

    let dayCourseQ = [courseQ.startDate, courseQ.endDate];

    if (!set.isIntersect(dayCourse, dayCourseQ)) {
      break;
    }

    for (let j = 0; j < 7; j++) {
      if (
        courseQ.dayAndStartTime[j] == null ||
        course.dayAndStartTime[j] == null
      )
        continue;
      let a = [courseQ.dayAndStartTime[j], courseQ.dayAndEndTime[j]];
      let b = [course.dayAndStartTime[j], course.dayAndEndTime[j]];
      if (set.isIntersect(a, b)) {
        available = false;
        outerBreak = true;
        break;
      }
    }
    if (outerBreak) {
      break;
    }
  }
  return [err, available];
}

async function checkHaveCourse(courseId) {
  [err, course] = await to(CourseModel.findOne({ _id: courseId }, { _id: 1 }));
  return [err, !!course];
}

module.exports = router;
