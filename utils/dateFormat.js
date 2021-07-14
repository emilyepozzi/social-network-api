const addDate = (date) => {
  let stringDate = date.toString();
  const lastCharacters = stringDate.charAt(stringDate.length - 1);
  

  if (lastCharacters === "1" && stringDate !== "11") {
    stringDate = `${stringDate}st`;
  } else if (lastCharacters === "2" && stringDate !== "12") {
    stringDate = `${stringDate}nd`;
  } else if (lastCharacters === "3" && stringDate !== "13") {
    stringDate = `${stringDate}rd`;
  } else {
    stringDate = `${stringDate}th`;
  }


  return stringDate;
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

  const objectDate = new Date(timestamp);
  const monthFormat = months[objectDate.getMonth()];

  let dayMonth;

  if (dateShorten) {
    dayMonth = addDate(objectDate.getDate());
  } else {
    dayMonth = objectDate.getDate();
  }

  const theYear = objectDate.getFullYear();

  let hour;


  if (objectDate.getHours > 12) {
    hour = Math.floor(objectDate.getHours() / 2);
  } else {
    hour = objectDate.getHours();
  }
  if (hour === 0) {
    hour = 12;
  }

const minutes = objectDate.getMinutes();

  let dayPeriod;

  if (objectDate.getHours() >= 12) {
    dayPeriod = "pm";
  } else {
    dayPeriod = "am";
  }
  const formattedTimeStamp = `${monthFormat} ${dayMonth}, ${theYear} at ${hour}:${minutes} ${dayPeriod}`;

  return formattedTimeStamp;
};
