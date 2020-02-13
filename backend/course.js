const express = require('express');
const router = express.Router();
const CourseModel = require('./models/course');

router.get('/', async(req,res) => {
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
    else{
        /*for(var k in payload)
            course[0][k] = payload[k];*/
        await CourseModel.updateOne({courseId: payload["courseId"]},{$set: payload});
        res.json("update complete");
    }
    res.status(200).end();
});

module.exports = router;