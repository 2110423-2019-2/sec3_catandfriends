const express = require('express');
const router = express.Router();
const RequestModel = require('./models/request')
const to = require('await-to-js').default;
const moment = require('moment-timezone');
const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

router.get('/', async (req, res) => {

    let tutorID;
    if (req.query.tutorID == undefined) {
        res.status(400).end();
        throw new Error('No argument error');
    } else {
        tutorID = req.query.tutorID.toString();
    }
    let err, requests;

    [err, requests] = await to(RequestModel.find({
        tutorId: tutorID
    }));
    if (err) {
        res.status(500).end();
        throw new Error('Unexpected error occurred');
    }

    res.json(requests);
    res.status(200).end();
});

router.post('/', async (req, res) => {
    const payload = req.body;
    let err, request;

    [err, request] = await to(RequestModel.countDocuments({
        tutorId: payload.tutorId,
        studentId: payload.studentId,
        courseId: payload.courseId
    }));
    console.log(!request);
    
    if (err) {
        res.status(500).end();
        throw new Error('Unexpected error occurred');
    }
    if (!request) {
        payload.requestId = Date.now() + payload.tutorId;
        //console.log(payload);
        const requests = new RequestModel(payload);
        // console.log(requests);
        let err, save;

        [err, save] = await to(requests.save());
        if (err) {
            res.status(500).end();
            throw new Error('Unexpected error occurred');
        }
        res.status(201).end();
    } else {
        throw new Error('Request existed');
    }

});

router.put('/', (req, res) => {

});



module.exports = router;