const express = require("express");
const router = express.Router();
const CourseModel = require("./models/course");
const userModel = require("./models/user");
const moment = require("moment-timezone");
const to = require("await-to-js").default;
function formatTime(time) {
  let timeS = time.toString();
  if (timeS.includes(".")) {
    hour = timeS.slice(0, timeS.indexOf("."));
    min = timeS.slice(timeS.indexOf(".") + 1, timeS.length);
  } else {
    hour = timeS;
    min = "0";
  }
  if (hour.length == 1) hour = "0" + hour;
  if (min.length == 1) min = min + "0";
  return hour + ":" + min;
}

function formatRangeOfTime(start, end) {
  return formatTime(start) + "-" + formatTime(end);
}

function formatDate(date) {
  s = "";
  let dateSplit = date.toString().split(" ");
  s += dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[3];
  return s;
}

router.get("/", async (req, res) => {
  let courseId = req.query.courseId;
  let tutorId = req.query.tutorId;
  let studentId = req.query.studentId;
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
      res.json([]);
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
          formatRangeOfTime(
            course["dayAndStartTime"][j],
            course["dayAndEndTime"][j]
          ) + "/ ";
      }
      course.day = s.slice(0, s.length - 2);

      course.startDate = formatDate(course.startDate);
      course.endDate = formatDate(course.endDate);
      res.json(course);
    }
    res.status(200).end();
  } else if (tutorId != undefined) {
    //console.log(req);
    //console.log("print");
    let course = await CourseModel.find({ tutorId: tutorId });
    if (course.length == 0) {
      // var s = "tutor hasn't created the course";
      // console.log(s);
      res.json([]);
    } else {
      for (let i = 0; i < course.length; i++) {
        let err, tutor;
        [err, tutor] = await to(
          userModel.findOne({
            _id: course[i].tutorId
          })
        );
        if (err) {
          res.status(500).end();
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
          // s += course[i]['dayAndStartTime'][j] + "-" + course[i]['dayAndEndTime'][j] + "/ ";
          s +=
            formatRangeOfTime(
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
        // let remaining = course[i].amountOfStudent;

        course[i].startDate = undefined;
        course[i].endDate = undefined;
        course[i].dayAndStartTime = undefined;
        course[i].dayAndEndTime = undefined;
        course[i].listOfStudentId = undefined;
        // course[i].amountOfStudent = undefined;
        course[i].createdTime = undefined;
        course[i].lastModified = undefined;

        course[i] = {
          ...course[i].toObject(),
          tutorName: tutorName
          // remaining: remaining
        };
      }
      res.json(course);
    }
    res.status(200).end();
  } else if (studentId != undefined) {
    // console.log(studentId);
    // console.log("ajsdkfl");
    let course = await CourseModel.find({});
    let s = [];
    console.log("\n\n\n");
    for (i = 0; i < course.length; i++) {
      //console.log(CourseModel().type);
      let length = course[i]["listOfStudentId"].length;
      //console.log(course[i]['listOfStudentId']);
      for (j = 0; j < length; j++) {
        if (course[i]["listOfStudentId"][j] == studentId) {
          //console.log(course[i]);
          s.push(course[i]);
          console.log(s);
          continue;
        }
      }
    }
    // console.log(s);
    res.json(s);
    res.status(200).end();
  } else {
    res.json("invalid");
    course = await CourseModel.find({});
    // console.log(course);
    res.status(404).end();
  }
});

router.post("/", async (req, res) => {
  const payload = req.body;
  const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
  payload.createdTime = dateThailand._d;
  payload.lastModified = dateThailand._d;
  if (Object.keys(payload).length != 11) {
    console.log(Object.keys(payload).length);
    console.log("input is incomplete");
    res.json("input is incomplete");
    res.status(400).end();
  } else if (payload["dayAndStartTime"].length != 7) {
    console.log("dayAndStartTime is incorrect");
    res.json("dayAndStartTime is incorrect");
    res.status(400).end();
  } else if (payload["dayAndEndTime"].length != 7) {
    console.log("dayAndEndTime is incorrect");
    res.json("dayAndEndTime is incorrect");
    res.status(400).end();
  } else {
    payload.tutorId = req.user._id;
    const course = new CourseModel(payload);
    console.log(course);
    res.json(course);
    await course.save();
    console.log("klfsal");
    res.status(201).end();
  }
});

router.put("/", async (req, res) => {
  const payload = req.body;
  const course = await CourseModel.find({ _id: payload["_id"] });
  // console.log(course[0]);
  console.log(payload);
  // console.log(course.length);
  if (course == undefined || course.length == 0) {
    var s = "this course isn't create yet";
    console.log(s);
    res.json(s);
  } else if (
    payload["dayAndStartTime"] != undefined &&
    payload["dayAndStartTime"].length != 7
  ) {
    console.log("dayAndStartTime is incorrect");
    res.json("dayAndStartTime is incorrect");
    res.status(400).end();
  } else if (
    payload["dayAndEndTime"] != undefined &&
    payload["dayAndEndTime"].length != 7
  ) {
    console.log("dayAndEndTime is incorrect");
    res.json("dayAndEndTime is incorrect");
    res.status(400).end();
  } else {
    console.log("jasdlkjf");
    const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
    /*for(var k in payload)
            course[0][k] = payload[k];*/
    payload.lastModified = dateThailand._d;
    await CourseModel.updateOne({ _id: payload["_id"] }, { $set: payload });
    res.json("update complete");
  }
  res.status(201).end();
});

module.exports = router;
