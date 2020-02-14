const express = require('express');
const router = express.Router();
const RequestModel = require('./models/request');

router.get('/', async (req, res) => {
    let reqID = req.query.reqID;
    console.log(reqID);
    const requests = await RequestModel.find({});
    console.log(requests);
    res.json(requests);
    res.status(200).end();
});

router.post('/', async (req, res) => {
    const payload = req.body;
    const requests = new RequestModel(payload);
    console.log(requests);

    await requests.save();
    res.status(201).end();
});

router.put('/', (req, res) => {

});



module.exports = router;