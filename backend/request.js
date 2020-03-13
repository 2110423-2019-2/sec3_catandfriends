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
  // console.log(req.query);
  let tutorId = req.user._id;
  let err, requests;

  [err, requests] = await to(
    RequestModel.find({ tutorId: tutorId }, { _id: 0, lastModified: 0 })
  );
  if (err) {
    res.status(500).end();
  }
  // console.log(requests);

  for (let i = 0; i < requests.length; i++) {
    let err, course;
    // console.log(requests[i].studentId);

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
  res.json(requests);
  res.status(200).end();
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
      res.send({ status: 1 });
      res.status(201).end();
    } else {
      res.send({ status: 0 });
      res.status(201).end();
    }

  } else {
    res.send({ status: 1 });
    res.status(201).end();
  }
});

router.put("/", async (req, res) => {
  const payload = req.body;
  let tutorId = req.user._id;
  let err, request;

  // console.log(tutorId + "  " + payload.studentId + "  " + payload.courseId);

  [err, request] = await to(
    RequestModel.findOne({
      tutorId: tutorId,
      studentId: payload.studentId,
      courseId: payload.courseId
    })
  );
  if (err) {
    res.status(500).end();
  }

  if (request.status == 1) {
    res.json({
      message: "Already response"
    });
    res.status(201).end();
  } else {
    let err, course;
    [err, course] = await to(
      CourseModel.findOne({
        _id: payload.courseId
      })
    );
    if (err) {
      res.status(500).end();
    }
    if (course.amountOfStudent > 0) {
      let value;
      const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

      if (payload.status == 1) {
        [err, value] = await to(
          RequestModel.findOneAndUpdate(
            {
              tutorId: tutorId,
              studentId: payload.studentId,
              courseId: payload.courseId
            },
            {
              status: payload.status,
              lastModified: dateThailand._d
            },
            {
              useFindAndModify: false
            }
          )
        );
        if (err) {
          res.status(500).end();
        }

        //TODO: UPDATE LISTOFCOURSE IN SCHEDULE
        [err, value] = await to(
          ScheduleModel.findOneAndUpdate(
            {
              studentId: payload.studentId
            },
            {
              $push: {
                listOfCourse: payload.courseId
              },
              lastModified: dateThailand._d
            },
            {
              useFindAndModify: false
            }
          )
        );
        if (err) {
          res.status(500).end();
        }
        ///////////////////////////////////////////////////////
        //UPDATE AMOUNTOFSTUDENT, LISTOFSTUDENT IN COURSE
        [err, value] = await to(
          CourseModel.findOne({
            _id: payload.courseId
          })
        );
        if (err) {
          res.status(500).end();
        }
        let currentAmountOfStudent = value.amountOfStudent;

        [err, value] = await to(
          CourseModel.findOneAndUpdate(
            {
              _id: payload.courseId
            },
            {
              $push: {
                listOfStudentId: payload.studentId
              },
              amountOfStudent: currentAmountOfStudent - 1,
              lastModified: dateThailand._d
            },
            {
              useFindAndModify: false
            }
          )
        );
        if (err) {
          res.status(500).end();
        }
        ///////////////////////////////////////////////////////
      } else if (payload.status == -1) {
        [err, value] = await to(
          RequestModel.deleteOne({
            tutorId: tutorId,
            studentId: payload.studentId,
            courseId: payload.courseId
          })
        );
      }

      let message;
      if (payload.status == -1) message = "Request rejected";
      else if (payload.status == 1) message = "Reqstatused";
      else message = 'Invastatus" attribute';
      res.json({
        message: message
      });
    } else {
      const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

      [err, value] = await to(
        RequestModel.findOneAndUpdate(
          {
            tutorId: tutorId,
            studentId: payload.studentId,
            courseId: payload.courseId
          },
          {
            status: -1,
            lastModified: dateThailand._d
          },
          {
            useFindAndModify: false
          }
        )
      );
      if (err) {
        res.status(500).end();
      }
      res.json({
        message: "Course is already full"
      });
    }
    res.status(201).end();
  }
});

module.exports = router;
