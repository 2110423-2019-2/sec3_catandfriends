const express = require('express');
const router = express.Router();
const CourseModel = require('./models/course');
const moment = require('moment-timezone');

router.get('/', async(req,res) => {
    let courseId = req.query.courseId;
    let tutorId = req.query.tutorId;
    let studentId = req.query.studentId;

    if(courseId != undefined){
        console.log(courseId);
        let course =  await CourseModel.find({courseId: courseId});
        if(course.length == 0){
            var s = "this course hasn't been created yet"
            console.log(s);
            res.json(s);
        }
        else{
            console.log(course);
            res.json(course);
        }
        res.status(200).end();
    }
    if (tutorId != undefined) {
        
        course = await CourseModel.find({tutorId: tutorId});
        if(course.length == 0){
            var s = "tutor hasn't created any courses"
            console.log(s);
            res.json(s);
        }
        else
            res.json(course);
        res.status(200).end();
    }
    if (studentId != undefined) {
        
        course = await CourseModel.find({studentId: studentId});
        if(course.length == 0){
            var s = "student hasn't enrolled any courses"
            console.log(s);
            res.json(s);
        }
        else
            res.json(course);
        res.status(200).end();
    }
    else{
        res.json('invalid');
        res.status(404).end();
    }
    
});

router.post('/',async(req,res)=>{
    const payload = req.body;
    const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
    payload.createdTime = dateThailand._d;
    payload.lastModified = dateThailand._d;
    if(payload['dayAndTime'].length!=7){
        console.log('dayAndTime is incorrect');
        res.json('dayAndTime is incorrect');
        res.status(400).end();
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
        console.log('dayAndTime is incorrect');
        res.json('dayAndTime is incorrect');
        res.status(400).end();
        
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