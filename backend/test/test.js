var assert = require('assert');
var request = require("request")
require("dotenv").config();

function toArray(string) {
    const json = JSON.parse(string);
    return json;
}

describe("## Comment API Tests", () => {
    describe("###GET /comment", () => {
        const arrayTutorId = toArray(process.env.tutorId)
        it(`test1`, () => { assert(345345, arrayTutorId[0]) });
        it(`test2`, () => { assert(536456, arrayTutorId[1]) });
    });

    describe("###POST /requests/:token", () => {
        it(`test1`, () => { assert(1, 1) });
    });

    describe("###PUT /requests/:token", () => {
        it(`test1`, () => { assert("A", "A") });
    });
});



