const express = require('express');
const router = express.Router();
var Fuse = require('fuse.js');
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

    let data = [];
    let order = [];

    for (let i = 0; i < courses; i++){
        i = 0;
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
            name: 'title'
        }, {
            name: 'title'
        }]
    };
    var fuse = new Fuse(courses, options)

    fuse.search('tion')

    res.json(courses);
    res.status(200).end();
});


module.exports = router;