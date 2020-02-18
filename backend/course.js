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
    let total_course=[];
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
            total_course =course;
        }
    }
    else if (tutorId != undefined) {
        //console.log(req);
        //console.log("print");
        let course = await CourseModel.find({tutorId: tutorId});
        total_course  = []
        if(course.length == 0){
            var s = "tutor hasn't created any courses"
            console.log(s);
            res.json(s);
        }
        else
            total_course =course;
    }
    else if (studentId != undefined) {
        console.log(studentId);
        console.log('ajsdkfl');
        let course = await CourseModel.find({});
        console.log('\n\n\n');
        for(i=0; i<course.length;i++){
            //console.log(CourseModel().type);
            let length = course[i]['listOfStudentId'].length;
            //console.log(course[i]['listOfStudentId']);
            for(j=0;j<length;j++){
                if(course[i]['listOfStudentId'][j] == studentId){
                    //console.log(course[i]);
                    total_course.push(course[i]);
                    continue;
                }
            }
        }
    }
    else{
        
        res.json('invalid');
        course = await CourseModel.find({});
        console.log(course);
        res.status(404).end();
    }
    if(courseId!=undefined||studentId!=undefined||tutorId!=undefined){
        for(i=0;i<total_course.length;i++){
            let s="";
            for(j=0;j<7;j++){
                if(total_course[i]['dayAndStartTime'][j]== null ) continue;
                if(j==0) s+="Mon ";
                else if(j==1) s+="Tue ";
                else if (j==2) s+="Wed ";
                else if (j==3) s+="Thu ";
                else if (j==4) s+="Fri ";
                else if (j==5) s+="Sat ";
                else if (j==6) s+="Sun ";
                s+=total_course[i]['dayAndStartTime'][j]+":00-"+total_course[i]['dayAndEndTime'][j]+":00/ ";
            }
            total_course[i]['dayAndStartTime']=undefined;
            total_course[i]['dayAndEndTime']=undefined;
            total_course[i]['day']=s.slice(0, s.length-2);;
            s = "";
            let dateSplit = ((total_course[i]['startDate'].toString()).split(" "));
            s += dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[3];
            dateSplit = ((total_course[i]['endDate']).toString()).split(" ");
            s += " - " + dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[3];
            
            total_course[i].duration = s;
            console.log(total_course);
            
        }
        res.json(total_course);
        res.status(200).end();
    }
    
});

router.post('/',async(req,res)=>{
    const payload = req.body;
    const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
    payload.createdTime = dateThailand._d;
    payload.lastModified = dateThailand._d;
    if(Object.keys(payload).length != 13){
        console.log(Object.keys(payload).length);
        console.log('input is incomplete');
        res.json('input is incomplete');
        res.status(400).end();
    }
    else if(payload['dayAndStartTime'].length != 7){
        console.log('dayAndStartTime is incorrect');
        res.json('dayAndStartTime is incorrect');
        res.status(400).end();
        
    }
    else if(payload['dayAndEndTime'].length != 7){
        console.log('dayAndEndTime is incorrect');
        res.json('dayAndEndTime is incorrect');
        res.status(400).end();
        
    }
    else{
        const courses = new CourseModel(payload);
        console.log(courses);
        await courses.save();
        console.log("klfsal");
        res.status(201).end();
    }
    
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
    else if(payload['dayAndStartTime'] != undefined && payload['dayAndStartTime'].length != 7){
        console.log('dayAndStartTime is incorrect');
        res.json('dayAndStartTime is incorrect');
        res.status(400).end();
        
    }
    else if(payload['dayAndEndTime'] != undefined && payload['dayAndEndTime'].length != 7){
        console.log('dayAndEndTime is incorrect');
        res.json('dayAndEndTime is incorrect');
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