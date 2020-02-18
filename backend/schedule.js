const express = require('express');
const router = express.Router();
const ScheduleModel = require('./models/schedule')
const to = require('await-to-js').default;
const moment = require('moment-timezone');

router.get('/', async (req, res) => {
    let studentId = req.query.studentId;
    console.log(studentId);
    const schedule = await ScheduleModel.find({studentId: studentId});
    console.log(schedule);
    res.json(schedule);
    res.status(200).end();
});

router.post('/', async (req, res) => {
    const payload = req.body;
    let err, schedule;
    const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
    [err, schedule] = await to(ScheduleModel.countDocuments({
        scheduleId: payload.scheduleId,
        studentId: payload.studentId,
        listOfCourse: payload.listOfCourse
    }));
    console.log(payload);
    if (err) {
        res.status(500).end();
        throw new Error('Unexpected error occurred');
    }
    if (!schedule) {
        payload.createdDate = dateThailand._d;
        payload.lastModified = dateThailand._d;
        const schedules = new ScheduleModel(payload);
        let err, save;

        [err, save] = await to(schedules.save());
        if (err) {
            res.status(500).end();
            throw new Error('Unexpected error occurred');
        }
        res.status(201).end();
    } else {
        res.status(201).end();
        throw new Error('Request existed');
    }
});

router.put('/', async (req, res) => {
    const payload = req.body;
    let err, schedule;

    [err, schedule] = await to(ScheduleModel.countDocuments({
        scheduleId: payload.scheduleId,
        studentId: payload.studentId,
        listOfCourse: payload.listOfCourse
    }));

    if (err) {
        res.status(500).end();
        throw new Error('Unexpected error occurred');
    }
    if (!schedule) {
        throw new Error('Request does not existed');
    } else {
        let err, save;
        const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
        
        [err, save] = await to(RequestModel.findOneAndUpdate({
            scheduleId: payload.scheduleId,
            studentId: payload.studentId,
            listOfCourse: payload.listOfCourse
        }, {
            status: true,
            lastModified: dateThailand._d
        }, { 
            useFindAndModify: false 
        }));
        if (err) {
            res.status(500).end();
            throw new Error('Unexpected error occurred');
        }
        res.status(200).end();
    }
});

module.exports = router;