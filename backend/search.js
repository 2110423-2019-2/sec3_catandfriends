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
    } else {
        let priceList = [0, 500, 1500, 3500, 6500, 20000];

        let priceRange = [];
        let min = 20000;
        let max = 0;
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
        // console.log(priceRange);


        let timeList = [6, 8, 10, 12, 14, 16, 18, 20, 22];
        // let timeList = ["06.00-08.00", "08.00-10.00", "10.00-12.00",
        //     "12.00-14.00", "14.00-16.00", "16.00-18.00", "18.00-20.00", "20.00-22.00"];
        let timeRange = [];
        min = 22; max = 6;
        for (let i = 0; i < time.length; i++) {
            if (time.charAt(i) == "1") {
                min = timeList[i] < min ? timeList[i] : min;
                max = timeList[i + 1] > max ? timeList[i + 1] : max;
            } else {
                if (min < max) {
                    timeRange.push([min, max]);
                }
                min = timeList[i + 1];
            }
            if (i == time.length - 1 && min < max) {
                timeRange.push([min, max]);
            }
        }
        console.log(timeRange);

        let dayList = [0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < day.length; i++) {
            dayList[i] = day[i] == "1" ? 1 : 0;
        }
        // console.log(dayList);

        let err, courses;

        let query = { $and: [] };
        let andCount = -1;
        if (courseId != "") {
            query = { "courseId": courseId };
        } else {
            //////for price searching//////
            query.$and.push({ $or: [] });
            andCount++;
            for (let i = 0; i < priceRange.length; i++) {
                query.$and[andCount].$or.push({ "courseFee": { $gt: priceRange[i][0], $lt: priceRange[i][1] } });
            }
            ///////////////////////////////
            //////for category searching//////
            if (category != "") {
                query.$and.push({ "category": category });
                andCount++;
            }
            ///////////////////////////////
            //////for day searching//////
            for (let i = 0; i < dayList.length; i++) {
                if (dayList[i] == 1) {
                    query.$and.push({ $or: [] });
                    andCount++;
                    break;
                }
            }
            if (dayList[0] == 1) query.$and[andCount].$or.push({ "dayAndStartTime.0": { $ne: null } });
            if (dayList[1] == 1) query.$and[andCount].$or.push({ "dayAndStartTime.1": { $ne: null } });
            if (dayList[2] == 1) query.$and[andCount].$or.push({ "dayAndStartTime.2": { $ne: null } });
            if (dayList[3] == 1) query.$and[andCount].$or.push({ "dayAndStartTime.3": { $ne: null } });
            if (dayList[4] == 1) query.$and[andCount].$or.push({ "dayAndStartTime.4": { $ne: null } });
            if (dayList[5] == 1) query.$and[andCount].$or.push({ "dayAndStartTime.5": { $ne: null } });
            if (dayList[6] == 1) query.$and[andCount].$or.push({ "dayAndStartTime.6": { $ne: null } });
            ///////////////////////////////
            //////for time searching//////

            if (timeRange.length != 0) {
                query.$and.push({ $or: [] });
                andCount++;
                for (let i = 0; i < timeRange.length; i++) {
                    let min = timeRange[i][0];
                    let duration = timeRange[i][1] - timeRange[i][0];
                    query.$and[andCount].$or.push({ $and: [{ "dayAndStartTime.0": { $gte: min } }, { "durationDayAndTime.0": { $lte: duration } }] });
                    query.$and[andCount].$or.push({ $and: [{ "dayAndStartTime.1": { $gte: min } }, { "durationDayAndTime.1": { $lte: duration } }] });
                    query.$and[andCount].$or.push({ $and: [{ "dayAndStartTime.2": { $gte: min } }, { "durationDayAndTime.2": { $lte: duration } }] });
                    query.$and[andCount].$or.push({ $and: [{ "dayAndStartTime.3": { $gte: min } }, { "durationDayAndTime.3": { $lte: duration } }] });
                    query.$and[andCount].$or.push({ $and: [{ "dayAndStartTime.4": { $gte: min } }, { "durationDayAndTime.4": { $lte: duration } }] });
                    query.$and[andCount].$or.push({ $and: [{ "dayAndStartTime.5": { $gte: min } }, { "durationDayAndTime.5": { $lte: duration } }] });
                }
            }
            ///////////////////////////////

        }
        console.log(JSON.stringify(query));


        [err, courses] = await to(CourseModel.find(query));
        if (err) {
            res.status(500).end();
        }

        // console.log(courses[0].dayAndStartTime);


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
    }
});


module.exports = router;