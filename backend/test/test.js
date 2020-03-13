var chai = require("chai");
var expect = chai.expect;
var request = require("request")

describe("testRequest", () => {
    describe("GET", () => {
        it(`Tutor1`, (done) => {
            request("http://localhost:8000/requests?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlNDJjYjVlNGM0ZmVmNDY1ZWNlYjkzZiIsImVtYWlsIjoidHV0b3IxQHR1dG9yaGVyZS5jb20ifSwiaWF0IjoxNTg0MDAzNjk0fQ.hwYazWXcFyykgIWNzh1CsoM9MqltpAXbqsKdJDT9DiA", (err, res, body) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });

        it(`Tutor2`, (done) => {
            request("http://localhost:8000/requests?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlNDJjYjVlNGM0ZmVmNDY1ZWNlYjkzZiIsImVtYWlsIjoidHV0b3IxQHR1dG9yaGVyZS5jb20ifSwiaWF0IjoxNTgzMzk5MDE1fQ._93wmas1mb-ZDzECIJs_70Kjy0FQkNLC2xvcSIJ26oc", (err, res, body) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });

        it(`is not tutor`, (done) => {
            request("http://localhost:8000/requests?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlNDhjODRmYWU3NjE5NWIxMmMxOGY0OSIsImVtYWlsIjoidHV0b3IyQHR1dG9yaGVyZS5jb20ifSwiaWF0IjoxNTgzOTc2NjE3fQ.KT3vr83erC4qZjzJMoTM1KkpzfrKmy5X6xp0EUELZja", (err, res, body) => {
                expect(res.statusCode).to.equal(500);
                done();
            });
        });


    });

    describe("POST", () => {

    });

    describe("PUT", () => {

    });
});



