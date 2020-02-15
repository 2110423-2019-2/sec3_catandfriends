const express = require('express');
const router = express.Router();
const fuse = require('fuse.js');


router.get('/', async (req, res) => {
    let err, courses;

    [err, courses] = await to(CourseModel.find({}));
    if (err) {
        res.status(500).end();
    }

    res.json(courses);
    res.status(200).end();
});


module.exports = router;