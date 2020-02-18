const express = require('express');
const router = express.Router();
const RequestModel = require('./models/request');
const ScheduleModel = require('./models/schedule');
const CourseModel = require('./models/course');
const to = require('await-to-js').default;
const moment = require('moment-timezone');

router.get('/', async (req, res) => {

    console.log(req.query);
    
    let tutorId;
    if (req.query.tutorId == undefined) {
        res.status(400).end();
    } else {
        tutorId = req.query.tutorId.toString();
    }
    let err, query;

    [err, requests] = await to(RequestModel.find({
        tutorId: tutorId
    }));
    if (err) {
        res.status(500).end();
    }

    requests = [];
    for (let i = 0; i < query.length; i++) {
        let err, value;

        [err, value] = await to(CourseModel.findOne({
            courseId: query[i].courseId
        }));
        if (err) {
            res.status(500).end();
        }

        let studentId, studentName, requestId, createdTime, isAvailable;
        studentId = query[i].studentId;
        requestId = query[i].requestId;
        createdTime = query[i].createdTime;

        studentName = ""; //waiting for profile
        isAvailable = value.amountOfStudent > 0 ? true:false;

        aRequest = { 
            studentId: studentId, 
            studentName: studentName , 
            requestId: requestId, 
            createdTime: createdTime, 
            isAvailable: isAvailable
        }

        requests.push(aRequest);
    }
    
    res.json(requests);
    res.status(200).end();
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
    if (request.status) {
        res.status(201).end();
    } else {
        let err, value;
        const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

        [err, value] = await to(RequestModel.findOneAndUpdate({
            tutorId: payload.tutorId,
            studentId: payload.studentId,
            courseId: payload.courseId
        }, {
            status: true,
            lastModified: dateThailand._d
        }, {
            useFindAndModify: false
        }));
        if (err) {
            res.status(500).end();
        }

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
        //TODO: UPDATE LISTOFCOURSE IN SCHEDULE
        [err, value] = await to(ScheduleModel.findOne({
            studentId: payload.studentId
        }));
        if (err) {
            res.status(500).end();
        }
        if (!value.listOfCourse.includes(payload.courseId)) {
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
        }
        ///////////////////////////////////////////////////////
        //UPDATE AMOUNTOFSTUDENT, LISTOFSTUDENT IN COURSE
        [err, value] = await to(CourseModel.findOne({
            courseId: payload.courseId
        }));
        if (err) {
            res.status(500).end();
        }
        let currentAmountOfStudent = value.amountOfStudent;

        [err, value] = await to(CourseModel.findOneAndUpdate({
            courseId: payload.courseId
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
        res.status(201).end();
    }
});



module.exports = router;