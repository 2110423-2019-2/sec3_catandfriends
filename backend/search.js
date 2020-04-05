const express = require("express");
const router = express.Router();
const moment = require("moment-timezone");
const to = require("await-to-js").default;
const CourseModel = require("./models/course");
const tutorModel = require("./models/tutor");
const userModel = require("./models/user");
const format = require("./commonFunc/format");

router.get("/", async (req, res) => {
    let category =
        req.query.category === undefined || req.query.category == "0000"
            ? "1111"
            : req.query.category;
    let price =
        req.query.price === undefined || req.query.price == "00000"
            ? "11111"
            : req.query.price;
    let day =
        req.query.day === undefined || req.query.day == "0000000"
            ? "1111111"
            : req.query.day;
    let time =
        req.query.time === undefined || req.query.time == "00000000"
            ? "11111111"
            : req.query.time;

    day = {
        monday: parseInt(day[0]),
        tuesday: parseInt(day[1]),
        wednesday: parseInt(day[2]),
        thursday: parseInt(day[3]),
        friday: parseInt(day[4]),
        saturday: parseInt(day[5]),
        sunday: parseInt(day[6])
    };

    category = {
        mathematics: parseInt(category[0]),
        science: parseInt(category[1]),
        social: parseInt(category[2]),
        language: parseInt(category[3])
    };

    time = {
        time6To8: parseInt(time[0]),
        time8To10: parseInt(time[1]),
        time10To12: parseInt(time[2]),
        time12To14: parseInt(time[3]),
        time14To16: parseInt(time[4]),
        time16To18: parseInt(time[5]),
        time18To20: parseInt(time[6]),
        time20To22: parseInt(time[7])
    };

    price = {
        price0To500: parseInt(price[0]),
        price500To1500: parseInt(price[1]),
        price1500To3500: parseInt(price[2]),
        price3500To6500: parseInt(price[3]),
        price6500AndAbove: parseInt(price[4])
    };

    // console.log(time);
    // console.log(day);
    // console.log(category);
    // console.log(price);

    const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
    let err, courses;

    let query = { $and: [] };
    // let andCount = 0;
    // //////for price searching//////
    if (
        price.price0To500 ||
        price.price500To1500 ||
        price.price1500To3500 ||
        price.price3500To6500 ||
        price.price6500AndAbove
    ) {
        query.$and.push({ $or: [] });
        if (price.price0To500)
            query.$and[0].$or.push({ courseFee: { $gte: 0, $lte: 500 } });
        if (price.price500To1500)
            query.$and[0].$or.push({ courseFee: { $gte: 500, $lte: 1500 } });
        if (price.price1500To3500)
            query.$and[0].$or.push({ courseFee: { $gte: 1500, $lte: 3500 } });
        if (price.price3500To6500)
            query.$and[0].$or.push({ courseFee: { $gte: 3500, $lte: 6500 } });
        if (price.price6500AndAbove)
            query.$and[0].$or.push({ courseFee: { $gte: 6500 } });
    }
    // ///////////////////////////////

    // //////for category searching//////
    if (
        category.mathematics ||
        category.science ||
        category.social ||
        category.language
    ) {
        query.$and.push({ $or: [] });
        if (category.mathematics)
            query.$and[1].$or.push({ category: "mathematics" });
        if (category.science) query.$and[1].$or.push({ category: "science" });
        if (category.social) query.$and[1].$or.push({ category: "social" });
        if (category.language) query.$and[1].$or.push({ category: "language" });
    }
    // ///////////////////////////////

    // //////for day searching//////
    if (
        day.monday ||
        day.tuesday ||
        day.wednesday ||
        day.thursday ||
        day.friday ||
        day.saturday ||
        day.sunday
    ) {
        query.$and.push({ $or: [] });
        if (day.monday)
            query.$and[2].$or.push({ "dayAndStartTime.0": { $ne: null } });
        if (day.tuesday)
            query.$and[2].$or.push({ "dayAndStartTime.1": { $ne: null } });
        if (day.wednesday)
            query.$and[2].$or.push({ "dayAndStartTime.2": { $ne: null } });
        if (day.thursday)
            query.$and[2].$or.push({ "dayAndStartTime.3": { $ne: null } });
        if (day.friday)
            query.$and[2].$or.push({ "dayAndStartTime.4": { $ne: null } });
        if (day.saturday)
            query.$and[2].$or.push({ "dayAndStartTime.5": { $ne: null } });
        if (day.sunday)
            query.$and[2].$or.push({ "dayAndStartTime.6": { $ne: null } });
    }
    // ///////////////////////////////

    // //////for time searching//////
    let timeList = [6, 8, 10, 12, 14, 16, 18, 20, 22];
    // let timeList = ["06.00-08.00", "08.00-10.00", "10.00-12.00",
    //     "12.00-14.00", "14.00-16.00", "16.00-18.00", "18.00-20.00", "20.00-22.00"];
    let times = [
        time.time6To8,
        time.time8To10,
        time.time10To12,
        time.time12To14,
        time.time14To16,
        time.time16To18,
        time.time18To20,
        time.time20To22
    ];
    // console.log(times);

    let timeRange = [];
    min = 22;
    max = 6;
    for (let i = 0; i < times.length; i++) {
        if (times[i]) {
            min = timeList[i] < min ? timeList[i] : min;
            max = timeList[i + 1] > max ? timeList[i + 1] : max;
        } else {
            if (min < max) {
                timeRange.push([min, max]);
            }
            min = timeList[i + 1];
        }
        if (i == times.length - 1 && min < max) {
            timeRange.push([min, max]);
        }
    }
    // console.log(timeRange);

    // if (time.time6To8 || time.time8To10 || time.time10To12 || time.time12To14 || time.time14To16
    //     || time.time16To18 || time.time18To20 || time.time20To22) {
    if (timeRange.length != 0) {
        query.$and.push({ $or: [] });
        for (let i = 0; i < timeRange.length; i++) {
            let start = timeRange[i][0];
            let end = timeRange[i][1];
            query.$and[3].$or.push({
                $and: [
                    { "dayAndStartTime.0": { $gte: start } },
                    { "dayAndEndTime.0": { $lte: end } }
                ]
            });
            query.$and[3].$or.push({
                $and: [
                    { "dayAndStartTime.1": { $gte: start } },
                    { "dayAndEndTime.1": { $lte: end } }
                ]
            });
            query.$and[3].$or.push({
                $and: [
                    { "dayAndStartTime.2": { $gte: start } },
                    { "dayAndEndTime.2": { $lte: end } }
                ]
            });
            query.$and[3].$or.push({
                $and: [
                    { "dayAndStartTime.3": { $gte: start } },
                    { "dayAndEndTime.3": { $lte: end } }
                ]
            });
            query.$and[3].$or.push({
                $and: [
                    { "dayAndStartTime.4": { $gte: start } },
                    { "dayAndEndTime.4": { $lte: end } }
                ]
            });
            query.$and[3].$or.push({
                $and: [
                    { "dayAndStartTime.5": { $gte: start } },
                    { "dayAndEndTime.5": { $lte: end } }
                ]
            });
            query.$and[3].$or.push({
                $and: [
                    { "dayAndStartTime.6": { $gte: start } },
                    { "dayAndEndTime.6": { $lte: end } }
                ]
            });
        }
    }
    // ///////////////////////////////
    query.$and.push({ endDate: { $gte: dateThailand._d } });
    console.log(query);

    [err, courses] = await to(CourseModel.aggregate([{ $match: query }, { $sort: { isAvailable: -1, premiumTutorStatus: -1, startDate: 1 } }]));
    if (err) {
        res.status(500).end();
    }
    console.log(courses);

    for (let i = 0; i < courses.length; i++) {
        //add tutor information//
        let err, tutor;
        [err, tutor] = await to(
            userModel.findOne({
                _id: courses[i].tutorId
            })
        );
        if (err) {
            res.status(500).end();
        }
        courses[i].premiumTutorStatus = tutor.premiumStatus;
        let tutorName = tutor.firstName + " " + tutor.lastName;
        /////////////////////////

        courses[i].day = format.formatCourseDay(courses[i]);
        courses[i].duration = format.formatDuration(courses[i]);

        courses[i].isAvailable = courses[i].amountOfStudent > 0 ? true : false;
        // let remaining = courses[i].amountOfStudent;

        courses[i].startDate = undefined;
        courses[i].endDate = undefined;
        courses[i].dayAndStartTime = undefined;
        courses[i].dayAndEndTime = undefined;
        courses[i].listOfStudentId = undefined;
        // courses[i].amountOfStudent = undefined;
        courses[i].createdTime = undefined;
        courses[i].lastModified = undefined;

        courses[i] = {
            ...courses[i],
            tutorName: tutorName
            // remaining: remaining
        };
    }

    console.log(courses);
    // courses.sort((a, b) => {
    //     return (
    //         b.isAvailable - a.isAvailable ||
    //         b.premiumTutorStatus - a.premiumTutorStatus ||
    //         a.startDate - b.startDate
    //     );
    // });
    // console.log(courses);

    res.json(courses);
    res.status(200).end();
});

module.exports = router;