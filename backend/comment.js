const express = require("express");
const router = express.Router();
const commentModel = require("./models/comment");
const courseModel = require("./models/course");
const moment = require("moment-timezone");
const to = require("await-to-js").default;

router.get("/", async (req, res) => {
    const userId = req.user._id;
    const courseId = req.query.courseId;
    let err, comments;

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
        return;
    }

    res.status(200).json(comments).end();
});

router.post("/", async (req, res) => {
    const studentId = req.user._id;
    const courseId = req.body.courseId;
    const text = req.body.text;
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

    let isAlreadyCommentedR = await checkAlreadyCommented(studentId, courseId);
    err = isAlreadyCommentedR[0];
    let isAlreadyCommented = isAlreadyCommentedR[1];

    if (!isAlreadyCommented) {
        err = await saveComment(studentId, courseId, text, dateThailand);
    }

    if (err) {
        res.status(500).end();
        return;
    }
    res.status(201).end();
});

router.put("/", async (req, res) => {

});

router.delete("/", async (req, res) => {

});

async function checkEnrollment(studentId, courseId) {
    [err, course] = await to(courseModel.findOne(
        { _id: courseId },
        { _id: 0, listOfStudentId: 1 }));
    return [err, course.listOfStudentId.includes(studentId)];
}

async function checkAlreadyCommented(studentId, courseId) {
    [err, comment] = await to(commentModel.findOne(
        {
            courseId: courseId,
            studentId: studentId
        }
    ));
    return [err, !!comment];
}

async function saveComment(studentId, courseId, text, dateThailand) {
    let err;
    let payload = {};
    payload.courseId = courseId;
    payload.studentId = studentId;
    payload.text = text;
    payload.createdTime = dateThailand;
    payload.lastModified = dateThailand;
    const comment = new commentModel(payload);
    [err, save] = await to(comment.save());
    return err;
}

async function findComment(courseId) {
    [err, comments] = await to(commentModel.find(
        { courseId: courseId }
    ).sort({
        lastModified: -1
    }));
    return [err, comments];
}

async function findCommentOwnCommentTop(userId, courseId) {
    [err, ownComments] = await to(commentModel.find(
        {
            courseId: courseId,
            studentId: userId
        }
    ));

    [err, otherComments] = await to(commentModel.find(
        {
            courseId: courseId,
            studentId: { $ne: userId }
        }
    ).sort({
        lastModified: -1
    }));

    return [err, ownComments.concat(otherComments)];
}

module.exports = router;