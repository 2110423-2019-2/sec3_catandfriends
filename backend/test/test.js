var chai = require("chai");
var expect = chai.expect;
var request = require("request")
var tutorTokens = ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlNDJjYjVlNGM0ZmVmNDY1ZWNlYjkzZiIsImVtYWlsIjoidHV0b3IxQHR1dG9yaGVyZS5jb20ifSwiaWF0IjoxNTg0MDAzNjk0fQ.hwYazWXcFyykgIWNzh1CsoM9MqltpAXbqsKdJDT9DiA",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlNDJjYjVlNGM0ZmVmNDY1ZWNlYjkzZiIsImVtYWlsIjoidHV0b3IxQHR1dG9yaGVyZS5jb20ifSwiaWF0IjoxNTgzMzk5MDE1fQ._93wmas1mb-ZDzECIJs_70Kjy0FQkNLC2xvcSIJ26oc"];
var studentTokens = ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlNGMxNWJjYWY3NWUxN2FiODlhZWU4NCIsImVtYWlsIjoic3R1ZGVudDFAdHV0b3JoZXJlLmNvbSJ9LCJpYXQiOjE1ODM4Mzk1MDF9.Amyk4Y0EESJkIs2YOHJjl4VP7tpEI2NQOIcXA774I0s"];

describe("## Request API Tests", () => {
    describe("###GET /requests/:token", () => {
        it(`Tutor0`, (done) => {
            request(`http://localhost:8000/requests?token=${tutorTokens[0]}`, { method: "GET" }, (err, res, body) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });

        it(`Tutor1`, (done) => {
            request(`http://localhost:8000/requests?token=${tutorTokens[1]}`, { method: "GET" }, (err, res, body) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });

        it(`is not tutor`, (done) => {
            request("http://localhost:8000/requests?token=a", (err, res, body) => {
                expect(res.statusCode).to.equal(401);
                done();
            });
        });


    });

    describe("###POST /requests/:token", () => {

    });

    describe("###PUT /requests/:token", () => {

    });
});



