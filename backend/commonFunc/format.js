const moment = require("moment-timezone");

class format {
    constructor() { }

    formatTimeDate(timeStamp) {
        let dateS = moment.tz(timeStamp, "Etc/UCT").format();
        let yearMonthDay = dateS.slice(0, 10).split("-");
        let dayMonthYear = yearMonthDay.reverse().join("-");
        let time = dateS.slice(11, 19);
        return `${time} ${dayMonthYear}`;
    }

    formatTime(time) {
        let timeS = time.toString();
        let hour, min;
        if (timeS.includes(".")) {
            hour = timeS.slice(0, timeS.indexOf("."));
            min = timeS.slice(timeS.indexOf(".") + 1, timeS.length);
        } else {
            hour = timeS;
            min = "0";
        }
        if (hour.length == 1) hour = "0" + hour;
        if (min.length == 1) min = min + "0";
        return `${hour}:${min}`;
    }

    formatRangeOfTime(start, end) {
        return this.formatTime(start) + "-" + this.formatTime(end);
    }

    formatDate(date) {
        let s = "";
        let dateSplit = date.toString().split(" ");
        s += dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[3];
        return s;
    }

    formatCourseDay(course) {
        let s = "";
        for (let j = 0; j < 7; j++) {
            if (course["dayAndStartTime"][j] == null) continue;
            if (j == 0) s += "Mon ";
            else if (j == 1) s += "Tue ";
            else if (j == 2) s += "Wed ";
            else if (j == 3) s += "Thu ";
            else if (j == 4) s += "Fri ";
            else if (j == 5) s += "Sat ";
            else if (j == 6) s += "Sun ";
            // s += courses[i]['dayAndStartTime'][j] + "-" + courses[i]['dayAndEndTime'][j] + "/ ";
            s += this.formatRangeOfTime(course["dayAndStartTime"][j], course["dayAndEndTime"][j]) + "/ ";
        }
        return s.slice(0, s.length - 2);
    }

    formatDuration(course) {
        //[Mon Feb 10 2020 19:46:05 GMT+0700 (GMT+07:00)]
        let s = "";
        let dateSplit = course.startDate.toString().split(" ");
        s += dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[3];
        dateSplit = course.endDate.toString().split(" ");
        s += " - " + dateSplit[2] + "/" + dateSplit[1] + "/" + dateSplit[3];
        return s;
    }
}

module.exports = new format();