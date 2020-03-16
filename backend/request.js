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
  let err, requests;

  [err, requests] = await to(
    RequestModel.find({ tutorId: tutorId }, { _id: 0, lastModified: 0 })
  );
  if (err) {
    res.status(500).end();
  }

  for (let i = 0; i < requests.length; i++) {
    let err, course;

    [err, course] = await to(
      CourseModel.findOne({
        _id: requests[i].courseId
      })
    );
    if (err) {
      res.status(500).end();
    }

    [err, user] = await to(
      UserModel.findOne({
        _id: requests[i].studentId
      })
    );
    if (err) {
      res.status(500).end();
    }

    requests[i] = {
      ...requests[i].toObject(),
      isAvailable: course.amountOfStudent > 0 ? true : false,
      studentName: user["firstName"] + " " + user["lastName"],
      createdTime: format.formatTimeDate(requests[i].createdTime),
      courseName: course.courseName
    };
  }
  res.status(200).json(requests).end();
});

router.post("/", async (req, res) => {
  let studentId = req.user._id;
  let payload = req.body;
  // payload.studentId = req.user._id;
  // console.log(studentId + "  " + payload.courseId);

  let err, request;
  const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

  [err, request] = await to(
    RequestModel.countDocuments({
      studentId: studentId,
      courseId: payload.courseId
    })
  );

  if (err) {
    console.log(err);
    res.status(500).end();
  }
  if (!request) {
    // payload.requestId = Date.now() + payload.tutorId;
    let course;
    [err, course] = await to(CourseModel.findById(payload.courseId));

    if (err) {
      console.log(err);
      res.status(500).end();
    }

    let courses;
    [err, courses] = await to(ScheduleModel.findOne({
      studentId: studentId
    }, {
      _id: 0,
      studentId: 0,
      createdDate: 0,
      lastModified: 0
    }));
    if (err) {
      console.log(err);
      res.status(500).end();
    }
    // console.log(courses);

    //check overlapping//
    let listOfCourse = courses.listOfCourse;
    // console.log(listOfCourse);
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
        console.log(a);
        console.log(b);
        if (set.isIntersect(a, b)) available = false;
      }
    }
    console.log(available);
    /////////////////////

    if (available) {
      payload.tutorId = course.tutorId;
      payload.studentId = studentId;
      payload.createdTime = dateThailand._d;
      payload.lastModified = dateThailand._d;

      const requests = new RequestModel(payload);
      let save;

      [err, save] = await to(requests.save());
      if (err) {
        console.log(err);
        res.status(500).end();
      }
      res.status(201).send({ status: 1 }).end();
    } else {
      res.status(201).send({ status: 0 }).end();
    }
  } else {
    res.status(201).send({ status: 1 }).end();
  }
});

router.put("/", async (req, res) => {
  const payload = req.body;
  let tutorId = req.user._id;
  let studentId = payload.studentId;
  let courseId = payload.courseId;
  let status = payload.status;
  let err;
  let message;

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
      const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

      if (status == 1) {
        err = await updateRequest(tutorId, studentId, courseId, dateThailand._d);
        err = await updateSchedule(studentId, courseId, dateThailand._d);
        err = await updateCourse(studentId, courseId, dateThailand._d);
        message = "Request accepted";
      } else if (status == -1) {
        err = await deleteRequest(tutorId, studentId, courseId);
        message = "Request rejected";
      } else { message = '"status" attribute is invalid'; }

    } else {
      await deleteRequest(tutorId, studentId, courseId);
      message = "Course is already full";
    }
  }
  res.status(201).json({
    message: message
  }).end();
});
/////////////////////////////////////////////////////////////////////////////////////////////////////
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

async function updateCourse(studentId, courseId, dateThailand) {
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
        lastModified: dateThailand
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
