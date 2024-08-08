import { DateTime } from "luxon";

export const getTimestamp = (time: string) => {
  let timeDiff = DateTime.fromISO(time)
    .diffNow(["years", "months", "days", "hours", "minutes", "seconds"])
    .toObject();

  if (timeDiff.years && -timeDiff.years > 0) {
    return (
      -timeDiff.years.toPrecision(1) +
      (-timeDiff.years.toPrecision(1) > 1 ? " years ago" : " year ago")
    );
  } else if (timeDiff.months && -timeDiff.months > 0) {
    return (
      -timeDiff.months.toPrecision(1) +
      (-timeDiff.months.toPrecision(1) > 1 ? " months ago" : " month ago")
    );
  } else if (timeDiff.days && -timeDiff.days > 0) {
    return (
      -timeDiff.days.toPrecision(1) +
      (-timeDiff.days.toPrecision(1) > 1 ? " days ago" : " day ago")
    );
  } else if (timeDiff.hours && -timeDiff.hours > 0) {
    return (
      -timeDiff.hours.toPrecision(1) +
      (-timeDiff.hours.toPrecision(1) > 1 ? " hours ago" : " hour ago")
    );
  } else if (timeDiff.minutes && -timeDiff.minutes > 0) {
    return (
      -timeDiff.minutes.toPrecision(1) +
      (-timeDiff.minutes.toPrecision(1) > 1 ? " minutes ago" : " minute ago")
    );
  } else {
    return Math.ceil(-timeDiff.seconds!.toPrecision(1)) + " seconds ago ";
  }
};
