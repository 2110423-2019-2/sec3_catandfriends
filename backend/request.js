const express = require("express");
const router = express.Router();
const RequestModel = require("./models/request");
const ScheduleModel = require("./models/schedule");
const CourseModel = require("./models/course");
const UserModel = require("./models/user");
const set = require("./commonFunc/set");
const format = require("./commonFunc/format");
const to = require("await-to-js").default;
const moment = require("moment-timezone");

router.get("/", async (req, res) => {
  let tutorId = req.user._id;
  let err;

  let theRequests = await findRequests(tutorId);
  err = theRequests[0];
  let requests = theRequests[1];
  if (err) {
    res.status(500).end();
    return;
  }
  res.status(200).json(requests).end();
});

router.post("/", async (req, res) => {
  const studentId = req.user._id;
  const payload = req.body;
  const courseId = payload.courseId;
  const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
  let err, message;

  let isRequestedR = await checkRequest(studentId, courseId);
  err = isRequestedR[0];
  let isRequested = isRequestedR[1];

  if (!isRequested) {
    let isAvailableR = await checkAvailable(studentId, courseId);
    err = isAvailableR[0];
    let isAvailable = isAvailableR[1];
    if (isAvailable) {
      err = await saveRequest(payload, studentId, dateThailand);
      message = `saved`;
    } else {
      message = `time overlapping`;
    }
  } else {
    message = `requested`;
  }
  if (err) {
    res.status(500).end();
    return;
  }
  res.status(201).json({
    message: message
  }).end();
});

router.put("/", async (req, res) => {
  const payload = req.body;
  const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
  const tutorId = req.user._id;
  const studentId = payload.studentId;
  const courseId = payload.courseId;
  const status = payload.status;

  let err, message;

  let theRequest = await findTheRequest(tutorId, studentId, courseId);
  err = theRequest[0];
  let request = theRequest[1];
  if (request.status == 1) {
    message = "Already response";
  } else {
    let theCourse = await findTheCourse(courseId);
    err = theCourse[0];
    let course = theCourse[1];
    if (course.amountOfStudent > 0) {
      if (status == 1) {
        err = await updateRequest(tutorId, studentId, courseId, dateThailand._d);
        err = await updateSchedule(studentId, courseId, dateThailand._d);
        err = await updateCourse(studentId, courseId, course.amountOfStudent, dateThailand._d);
        message = "Request accepted";
        console.log(message);

      } else if (status == -1) {
        err = await deleteRequest(tutorId, studentId, courseId);
        message = "Request rejected";
      } else { message = `"status" attribute is invalid`; }
    } else {
      await deleteRequest(tutorId, studentId, courseId);
      message = "Course is already full";
    }
  }
  if (err) {
    res.status(500).end();
    return;
  }
  res.status(201).json({
    message: message
  }).end();
});
/////////////////////////////////////////////////////////////////////////////////////////////////////
async function findRequests(tutorId) {
  let err, requests;
  [err, requests] = await to(
    RequestModel.find({ tutorId: tutorId }, { _id: 0, lastModified: 0 })
  );

  for (let i = 0; i < requests.length; i++) {
    let course, user;
    [err, course] = await to(
      CourseModel.findOne({
        _id: requests[i].courseId
      })
    );

    [err, user] = await to(
      UserModel.findOne({
        _id: requests[i].studentId
      })
    );

    requests[i] = {
      ...requests[i].toObject(),
      isAvailable: course.amountOfStudent > 0 ? true : false,
      studentName: user["firstName"] + " " + user["lastName"],
      createdTime: format.formatTimeDate(requests[i].createdTime),
      courseName: course.courseName
    };
  }
  return [err, requests];
}
async function checkRequest(studentId, courseId) {
  let request;
  [err, request] = await to(
    RequestModel.countDocuments({
      studentId: studentId,
      courseId: courseId
    })
  );
  let isRequested = request != 0 ? true : false;
  return [err, isRequested];
}
async function findTheRequest(tutorId, studentId, courseId) {
  let err, request;
  [err, request] = await to(
    RequestModel.findOne({
      tutorId: tutorId,
      studentId: studentId,
      courseId: courseId
    })
  );
  return [err, request];
}
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
async function saveRequest(payload, studentId, dateThailand) {
  let err, course;
  [err, course] = await to(CourseModel.findById(payload.courseId));
  payload.tutorId = course.tutorId;
  payload.studentId = studentId;
  payload.createdTime = dateThailand._d;
  payload.lastModified = dateThailand._d;
  const requests = new RequestModel(payload);
  let save;
  [err, save] = await to(requests.save());
  return err
}
async function findTheCourse(courseId) {
  [err, course] = await to(
    CourseModel.findOne({
      _id: courseId
    })
  );
  return [err, course];
}

async function updateRequest(tutorId, studentId, courseId, dateThailand) {
  [err, value] = await to(
    RequestModel.findOneAndUpdate(
      {
        tutorId: tutorId,
        studentId: studentId,
        courseId: courseId
      },
      {
        status: 1,
        lastModified: dateThailand
      },
      {
        useFindAndModify: false
      }
    )
  );
  return err
}

async function updateSchedule(studentId, courseId, dateThailand) {
  [err, value] = await to(
    ScheduleModel.findOneAndUpdate(
      {
        studentId: studentId
      },
      {
        $push: {
          listOfCourse: courseId
        },
        lastModified: dateThailand
      },
      {
        useFindAndModify: false
      }
    )
  );
  return err
}

async function updateCourse(studentId, courseId, amountOfStudent, dateThailand) {
  [err, value] = await to(
    CourseModel.findOneAndUpdate(
      {
        _id: courseId
      },
      {
        $push: {
          listOfStudentId: studentId
        },
        $inc: {
          amountOfStudent: -1
        },
        lastModified: dateThailand,
        isAvailable: amountOfStudent == 1 ? false : true
      },
      {
        useFindAndModify: false
      }
    )
  );
  return err;
}

async function deleteRequest(tutorId, studentId, courseId) {
  [err, value] = await to(
    RequestModel.deleteOne({
      tutorId: tutorId,
      studentId: studentId,
      courseId: courseId
    })
  );
  return err;
}

module.exports = router;
