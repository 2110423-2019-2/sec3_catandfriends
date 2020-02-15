const express = require('express');
const router = express.Router();
const ScheduleModel = require('./models/schedule')
const to = require('await-to-js').default;
//const moment = require('moment-timezone');

router.get('/', async (req, res) => {
    let reqID = req.query.reqID;
    console.log(reqID);
    const schedule = await ScheduleModel.find({});
    console.log(schedule);
    res.json(schedule);
    res.status(200).end();
});

router.post('/', async (req, res) => {
    const payload = req.body;
    let err, schedule;
    //const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
    
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
        //payload.scheduleId = Date.now() + payload.tutorId;
        //payload.createdTime = dateThailand._d;
        //payload.lastModified = dateThailand._d;
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
    const {id} = req.params;
    console.log({id});
    const schedule = await ScheduleModel.findByIdAndUpdate(id, { $set: payload });
    console.log(schedule);
    res.json(schedule);
});

module.exports = router;