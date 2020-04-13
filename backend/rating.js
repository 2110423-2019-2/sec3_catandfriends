const express = require("express");
const router = express.Router();
const courseModel = require("./models/course");
const ratingModel = require("./models/rating");
const to = require("await-to-js").default;
const moment = require("moment-timezone");

router.get("/", async (req, res) => {

});

router.post("/", async (req, res) => {
    const studentId = req.user._id;
    const courseId = req.body.courseId;
    const star = req.body.star;
    const dateThailand = (moment.tz(Date.now(), "Asia/Bangkok")._d);

    let err;
    let isEnrolledR = await checkEnrollment(studentId, courseId);
    err = isEnrolledR[0];
    let isEnrolled = isEnrolledR[1];

    if (!isEnrolled) {
        res.status(400).json({
            err: "Not enrolled"
        }).end();
        return;
    }

    let isAlreadyRatedR = await checkAlreadyRated(studentId, courseId);
    err = isAlreadyRatedR[0];
    let isAlreadyRated = isAlreadyRatedR[1];

    if (!isAlreadyRated) {
        err = await saveRating(studentId, courseId, star, dateThailand);
        err = await updateCourseRating(courseId, star);
    }

    if (err) {
        res.status(500).end();
        console.log(err);
        return;
    }
    res.status(201).end();

});

router.put("/", async (req, res) => {

});

async function checkEnrollment(studentId, courseId) {
    [err, course] = await to(courseModel.findOne(
        { _id: courseId },
        { _id: 0, listOfStudentId: 1 }));
    return [err, course.listOfStudentId.includes(studentId)];
}

async function checkAlreadyRated(studentId, courseId) {
    [err, rating] = await to(ratingModel.findOne(
        {
            courseId: courseId,
            studentId: studentId
        }
    ));
    return [err, !!rating];
}

async function saveRating(studentId, courseId, star, dateThailand) {
    let err;
    let payload = {};
    payload.courseId = courseId;
    payload.studentId = studentId;
    payload.rating = star;
    payload.createdTime = dateThailand;
    payload.lastModified = dateThailand;
    const rating = new ratingModel(payload);
    [err, save] = await to(rating.save());
    return err;
}

async function updateCourseRating(courseId, star) {
    [err, course] = await to(courseModel.findById(courseId,
        {
            averageRating: 1,
            numberOfRating: 1
        }
    ));
    if (!course.averageRating) {
        course.averageRating = 0;
        course.numberOfRating = 0;
    }
    let averageRatingNew = (course.averageRating + star) / (course.numberOfRating + 1);

    [err, value] = await to(courseModel.findOneAndUpdate(
        {
            _id: courseId
        },
        {
            averageRating: averageRatingNew,
            numberOfRating: course.numberOfRating + 1
        },
        {
            useFindAndModify: false
        }
    ));
    return err;
}


module.exports = router;