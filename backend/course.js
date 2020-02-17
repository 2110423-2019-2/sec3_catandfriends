const express = require('express');
const router = express.Router();
const CourseModel = require('./models/course');
const moment = require('moment-timezone');

router.get('/', async(req,res) => {
    let courseId = req.query._id;
    let tutorId = req.query.tutorId;
    let studentId = req.query.studentId;
    // console.log(await CourseModel.find({listOfStudentId:["987654321"]
    // }));
    //console.log(courseId);
    if(courseId != undefined){
        console.log(courseId);
        let course =  await CourseModel.find({ _id: courseId});
        console.log(course);
        if(course == undefined || course.length == 0){
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
    else if (tutorId != undefined) {
        //console.log(req);
        //console.log("print");
        let course = await CourseModel.find({tutorId: tutorId});
        if(course.length == 0){
            var s = "tutor hasn't created any courses"
            console.log(s);
            res.json(s);
        }
        else
            res.json(course);
        res.status(200).end();
    }
    else if (studentId != undefined) {
        console.log(studentId);
        console.log('ajsdkfl');
        let course = await CourseModel.find({});
        let s = [];
        console.log('\n\n\n');
        for(i=0; i<course.length;i++){
            //console.log(CourseModel().type);
            let length = course[i]['listOfStudentId'].length;
            //console.log(course[i]['listOfStudentId']);
            for(j=0;j<length;j++){
                if(course[i]['listOfStudentId'][j] == studentId){
                    //console.log(course[i]);
                    s.push(course[i]);
                    console.log(s);
                    continue;
                }
            }
        }
        console.log(s);
        res.json(s);
        res.status(200).end();
    }
    else{
        
        res.json('invalid');
        course = await CourseModel.find({});
        consol.log(course);
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
    const course =  await CourseModel.find({_id: payload['_id']});
    // console.log(course[0]);
    console.log(payload);
    // console.log(course.length);
    if(course == undefined ||course.length == 0){
        var s = "this course isn't create yet"
        console.log(s);
        res.json(s);
    }
    else if(payload['dayAndTime'] != undefined && payload['dayAndTime'].length != 7){
        console.log('dayAndTime is incorrect');
        res.json('dayAndTime is incorrect');
        res.status(400).end();
        
    }
    else{
        console.log("jasdlkjf");
        const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
        /*for(var k in payload)
            course[0][k] = payload[k];*/
        payload.lastModified = dateThailand._d;
        await CourseModel.updateOne({_id: payload["_id"]},{$set: payload});
        res.json("update complete");
    }
    res.status(201).end();
});

module.exports = router;