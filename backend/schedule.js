const express = require('express');
const router = express.Router();
const ScheduleModel = require('./models/schedule')

router.get('/', async (req, res) => {
    let reqID = req.query.reqID;
    console.log(reqID);
    const schedule = await ScheduleModel.find({studentId: reqID});
    console.log(schedule);
    res.json(schedule);
    res.status(200).end();
});

router.post('/', async (req, res) => {
    const payload = req.body;
    const schedule = new ScheduleModel(payload);
    console.log(schedule);

    await schedule.save();
    res.status(201).end();
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