var assert = require('assert');
var request = require("request")

describe("## Comment API Tests", () => {
    describe("###GET /comment", () => {
        it(`test1`, () => { assert(true, true) });
        it(`test2`, () => { assert(true, false) });
    });

    describe("###POST /requests/:token", () => {
        it(`test1`, () => { assert(1, 1) });
    });

    describe("###PUT /requests/:token", () => {
        it(`test1`, () => { assert("A", "A") });
    });
});



