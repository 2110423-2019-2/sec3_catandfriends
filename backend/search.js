const express = require('express');
const router = express.Router();
const CourseModel = require('./models/course');
const tutorModel = require('./models/tutor');
const moment = require('moment-timezone');
const to = require('await-to-js').default;

router.get('/', async (req, res) => {

    let category = req.query.subject == undefined ? "" : req.query.subject;
    let price = req.query.price == undefined ? "11111" : req.query.price;
    let day = req.query.day == undefined ? "1111111" : req.query.day;
    let time = req.query.time == undefined ? "11111111" : req.query.time;

    /////invalid detection/////
    if (price == "00000" || day == "0000000" || time == "00000000") {
        res.status(400).end();
    } else {
        // console.log(category);
        /////get range of input price/////
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
        /////get set of course time of input course time/////
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
        // console.log(timeRange);
        /////get days of input days/////
        let dayList = [0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < day.length; i++) {
            dayList[i] = day[i] == "1" ? 1 : 0;
        }
        // console.log(dayList);

        const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
        let err, courses;

        let query = { $and: [{ "endDate": { $gte: dateThailand } }] };
        let andCount = 0;

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
                let start = timeRange[i][0];
                let end = timeRange[i][1];
                query.$and[andCount].$or.push({ $and: [{ "dayAndStartTime.0": { $gte: start } }, { "dayAndEndTime.0": { $lte: end } }] });
                query.$and[andCount].$or.push({ $and: [{ "dayAndStartTime.1": { $gte: start } }, { "dayAndEndTime.1": { $lte: end } }] });
                query.$and[andCount].$or.push({ $and: [{ "dayAndStartTime.2": { $gte: start } }, { "dayAndEndTime.2": { $lte: end } }] });
                query.$and[andCount].$or.push({ $and: [{ "dayAndStartTime.3": { $gte: start } }, { "dayAndEndTime.3": { $lte: end } }] });
                query.$and[andCount].$or.push({ $and: [{ "dayAndStartTime.4": { $gte: start } }, { "dayAndEndTime.4": { $lte: end } }] });
                query.$and[andCount].$or.push({ $and: [{ "dayAndStartTime.5": { $gte: start } }, { "dayAndEndTime.5": { $lte: end } }] });
                query.$and[andCount].$or.push({ $and: [{ "dayAndStartTime.6": { $gte: start } }, { "dayAndEndTime.6": { $lte: end } }] });
            }
        }
        ///////////////////////////////

        // console.log(JSON.stringify(query));

        [err, courses] = await to(CourseModel.find(query));
        if (err) {
            res.status(500).end();
        }

        // console.log(courses);

        for (let i = 0; i < courses.length; i++) {
            let err, tutor

            [err, tutor] = await to(tutorModel.find({
                _id: courses[i].tutorId
            }));
            if (err) {
                res.status(500).end();
            }

            let s = "";
            for (j = 0; j < 7; j++) {
                if (courses[i]['dayAndStartTime'][j] == null) continue;
                if (j == 0) s += "Mon ";
                else if (j == 1) s += "Tue ";
                else if (j == 2) s += "Wed ";
                else if (j == 3) s += "Thu ";
                else if (j == 4) s += "Fri ";
                else if (j == 5) s += "Sat ";
                else if (j == 6) s += "Sun ";
                s += courses[i]['dayAndStartTime'][j] + ":00-" + courses[i]['dayAndEndTime'][j] + ":00/ ";
            }
            courses[i].day = s.slice(0, s.length - 2);
            courses[i].premiumTutorStatus = tutor[0].premiumStatus;
            //[Mon Feb 10 2020 19:46:05 GMT+0700 (GMT+07:00)]
            s = "";
            let dateSplit = ((courses[i].startDate).toString()).split(" ");
            s += dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[3];
            dateSplit = ((courses[i].endDate).toString()).split(" ");
            s += " - " + dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[3];
            courses[i].duration = s;
            courses[i].isAvailable = courses[i].amountOfStudent > 0 ? true : false;
            // courseName
            // courses[i].startDate = undefined;
            courses[i].endDate = undefined;
            courses[i].dayAndStartTime = undefined;
            courses[i].dayAndEndTime = undefined;
            // courses[i].tutorId = undefined;
            courses[i].amountOfStudent = undefined;
            courses[i].listOfStudentId = undefined;
            // description
            // courseFee
            courses[i].createdTime = undefined;
            courses[i].lastModified = undefined;
            
            // category
            // day
        }

        // console.log(courses);
        courses.sort((a, b) => {
            return b.isAvailable - a.isAvailable || b.premiumTutorStatus - a.premiumTutorStatus || a.startDate - b.startDate;
        });
        // console.log(courses);

        res.json(courses);
        res.status(200).end();
    }
});


module.exports = router;