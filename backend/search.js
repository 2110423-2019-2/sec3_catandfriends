const express = require('express');
const router = express.Router();
const CourseModel = require('./models/course');
const tutorModel = require('./models/tutor');
const moment = require('moment-timezone');
const to = require('await-to-js').default;

router.get('/', async (req, res) => {

    let day = (req.query.day == undefined || req.query.day == {
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false
    }) ? {
            sunday: true,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true
        } : req.query.day;

    let category = (req.query.category == undefined || req.query.category == {
        mathematics: false,
        science: false,
        social: false,
        language: false,
    }) ? {
            mathematics: true,
            science: true,
            social: true,
            language: true,
        } : req.query.category;
    let time = (req.query.time == undefined || req.query.time == {
        time6To8: false,
        time8To10: false,
        time10To12: false,
        time12To14: false,
        time14To16: false,
        time16To18: false,
        time18To20: false,
        time20To22: false
    }) ? {
            time6To8: true,
            time8To10: true,
            time10To12: true,
            time12To14: true,
            time14To16: true,
            time16To18: true,
            time18To20: true,
            time20To22: true
        } : req.query.time;
    let price = (req.query.price == undefined || req.query.price == {
        price0To500: false,
        price500To1500: false,
        price1500To3500: false,
        price3500To6500: false,
        price6500AndAbove: false
    }) ? {
            price0To500: true,
            price500To1500: true,
            price1500To3500: true,
            price3500To6500: true,
            price6500AndAbove: true
        } : req.query.price;

    console.log(time);
    console.log(day);
    console.log(category);
    console.log(price);

    const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
    let err, courses;

    let query = { $and: [] };
    // let andCount = 0;
    // //////for price searching//////
    if (price.price0To500 || price.price500To1500 || price.price1500To3500 || price.price3500To6500 || price6500AndAbove) {
        query.$and.push({ $or: [] });
        if (price.price0To500) query.$and[0].$or.push({ "price": { $gte: 0, $lte: 500 } });
        if (price.price500To1500) query.$and[0].$or.push({ "price": { $gte: 500, $lte: 1500 } });
        if (price.price1500To3500) query.$and[0].$or.push({ "price": { $gte: 1500, $lte: 3500 } });
        if (price.price3500To6500) query.$and[0].$or.push({ "price": { $gte: 3500, $lte: 6500 } });
        if (price.price6500AndAbove) query.$and[0].$or.push({ "price": { $gte: 6500 } });
    }
    // ///////////////////////////////

    // //////for category searching//////
    if (category.mathematics || category.science || category.social || category.language) {
        query.$and.push({ $or: [] });
        if (category.mathematics) query.$and[1].$or.push({ "category": "mathematics" });
        if (category.science) query.$and[1].$or.push({ "category": "science" });
        if (category.social) query.$and[1].$or.push({ "category": "social" });
        if (category.language) query.$and[1].$or.push({ "category": "language" });
    }
    // ///////////////////////////////

    // //////for day searching//////
    if (day.sunday || day.monday || day.tuesday || day.wednesday || day.thursday || day.friday || day.saturday) {
        query.$and.push({ $or: [] });
        if (day.sunday) query.$and[2].$or.push({ "dayAndStartTime.0": { $ne: null } });
        if (day.monday) query.$and[2].$or.push({ "dayAndStartTime.1": { $ne: null } });
        if (day.tuesday) query.$and[2].$or.push({ "dayAndStartTime.2": { $ne: null } });
        if (day.wednesday) query.$and[2].$or.push({ "dayAndStartTime.3": { $ne: null } });
        if (day.thursday) query.$and[2].$or.push({ "dayAndStartTime.4": { $ne: null } });
        if (day.friday) query.$and[2].$or.push({ "dayAndStartTime.5": { $ne: null } });
        if (day.saturday) query.$and[2].$or.push({ "dayAndStartTime.6": { $ne: null } });
    }
    // ///////////////////////////////

    // //////for time searching//////
    if (time.time6To8 || time.time8To10 || time.time10To12 || time.time12To14 || time.time14To16
        || time.time16To18 || time.time18To20 || time.time20To22) {
        query.$and.push({ $or: [] });
        if (time.time6To8) query.$and[3].$or.push({ $and: [{ "dayAndStartTime.0": { $gte: 6 } }, { "dayAndEndTime.0": { $lte: 8 } }] });
        if (time.time8To10) query.$and[3].$or.push({ $and: [{ "dayAndStartTime.1": { $gte: 8 } }, { "dayAndEndTime.1": { $lte: 10 } }] });
        if (time.time10To12) query.$and[3].$or.push({ $and: [{ "dayAndStartTime.2": { $gte: 10 } }, { "dayAndEndTime.2": { $lte: 12 } }] });
        if (time.time12To14) query.$and[3].$or.push({ $and: [{ "dayAndStartTime.3": { $gte: 12 } }, { "dayAndEndTime.3": { $lte: 14 } }] });
        if (time.time14To16) query.$and[3].$or.push({ $and: [{ "dayAndStartTime.4": { $gte: 14 } }, { "dayAndEndTime.4": { $lte: 16 } }] });
        if (time.time16To18) query.$and[3].$or.push({ $and: [{ "dayAndStartTime.5": { $gte: 16 } }, { "dayAndEndTime.5": { $lte: 18 } }] });
        if (time.time18To20) query.$and[3].$or.push({ $and: [{ "dayAndStartTime.6": { $gte: 18 } }, { "dayAndEndTime.6": { $lte: 20 } }] });
        if (time.time20To22) query.$and[3].$or.push({ $and: [{ "dayAndStartTime.7": { $gte: 20 } }, { "dayAndEndTime.7": { $lte: 22 } }] });
    }
    // ///////////////////////////////
    query.$and.push({ "endDate": { $gte: dateThailand._d } });
    console.log(JSON.stringify(query));

    [err, courses] = await to(CourseModel.find(query));
    if (err) {
        res.status(500).end();
    }
    console.log(courses);

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

});


module.exports = router;