const express = require("express");
const router = express.Router();
const commentModel = require("./models/comment");
const courseModel = require("./models/course");
const moment = require("moment-timezone");
const format = require("./commonFunc/format")
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
        console.log(err);
        return;
    }

    res.status(200).json(comments).end();
});

router.post("/", async (req, res) => {
    const studentId = req.user._id;
    const courseId = req.body.courseId;
    const text = req.body.text;
    const star = req.body.star;
    const dateThailand = (moment.tz(Date.now(), "Asia/Bangkok")._d);

    if (!text && !star) {
        res.status(400).json({
            err: "No entered comment or star"
        }).end();
        return;
    }

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
        err = await saveComment(studentId, courseId, text, star, dateThailand);
        err = await updateCourseRating("POST", studentId, courseId, star);
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
    const text = req.body.text;
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

    let isAlreadyCommentedR = await checkAlreadyCommented(studentId, courseId);
    err = isAlreadyCommentedR[0];
    let isAlreadyCommented = isAlreadyCommentedR[1];

    if (!isAlreadyCommented) {
        res.status(400).json({
            err: "No comment exists"
        }).end();
        return;
    }

    let isAlreadyRatedR = await checkAlreadyRated(studentId, courseId);
    err = isAlreadyRatedR[0];
    let isAlreadyRated = isAlreadyRatedR[1];

    if (isAlreadyRated && !star) {
        res.status(400).json({
            err: "Already rated, required star"
        }).end();
        return;
    }

    err = await updateCourseRating("PUT", studentId, courseId, star);
    err = await updateComment(studentId, courseId, text, star, dateThailand);

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

    if (isAlreadyCommented) {
        err = await deleteComment(studentId, courseId);
    } else {
        res.status(400).json({
            err: "No comment exists"
        }).end();
        return;
    }

    if (err) {
        res.status(500).end();
        console.log(err);
        return;
    }
    res.status(201).end();
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

async function saveComment(studentId, courseId, text, star, dateThailand) {
    let err;
    let payload = {};
    payload.courseId = courseId;
    payload.studentId = studentId;
    payload.text = text;
    payload.rating = star;
    payload.createdTime = dateThailand;
    payload.lastModified = dateThailand;
    const comment = new commentModel(payload);
    [err, save] = await to(comment.save());
    return err;
}

async function checkAlreadyRated(studentId, courseId) {
    [err, comment] = await to(commentModel.findOne(
        {
            courseId: courseId,
            studentId: studentId
        }
    ));
    return [err, !!comment.rating];
}

async function updateCourseRating(method, studentId, courseId, star) {
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

    if (method == "POST") {
        if (!star) return err;
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
    }
    if (method == "PUT") {
        [err, comment] = await to(commentModel.findOne(
            {
                studentId: studentId,
                courseId: courseId
            },
            {
                rating: 1
            }
        ));
        let averageRatingNew;
        if (!comment.rating) {
            course.numberOfRating += 1;
            averageRatingNew = (course.averageRating + star) / course.numberOfRating;
        } else {
            averageRatingNew = ((course.averageRating * course.numberOfRating) - comment.rating + star) / course.numberOfRating;
        }

        [err, value] = await to(courseModel.findOneAndUpdate(
            {
                _id: courseId
            },
            {
                averageRating: averageRatingNew,
                numberOfRating: course.numberOfRating
            },
            {
                useFindAndModify: false
            }
        ));
    }

    return err;
}

async function findComment(courseId) {
    [err, comments] = await to(commentModel.find(
        { courseId: courseId }
    ).sort({
        lastModified: -1
    }));

    for (let i = 0; i < comments.length; i++) {
        comments[i] = {
            ...comments[i].toObject(),
            createdTimeS: format.formatTimeDate(comments[i].createdTime),
            lastModifiedS: format.formatTimeDate(comments[i].lastModified),
            editable: false
        };
    }
    return [err, comments];
}

async function findCommentOwnCommentTop(userId, courseId) {
    [err, ownComment] = await to(commentModel.findOne(
        {
            courseId: courseId,
            studentId: userId
        }
    ));
    ownComment = {
        ...ownComment.toObject(),
        createdTimeS: format.formatTimeDate(ownComment.createdTime),
        lastModifiedS: format.formatTimeDate(ownComment.lastModified),
        editable: true
    };

    [err, otherComments] = await to(commentModel.find(
        {
            courseId: courseId,
            studentId: { $ne: userId }
        }
    ).sort({
        lastModified: -1
    }));

    for (let i = 0; i < otherComments.length; i++) {
        otherComments[i] = {
            ...otherComments[i].toObject(),
            createdTimeS: format.formatTimeDate(otherComments[i].createdTime),
            lastModifiedS: format.formatTimeDate(otherComments[i].lastModified),
            editable: false
        };
    }

    return [err, [ownComment].concat(otherComments)];
}

async function updateComment(studentId, courseId, text, star, dateThailand) {
    [err, value] = await to(commentModel.findOneAndUpdate(
        {
            studentId: studentId,
            courseId: courseId
        },
        {
            text: text,
            rating: star,
            lastModified: dateThailand
        },
        {
            useFindAndModify: false
        }
    ));
    return err;
}

async function deleteComment(studentId, courseId) {
    [err, value] = await to(
        commentModel.findOneAndUpdate(
            {
                studentId: studentId,
                courseId: courseId
            },
            {
                text: null
            },
            {
                useFindAndModify: false
            }
        )
    );
    return err;
}
module.exports = router;
