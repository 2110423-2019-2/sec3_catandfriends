const express = require('express');
const router = express.Router();
const fuse = require('fuse.js');
const CourseModel = require('./models/course');
const to = require('await-to-js').default;

router.get('/', async (req, res) => {
    let courseName = req.query.courseName;
    let courseId = req.query.courseId;
    let description = req.query.description;
    let tutorName = req.query.tutorName;
    let price = req.query.price;
    let day = req.query.day;
    let time = req.query.time;
    
    let err, courses;

    [err, courses] = await to(CourseModel.find({}));
    if (err) {
        res.status(500).end();
    }

    var options = {
        shouldSort: true,
        includeScore: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 6,
        keys: [{
            
        }, {
            
        }]
    };
    var fuse = new Fuse(courses, options);
    fuse.search();

    res.json(courses);
    res.status(200).end();
});


module.exports = router;