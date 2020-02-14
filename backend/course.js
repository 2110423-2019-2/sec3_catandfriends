const express = require('express');
const router = express.Router();
const CourseModel = require('./models/course');
const moment = require('moment-timezone');

router.get('/', async(req,res) => {
    if (req.query.tutorID == undefined) {
        res.status(400).end();
        throw new Error('No received argument');
    }
    let courseId = req.query.courseId;
    console.log(courseId);
    const course =  await CourseModel.find({courseId: courseId});
    if(Object.keys(course).length === 0){
        var s = "this course isn't create yet"
        console.log(s);
        res.json(s);
    }
        
    else{
        console.log(course);
        res.json(course);
    }
    res.status(200).end;
});

router.post('/',async(req,res)=>{
    const payload = req.body;
    const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
    payload.createdTime = dateThailand._d;
    payload.lastModified = dateThailand._d;
    if(payload['dayAndTime'].length!=7){
        res.json('dayAndTime is incorrect');
        res.status(400).end();
        throw new Error('dayAndTime is incorrect');
    }
    const courses = new CourseModel(payload);
    console.log(courses);
    await courses.save();
    res.status(201).end();
});

router.put('/',async(req,res)=>{
    const payload = req.body;
    const course =  await CourseModel.find({courseId: payload["courseId"]});
    //console.log(course[0]);
    //console.log(payload);
    if(Object.keys(course).length === 0){
        var s = "this course isn't create yet"
        console.log(s);
        res.json(s);
    }
    else if(payload['dayAndTime'].length!=7){
        res.json('dayAndTime is incorrect');
        res.status(400).end();
        throw new Error('dayAndTime is incorrect');
    }
    else{
        const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
        /*for(var k in payload)
            course[0][k] = payload[k];*/
        payload.lastModified = dateThailand._d;
        await CourseModel.updateOne({courseId: payload["courseId"]},{$set: payload});
        res.json("update complete");
    }
    res.status(201).end();
});

module.exports = router;