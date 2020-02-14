const express = require('express');
const router = express.Router();
const RequestModel = require('./models/request');
const ScheduleModel = require('./models/schedule');
const to = require('await-to-js').default;
const moment = require('moment-timezone');

router.get('/', async (req, res) => {

    let tutorID;
    if (req.query.tutorID == undefined) {
        res.status(400).end();
    } else {
        tutorID = req.query.tutorID.toString();
    }
    let err, requests;

    [err, requests] = await to(RequestModel.find({
        tutorId: tutorID
    }));
    if (err) {
        res.status(500).end();
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
        payload.requestId = Date.now() + payload.tutorId;
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
        //TOdO: UPDATE AMOUNTOFSTUDENT, LISTOFSTUDENT IN COURSE
        ///////////////////////////////////////////////////////
        res.status(201).end();
    }
});



module.exports = router;