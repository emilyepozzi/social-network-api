const addDate = (date) => {
  let dayString = date.toString();

  // get last char of date string
  const charLast = dayString.charAt(dayString.length - 1);

  if (charLast === "1" && dayString !== "11") {
      dayString = `${dayString}st`;
  } else if (charLast === "2" && dayString !== "12") {
    dayString = `${dayString}nd`;
  } else if (charLast === "3" && dayString !== "13") {
    dayString = `${dayString}rd`;
  } else {
    dayString = `${dayString}th`;
  }

  return dayString;
};


module.exports = (
  timestamp,
  { lengthMonth = "short", dateShorten = true } = {}
) => {
  let months;

  if (lengthMonth === "short") {
    months = {
      0: "Jan",
      1: "Feb",
      2: "Mar",
      3: "Apr",
      4: "May",
      5: "Jun",
      6: "Jul",
      7: "Aug",
      8: "Sep",
      9: "Oct",
      10: "Nov",
      11: "Dec",
    };
  } else {
    months = {
      0: "January",
      1: "February",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "August",
      8: "September",
      9: "October",
      10: "November",
      11: "December",
    };
  }

  const dateObj = new Date(timestamp);
  const monthFormat = months[dateObj.getMonth()];

  let dayMonth;

  if (dateShorten) {
    dayMonth = addDate(dateObj.getDate());
  } else {
    dayMonth = dateObj.getDate();
  }

  const theYear = dateObj.getFullYear();

  let hour;
  // check for 24-hr time
  if (dateObj.getHours > 12) {
    hour = Math.floor(dateObj.getHours() / 2);
  } else {
    hour = dateObj.getHours();
  }
  // if hour is 0 (12:00am), change it to 12
  if (hour === 0) {
    hour = 12;
  }

  const minutes = dateObj.getMinutes();

  // set `am` or `pm`
  let periodOfDay;

  if (dateObj.getHours() >= 12) {
    periodOfDay = "pm";
  } else {
    periodOfDay = "am";
  }

  const formattedTimeStamp = `${monthFormat} ${dayMonth}, ${theYear} at ${hour}:${minutes} ${periodOfDay}`;

  return formattedTimeStamp;
};
