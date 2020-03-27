const express = require("express");
const router = express.Router();
const CourseModel = require("./models/course");
const userModel = require("./models/user");
const requestModel = require("./models/request");
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
      let requestable = true;

      let requestCount = await requestModel.countDocuments({
        studentId: req.user._id,
        courseId: course._id
      });
      let userCount = await userModel.countDocuments({
        userId: req.user._id,
        role: "tutor"
      });
      if (!!requestCount || !!userCount) requestable = false;


      course.startDate = formatDate(course.startDate);
      course.endDate = formatDate(course.endDate);

      course = {
        ...course,
        requestable: requestable
      }

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

        //course[i].startDate = undefined;
        //course[i].endDate = undefined;
        course[i].dayAndStartTime = undefined;
        course[i].dayAndEndTime = undefined;
        course[i].listOfStudentId = undefined;
        // course[i].amountOfStudent = undefined;
        //course[i].createdTime = undefined;
        //course[i].lastModified = undefined;

        course[i] = {
          ...course[i].toObject(),
          tutorName: tutorName
        };
      }
    }
    res.status(200).json(course);
  } else if (studentId != undefined) {
    let course = await requestModel.find({studentId: studentId});
    let s = [];
    //console.log(course);
    console.log("\n\n\n");
    for (i = 0; i < course.length; i++) {
      console.log(course[i].courseId);
      let status = course[i].status;
      console.log("status = "+status)
      let message = "status: ";
      let c = await CourseModel.findById(course[i].courseId,
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
        
      //console.log(s);
    }
     //console.log(s);
    res.status(200).json(s);
    return ;
  } else {
    res.status(404).json("invalid");
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
    if(course!= undefined) {
      console.log(course);
      console.log(course["courseName"]+" "+payload["courseName"]);
      console.log("it's already has this courseName");
      //res.status(400).json(course);
      res.status(400).json("it's already has this courseName");
      return ;
    }
    for(i=0;i<7;i++){
      if(payload["dayAndStartTime"][i]==null && payload["dayAndEndTime"][i]!=null){
        res.status(400).json("StartTime is invalid");
        return ;
      }
      else if(payload["dayAndStartTime"][i]!=null && payload["dayAndEndTime"][i]==null){
        res.status(400).json("EndTime is invalid");
        return ;
      }
      else if (payload["dayAndStartTime"][i] > payload["dayAndEndTime"][i]){
        res.status(400).json("StartTime must be before endTime");
        return ;
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
  } else if(course.tutorId !=req.user._id){
    console.log(course);
    console.log(course.tutorId+" "+req.user._id);
    res.status(400).json("you are not the course owner");
    return ;

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
    for(i=0;i<7;i++){
      if(payload["dayAndStartTime"] != undefined && payload["dayAndEndTime"]!=undefined){
        if(payload["dayAndStartTime"][i]==null && payload["dayAndEndTime"][i]!=null){
          res.status(400).json("StartTime is invalid");
          return ;
        }
        else if(payload["dayAndStartTime"][i]!=null && payload["dayAndEndTime"][i]==null){
          res.status(400).json("EndTime is invalid");
          return ;
        }
        else if (payload["dayAndStartTime"][i] > payload["dayAndEndTime"][i]){
          res.status(400).json("StartTime must be before endTime");
          return ;
        }
      }
      else if(payload["dayAndStartTime"] != undefined){
        if(payload["dayAndStartTime"][i]==null && course["dayAndEndTime"][i]!=null){
          res.status(400).json("StartTime is invalid");
          return ;
        }
        else if(payload["dayAndStartTime"][i]!=null && course["dayAndEndTime"][i]==null){
          res.status(400).json("EndTime is invalid");
          return ;
        }
        else if (payload["dayAndStartTime"][i] > course["dayAndEndTime"][i]){
          res.status(400).json("StartTime must be before endTime");
          return ;
        }
      }
      else if(payload["dayAndEndTime"]!=undefined){
        if(course["dayAndStartTime"][i]==null && payload["dayAndEndTime"][i]!=null){
          res.status(400).json("StartTime is invalid");
          return ;
        }
        else if(course["dayAndStartTime"][i]!=null && payload["dayAndEndTime"][i]==null){
          res.status(400).json("EndTime is invalid");
          return ;
        }
        else if (course["dayAndStartTime"][i] > payload["dayAndEndTime"][i]){
          res.status(400).json("StartTime must be before endTime");
          return ;
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

module.exports = router;
