import moment from "moment-timezone";

// Convert date from UTC to IST & in given format using moment
export const convertUTCDateToIST = (date, dateFormat) =>
  moment(date)?.tz("Asia/Kolkata")?.format(dateFormat);
