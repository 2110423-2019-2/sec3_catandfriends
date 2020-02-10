const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const RequestModel = require('./models/request')

router.get('/', async (req, res) => {
    // try {
    // const connection = await connection();
    //connectToDatabase();
    const requests = await RequestModel.find({});
    console.log(requests);
    res.json(requests);
    res.status(200).end();
    // // } catch (error) {
    //     if (error == "Conection Failed") {
    //         res.send("Connect to database failed.");
    //         res.status(200).end();
    //     }
    // }
});

router.post('/', async (req, res) => {
    // try {
    const payload = req.body;
    const requests = new RequestModel(payload);
    console.log(requests);
    // const connection = await connection();
    //connectToDatabase();
    await requests.save();
    res.status(201).end();
    // // } catch (error) {
    //     if (error == "Conection Failed") {
    //         res.send("Connect to database failed.");
    //         res.status(201).end();
    //     }
    // }
});

router.put('/', (req, res) => {

});



module.exports = router;