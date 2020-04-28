const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const tutorModel = require("../models/tutor");
const studentModel = require("../models/student");
const scheduleModel = require("../models/schedule");
const moment = require("moment-timezone");
const nodemailer = require("nodemailer");

//Create a passport middleware to handle user registration
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        var {
          firstName,
          lastName,
          ssn,
          birthDate,
          gender,
          phoneNumber,
          role,
        } = req.body;
        const hash = await bcrypt.hash(password, 10);
        //Save the information provided by the user to the the database
        const user = await userModel.create({
          email,
          password: hash,
          firstName,
          lastName,
          ssn,
          birthDate,
          gender,
          phoneNumber,
          role,
        });
        if (role == "tutor") {
          const tutor = await tutorModel.create({ userId: user._id });
        } else if (role == "student") {
          const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");
          const schedule = await scheduleModel.create({
            studentId: user._id,
            createdDate: dateThailand._d,
            lastModified: dateThailand._d,
          });
          const student = await studentModel.create({
            userId: user._id,
            scheduleId: schedule._id,
          });
        }

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: process.env.EMAIL, pass: process.env.MAILPASSWORD },
        });
        var mailOptions = {
          from: process.env.EMAIL,
          to: user.email,
          subject: "Verify Your Email",
          text: `Please click this link to verify your account\nhttp://${process.env.SERVERIP}:8000/verify?email=${user.email}&hash=${hash}`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            return error;
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        //Send the user information to the next middleware
        return done(null, user);
      } catch (error) {
        console.log(error);
        if (error.errmsg && error.errmsg.includes("email")) {
          return done("email is not valid");
        } else if (error.errmsg && error.errmsg.includes("ssn")) {
          return done("ssn is not valid");
        }
        return done(error);
      }
    }
  )
);

//Create a passport middleware to handle User login
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        //Find the user associated with the email provided by the user
        const user = await userModel.findOne({ email });
        if (!user) {
          //If the user isn't found in the database, return a message
          return done({ errmsg: "User not found" }, false, {
            message: "User not found",
          });
        }
        //Validate password and make sure it matches with the corresponding hash stored in the database
        //If the passwords match, it returns a value of true.
        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done({ errmsg: "Wrong Password" }, false, {
            message: "Wrong Password",
          });
        }
        if (!user.verified) {
          return done({ errmsg: "Plese verify your account" }, false, {
            message: "Plese verify your account",
          });
        }
        //Send the user information to the next middleware
        // console.log("aaaa");

        return done(null, user, {
          message: "Logged in Successfully",
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new JWTstrategy(
    {
      //secret we used to sign our JWT
      secretOrKey: "top_secret",
      //we expect the user to send the token as a query parameter with the name 'secret_token'
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("token"),
    },
    async (token, done) => {
      try {
        //Pass the user details to the next middleware
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "jwt-profile",
  new JWTstrategy(
    {
      //secret we used to sign our JWT
      secretOrKey: "top_secret",
      //we expect the user to send the token as a query parameter with the name 'secret_token'
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("token"),
    },
    async (token, done) => {
      try {
        //Pass the user details to the next middleware
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
