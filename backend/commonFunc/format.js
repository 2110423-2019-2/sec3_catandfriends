const moment = require("moment-timezone");

class format {
    constructor() { }

    formatTimeDate(timeStamp) {
        let dateS = moment.tz(timeStamp, "Asia/Bangkok").format();
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
}

module.exports = new format();