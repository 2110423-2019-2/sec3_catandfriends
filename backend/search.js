const express = require('express');
const router = express.Router();
var Fuse = require('fuse.js');
const CourseModel = require('./models/course');
const to = require('await-to-js').default;

router.get('/', async (req, res) => {
    let courseName = req.query.courseName == undefined ? "" : req.query.courseName;
    let courseId = req.query.courseId == undefined ? "" : req.query.courseId;
    let description = req.query.description == undefined ? "" : req.query.description;
    let category = req.query.subject == undefined ? "" : req.query.subject;
    let tutorName = req.query.tutorName == undefined ? "" : req.query.tutorName;
    let price = req.query.price == undefined ? "11111" : req.query.price;
    let day = req.query.day == undefined ? "1111111" : req.query.day;
    let time = req.query.time == undefined ? "11111111" : req.query.time;

    if (price == "00000" || day == "0000000" || time == "00000000") {
        res.status(400).end();
    }

    let priceList = [0, 500, 1500, 3500, 6500, 20000];

    let priceRange = [];
    let min = 22;
    let max = 6;
    for (let i = 0; i < price.length; i++) {
        if (price.charAt(i) == "1") {
            min = priceList[i] < min ? priceList[i] : min;
            max = priceList[i + 1] > max ? priceList[i + 1] : max;
        } else {
            if (min < max) {
                priceRange.push([min, max]);
            }
            min = priceList[i + 1];
        }
        if (i == price.length - 1 && min < max) {
            priceRange.push([min, max]);
        }
    }
    console.log(priceRange);


    let timeList = [6, 8, 10, 12, 14, 16, 18, 20, 22];
    // let timeList = ["06.00-08.00", "08.00-10.00", "10.00-12.00",
    //     "12.00-14.00", "14.00-16.00", "16.00-18.00", "18.00-20.00", "20.00-22.00"];

    let period = [];
    min = 22; max = 6;
    for (let i = 0; i < time.length; i++) {
        if (time.charAt(i) == "1") {
            min = timeList[i] < min ? timeList[i] : min;
            max = timeList[i + 1] > max ? timeList[i + 1] : max;
        } else {
            if (min < max) {
                period.push([min, max]);
            }
            min = timeList[i + 1];
        }
        if (i == time.length - 1 && min < max) {
            period.push([min, max]);
        }
    }
    // console.log(period);

    let dayMatch = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < day.length; i++) {
        dayMatch[i] = day[i] == "1" ? 1 : 0;
    }
    // console.log(dayMatch);

    let err, courses;

    let query = {$or:[]};
    if (courseId == "") {
        for (let i = 0; i < priceRange.length; i++) {
            query.$or.push({ "courseFee": {$gt: priceRange[i][0], $lt:priceRange[i][1] } });
        }
    } else {
        query = { courseId: courseId };
    }

    [err, courses] = await to(CourseModel.find(query));
    if (err) {
        res.status(500).end();
    }

    let data = [];
    let order = [];

    // for (let i = 0; i < courses.length; i++) {
    //     i = 0;
    // }

    // var options = {
    //     shouldSort: true,
    //     includeScore: true,
    //     threshold: 0.6,
    //     location: 0,
    //     distance: 100,
    //     maxPatternLength: 32,
    //     minMatchCharLength: 6,
    //     keys: [{
    //         name: 'title'
    //     }, {
    //         name: 'title'
    //     }]
    // };
    // var fuse = new Fuse(courses, options)

    // fuse.search('tion')

    res.json(courses);
    res.status(200).end();
});


module.exports = router;