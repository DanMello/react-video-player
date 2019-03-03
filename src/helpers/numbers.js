export function timeConvert(time, duration) {

    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (duration) {

      var durationHrs = ~~(duration / 3600);
      var durationMins = ~~((duration % 3600) / 60);
      var durationSecs = ~~duration % 60;

      if (durationHrs > 0 && hrs === 0) {

        ret += "00:" + (mins < 10 ? "0" : "");

      } else if (durationHrs > 0 && hrs < 10) {

        ret += "0"

      } else if (durationMins > 10 && mins < 10) {

        ret += "0"
      }
    }

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}