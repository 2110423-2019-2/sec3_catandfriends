const express = require('express');
const router = express.Router();
const RequestModel = require('./models/request');
const ScheduleModel = require('./models/schedule');
const CourseModel = require('./models/course');
const StudentModel = require('./models/student');
const UserModel = require('./models/user');
const to = require('await-to-js').default;
const moment = require('moment-timezone');

function formatedTime(date) {
    dateS = moment.tz(date, "Asia/Bangkok").format();
    yearMonthDay = dateS.slice(0, 10).split("-");
    dayMonthYear = yearMonthDay.reverse().join("-");
    time = dateS.slice(11, 19);
    return time + " " + dayMonthYear;
}

router.get('/', async (req, res) => {
    // console.log(req.query);
    if (req.query.tutorId == undefined) {
        res.status(400).end();
    } else {
        let err, requests;

        [err, requests] = await to(RequestModel.find(
            { tutorId: req.query.tutorId },
            { _id: 0, lastModified: 0 })
        );
        if (err) {
            res.status(500).end();
        }
        // console.log(requests);

        for (let i = 0; i < requests.length; i++) {
            let err, course;
            // console.log(requests[i].studentId);

            [err, course] = await to(CourseModel.findOne({
                _id: requests[i].courseId
            }));
            if (err) {
                res.status(500).end();
            }

            [err, user] = await to(UserModel.findOne({
                _id: requests[i].studentId
            }));
            if (err) {
                res.status(500).end();
            }

            requests[i] = {
                ...requests[i].toObject(),
                isAvailable: (course.amountOfStudent > 0 ? true : false),
                studentName: (user['firstName'] + " " + user['lastName']),
                createdTime: (formatedTime(requests[i].createdTime))
            }
        }
        res.json(requests);
        res.status(200).end();
    }
});

router.post('/', async (req, res) => {
    const payload = req.body;
    let err, request;
    const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

    [err, request] = await to(RequestModel.countDocuments({
        tutorId: payload.tutorId,
        studentId: payload.studentId,
        courseId: payload.courseId
    }));

    if (err) {
        res.status(500).end();
    }
    if (!request) {
        // payload.requestId = Date.now() + payload.tutorId;
        payload.createdTime = dateThailand._d;
        payload.lastModified = dateThailand._d;
        const requests = new RequestModel(payload);
        let err, save;

        [err, save] = await to(requests.save());
        if (err) {
            res.status(500).end();
        }
        res.status(201).end();
    } else {
        res.status(201).end();
    }

});

router.put('/', async (req, res) => {
    const payload = req.body;
    let err, request;

    [err, request] = await to(RequestModel.findOne({
        tutorId: payload.tutorId,
        studentId: payload.studentId,
        courseId: payload.courseId
    }));
    if (err) {
        res.status(500).end();
    }

    if (request.status != 0) {
        res.json({
            'message': "Already response",
            'operation': ""
        });
        res.status(201).end();
    } else {
        let err, course;
        [err, course] = await to(CourseModel.findOne({
            _id: payload.courseId
        }));
        if (err) {
            res.status(500).end();
        }
        if (course.amountOfStudent > 0) {
            let value;
            const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

            let status = payload.accept;

            [err, value] = await to(RequestModel.findOneAndUpdate({
                tutorId: payload.tutorId,
                studentId: payload.studentId,
                courseId: payload.courseId
            }, {
                status: status,
                lastModified: dateThailand._d
            }, {
                useFindAndModify: false
            }));
            if (err) {
                res.status(500).end();
            }
            if (status == 1) {
                //TODO: UPDATE LISTOFCOURSE IN SCHEDULE
                [err, value] = await to(ScheduleModel.findOneAndUpdate({
                    studentId: payload.studentId
                }, {
                    $push: {
                        listOfCourse: payload.courseId
                    },
                    lastModified: dateThailand._d
                }, {
                    useFindAndModify: false
                }));
                if (err) {
                    res.status(500).end();
                }
                ///////////////////////////////////////////////////////
                //UPDATE AMOUNTOFSTUDENT, LISTOFSTUDENT IN COURSE
                [err, value] = await to(CourseModel.findOne({
                    _id: payload.courseId
                }));
                if (err) {
                    res.status(500).end();
                }
                let currentAmountOfStudent = value.amountOfStudent;

                [err, value] = await to(CourseModel.findOneAndUpdate({
                    _id: payload.courseId
                }, {
                    $push: {
                        listOfStudentId: payload.studentId
                    },
                    amountOfStudent: currentAmountOfStudent - 1,
                    lastModified: dateThailand._d
                }, {
                    useFindAndModify: false
                }));
                if (err) {
                    res.status(500).end();
                }
                ///////////////////////////////////////////////////////
            }
            let message = status == 1 ? "Request accepted" : "Request rejected";
            res.json({
                'message': message,
                'operation': ""
            });
        } else {
            const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

            [err, value] = await to(RequestModel.findOneAndUpdate({
                tutorId: payload.tutorId,
                studentId: payload.studentId,
                courseId: payload.courseId
            }, {
                status: -1,
                lastModified: dateThailand._d
            }, {
                useFindAndModify: false
            }));
            if (err) {
                res.status(500).end();
            }
            res.json({
                'message': "Course is already full",
                'operation': "Auto reject"
            });
        }
        res.status(201).end();
    }
});



module.exports = router;