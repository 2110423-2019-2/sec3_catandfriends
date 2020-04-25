const express = require("express");
const router = express.Router();
const commentModel = require("./models/comment");
const courseModel = require("./models/course");
const userModel = require("./models/user");
const moment = require("moment-timezone");
const format = require("./commonFunc/format");
const to = require("await-to-js").default;

const MAX_TOPIC_LENGTH = 50;
const MAX_TEXT_LENGTH = 150;

router.get("/", async (req, res) => {
  const userId = req.user._id;
  const courseId = req.query.courseId;
  let err, comments;
  if (!courseId) {
    res
      .status(400)
      .json({
        err: "No input courseId",
      })
      .end();
    return;
  }
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

  let isAlreadyCommentedR = await checkAlreadyCommented(userId, courseId);
  err = isAlreadyCommentedR[0];
  let isAlreadyCommented = isAlreadyCommentedR[1];

  if (isAlreadyCommented) {
    commentsR = await findCommentOwnCommentTop(userId, courseId);
    err = commentsR[0];
    comments = commentsR[1];
  } else {
    commentsR = await findComment(courseId);
    err = commentsR[0];
    comments = commentsR[1];
  }

  if (err) {
    res.status(500).end();
    console.log(err);
    return;
  }

  res.status(200).json(comments).end();
});

router.get("/myComment", async (req, res) => {
  const userId = req.user._id;
  const courseId = req.query.courseId;
  let err, comments;
  if (!courseId) {
    res
      .status(400)
      .json({
        err: "No input courseId",
      })
      .end();
    return;
  }

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

  let isAlreadyCommentedR = await checkAlreadyCommented(userId, courseId);
  err = isAlreadyCommentedR[0];
  let isAlreadyCommented = isAlreadyCommentedR[1];

  if (isAlreadyCommented) {
    commentsR = await findMyComment(userId, courseId);
    err = commentsR[0];
    comments = commentsR[1];
  } else {
    comments = { isCommented: false };
  }

  if (err) {
    res.status(500).end();
    console.log(err);
    return;
  }

  res.status(200).json(comments).end();
});

router.post("/", async (req, res) => {
  const studentId = req.user._id;
  const courseId = req.body.courseId;
  const topic = req.body.topic;
  const text = req.body.text;
  const star = req.body.star;
  const dateThailand = moment.tz(Date.now(), "Asia/Bangkok")._d;
  let err;

  if (!courseId) {
    res
      .status(400)
      .json({
        err: "No input courseId",
      })
      .end();
    return;
  }

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
  let isValidInputR = await checkPostInput(topic, text, star);
  err = isValidInputR[0];
  let isValidInput = isValidInputR[1];
  let invalidInputMessage = isValidInputR[2];

  if (!isValidInput) {
    res
      .status(400)
      .json({
        err: invalidInputMessage,
      })
      .end();
    return;
  }

  let isEnrolledR = await checkEnrollment(studentId, courseId);
  err = isEnrolledR[0];
  let isEnrolled = isEnrolledR[1];

  if (!isEnrolled) {
    res
      .status(400)
      .json({
        err: "Not enrolled",
      })
      .end();
    return;
  }

  let isAlreadyCommentedR = await checkAlreadyCommented(studentId, courseId);
  err = isAlreadyCommentedR[0];
  let isAlreadyCommented = isAlreadyCommentedR[1];

  if (!isAlreadyCommented) {
    err = await updateCourseRating("POST", studentId, courseId, star);
    err = await saveComment(
      studentId,
      courseId,
      topic,
      text,
      star,
      dateThailand
    );
  }

  if (err) {
    res.status(500).end();
    console.log(err);
    return;
  }
  res.status(201).end();
});

router.put("/", async (req, res) => {
  const studentId = req.user._id;
  const courseId = req.body.courseId;
  const topic = req.body.topic;
  const text = req.body.text;
  const star = req.body.star;
  const dateThailand = moment.tz(Date.now(), "Asia/Bangkok")._d;
  let err;

  if (!courseId) {
    res
      .status(400)
      .json({
        err: "No input courseId",
      })
      .end();
    return;
  }
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

  let isValidInputR = await checkPutInput(topic, text, star);
  err = isValidInputR[0];
  let isValidInput = isValidInputR[1];
  let invalidInputMessage = isValidInputR[2];

  if (!isValidInput) {
    res
      .status(400)
      .json({
        err: invalidInputMessage,
      })
      .end();
    return;
  }

  let isEnrolledR = await checkEnrollment(studentId, courseId);
  err = isEnrolledR[0];
  let isEnrolled = isEnrolledR[1];

  if (!isEnrolled) {
    res
      .status(400)
      .json({
        err: "Not enrolled",
      })
      .end();
    return;
  }

  let isAlreadyCommentedR = await checkAlreadyCommented(studentId, courseId);
  err = isAlreadyCommentedR[0];
  let isAlreadyCommented = isAlreadyCommentedR[1];

  if (!isAlreadyCommented) {
    res
      .status(400)
      .json({
        err: "No comment exists",
      })
      .end();
    return;
  }

  let isAlreadyRatedR = await checkAlreadyRated(studentId, courseId);
  err = isAlreadyRatedR[0];
  let isAlreadyRated = isAlreadyRatedR[1];

  if (isAlreadyRated && !star) {
    res
      .status(400)
      .json({
        err: "Already rated, required star",
      })
      .end();
    return;
  }

  err = await updateCourseRating("PUT", studentId, courseId, star);
  err = await updateComment(
    studentId,
    courseId,
    topic,
    text,
    star,
    dateThailand
  );

  if (err) {
    res.status(500).end();
    console.log(err);
    return;
  }
  res.status(201).end();
});

router.delete("/", async (req, res) => {
  const studentId = req.user._id;
  const courseId = req.query.courseId;
  let err;

  if (!courseId) {
    res
      .status(400)
      .json({
        err: "No input courseId",
      })
      .end();
    return;
  }
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

  let isEnrolledR = await checkEnrollment(studentId, courseId);
  err = isEnrolledR[0];
  let isEnrolled = isEnrolledR[1];

  if (!isEnrolled) {
    res
      .status(400)
      .json({
        err: "Not enrolled",
      })
      .end();
    return;
  }

  let isAlreadyCommentedR = await checkAlreadyCommented(studentId, courseId);
  err = isAlreadyCommentedR[0];
  let isAlreadyCommented = isAlreadyCommentedR[1];

  if (isAlreadyCommented) {
    err = await updateCourseRating("DELETE", studentId, courseId, null);
    err = await deleteComment(studentId, courseId);
  } else {
    res
      .status(400)
      .json({
        err: "No comment exists",
      })
      .end();
    return;
  }

  if (err) {
    res.status(500).end();
    console.log(err);
    return;
  }
  res.status(201).end();
});

async function checkPostInput(topic, text, star) {
  let err, msg;
  let isValid = true;

  if (!topic || !text || !star) {
    msg = "All of topic, text, and star must be filled";
    isValid = false;
  }
  if (topic) {
    if (topic.length > MAX_TOPIC_LENGTH) {
      msg = `Topic is exceeding ${MAX_TOPIC_LENGTH} characters`;
      isValid = false;
    }
  }
  if (text) {
    if (text.length > MAX_TEXT_LENGTH) {
      msg = `Text is exceeding ${MAX_TEXT_LENGTH} characters`;
      isValid = false;
    }
  }
  if (star) {
    if (star < 0 || star > 5) {
      msg = "Star must be 0-5";
      isValid = false;
    }
    star = star.toString();
    let p = (parseFloat(star.slice(0, 3)) * 10) % 5;

    if (star.length > 3) {
      msg = "Star must have 0.5 precision";
      isValid = false;
    } else if (!!p) {
      msg = "Star must have 0.5 precision";
      isValid = false;
    }
  }
  return [err, isValid, msg];
}

async function checkPutInput(topic, text, star) {
  let err, msg;
  let isValid = true;

  if (!star) {
    msg = "star must be filled";
    isValid = false;
  }
  if (topic) {
    if (topic.length > MAX_TOPIC_LENGTH) {
      msg = `Topic is exceeding ${MAX_TOPIC_LENGTH} characters`;
      isValid = false;
    }
  }
  if (text) {
    if (text.length > MAX_TEXT_LENGTH) {
      msg = `Text is exceeding ${MAX_TEXT_LENGTH} characters`;
      isValid = false;
    }
  }
  if (star) {
    if (star < 0 || star > 5) {
      msg = "Star must be 0-5";
      isValid = false;
    }
    star = star.toString();
    let p = (parseFloat(star.slice(0, 3)) * 10) % 5;

    if (star.length > 3) {
      msg = "Star must have 0.5 precision";
      isValid = false;
    } else if (!!p) {
      msg = "Star must have 0.5 precision";
      isValid = false;
    }
  }
  return [err, isValid, msg];
}

async function checkHaveCourse(courseId) {
  [err, course] = await to(courseModel.findOne({ _id: courseId }, { _id: 1 }));
  return [err, !!course];
}

async function checkEnrollment(studentId, courseId) {
  [err, course] = await to(
    courseModel.findOne({ _id: courseId }, { _id: 0, listOfStudentId: 1 })
  );
  return [err, course.listOfStudentId.includes(studentId)];
}

async function checkAlreadyCommented(studentId, courseId) {
  [err, comment] = await to(
    commentModel.findOne({
      courseId: courseId,
      studentId: studentId,
    })
  );
  return [err, !!comment];
}

async function saveComment(
  studentId,
  courseId,
  topic,
  text,
  star,
  dateThailand
) {
  let err;
  let payload = {};
  payload.courseId = courseId;
  payload.studentId = studentId;
  payload.topic = topic;
  payload.text = text;
  payload.rating = star;
  payload.createdTime = dateThailand;
  payload.lastModified = dateThailand;
  const comment = new commentModel(payload);
  [err, save] = await to(comment.save());
  return err;
}

async function checkAlreadyRated(studentId, courseId) {
  [err, comment] = await to(
    commentModel.findOne({
      courseId: courseId,
      studentId: studentId,
    })
  );
  return [err, !!comment.rating];
}

async function updateCourseRating(method, studentId, courseId, star) {
  if (method == "POST") {
    [err, value] = await to(
      courseModel.findOneAndUpdate(
        { _id: courseId },
        {
          $inc: {
            sumOfRating: star,
            numberOfRating: 1,
          },
        },
        { useFindAndModify: false }
      )
    );
  }
  if (method == "PUT") {
    [err, comment] = await to(
      commentModel.findOne(
        {
          studentId: studentId,
          courseId: courseId,
        },
        { rating: 1 }
      )
    );

    [err, value] = await to(
      courseModel.findOneAndUpdate(
        { _id: courseId },
        {
          $inc: {
            sumOfRating: -comment.rating + star,
          },
        },
        { useFindAndModify: false }
      )
    );
  }
  if (method == "DELETE") {
    [err, comment] = await to(
      commentModel.findOne(
        {
          studentId: studentId,
          courseId: courseId,
        },
        { rating: 1 }
      )
    );

    [err, value] = await to(
      courseModel.findOneAndUpdate(
        { _id: courseId },
        {
          $inc: {
            sumOfRating: -comment.rating,
            numberOfRating: -1,
          },
        },
        { useFindAndModify: false }
      )
    );
  }

  return err;
}

async function findComment(courseId) {
  [err, comments] = await to(
    commentModel
      .find({
        courseId: courseId,
      })
      .sort({
        lastModified: -1,
      })
  );

  for (let i = 0; i < comments.length; i++) {
    let studentId = comments[i].studentId;
    let studentInfo;
    [err, studentInfo] = await to(
      userModel.findById(studentId, {
        _id: 0,
        firstName: 1,
        lastName: 1,
      })
    );

    comments[i] = {
      studentName: studentInfo.firstName + " " + studentInfo.lastName,
      ...comments[i].toObject(),
      createdTimeS: format.formatTimeDate(comments[i].createdTime),
      lastModifiedS: format.formatTimeDate(comments[i].lastModified),
      editable: false,
    };
  }
  return [err, comments];
}

async function findMyComment(userId, courseId) {
  [err, myComment] = await to(
    commentModel.findOne({
      courseId: courseId,
      studentId: userId,
    })
  );
  let studentId = userId;
  let studentInfo;
  [err, studentInfo] = await to(
    userModel.findById(studentId, {
      _id: 0,
      firstName: 1,
      lastName: 1,
    })
  );
  myComment = {
    studentName: studentInfo.firstName + " " + studentInfo.lastName,
    ...myComment.toObject(),
    createdTimeS: format.formatTimeDate(myComment.createdTime),
    lastModifiedS: format.formatTimeDate(myComment.lastModified),
    isCommented: true,
  };

  return [err, myComment];
}

async function findCommentOwnCommentTop(userId, courseId) {
  [err, ownComment] = await to(
    commentModel.findOne({
      courseId: courseId,
      studentId: userId,
    })
  );
  if (ownComment) {
    let studentId = ownComment.studentId;
    let studentInfo;
    [err, studentInfo] = await to(
      userModel.findById(studentId, {
        _id: 0,
        firstName: 1,
        lastName: 1,
      })
    );
    ownComment = {
      studentName: studentInfo.firstName + " " + studentInfo.lastName,
      ...ownComment.toObject(),
      createdTimeS: format.formatTimeDate(ownComment.createdTime),
      lastModifiedS: format.formatTimeDate(ownComment.lastModified),
      editable: true,
    };
    ownComment = [ownComment];
  } else {
    ownComment = [];
  }

  [err, otherComments] = await to(
    commentModel
      .find({
        courseId: courseId,
        studentId: { $ne: userId },
      })
      .sort({
        lastModified: -1,
      })
  );

  for (let i = 0; i < otherComments.length; i++) {
    let studentId = otherComments[i].studentId;
    let studentInfo;
    [err, studentInfo] = await to(
      userModel.findById(studentId, {
        _id: 0,
        firstName: 1,
        lastName: 1,
      })
    );
    otherComments[i] = {
      studentName: studentInfo.firstName + " " + studentInfo.lastName,
      ...otherComments[i].toObject(),
      createdTimeS: format.formatTimeDate(otherComments[i].createdTime),
      lastModifiedS: format.formatTimeDate(otherComments[i].lastModified),
      editable: false,
    };
  }

  return [err, ownComment.concat(otherComments)];
}

async function updateComment(
  studentId,
  courseId,
  topic,
  text,
  star,
  dateThailand
) {
  let updateQuery = { lastModified: dateThailand };
  updateQuery.topic = topic;
  updateQuery.text = text;
  updateQuery.rating = star;

  [err, value] = await to(
    commentModel.findOneAndUpdate(
      {
        studentId: studentId,
        courseId: courseId,
      },
      updateQuery,
      {
        useFindAndModify: false,
      }
    )
  );
  return err;
}

async function deleteComment(studentId, courseId) {
  [err, value] = await to(
    commentModel.findOneAndDelete({
      studentId: studentId,
      courseId: courseId,
    })
  );
  return err;
}
module.exports = router;
