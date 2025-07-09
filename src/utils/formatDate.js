import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const convertTo24HourFormat = (time) => {
  // Parse the time using dayjs, handling AM/PM format
  const parsedTime = dayjs(time, "hh:mm:ss A");

  // Format the time in 24-hour format
  const formattedTime = parsedTime.format("HH:mm:ss");

  return formattedTime;
};

export const getOnlyDate = (dateString) => {
  if (dateString) {
    const dayDate = new Date(dateString);

    const day = String(dayDate.getDate()).padStart(2, "0"); // Add leading zero if needed
    const month = String(dayDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
    const year = dayDate.getFullYear();

    return `${day}/${month}/${year}`;
  } else {
    return "Not Found";
  }
};

export const formatTime = (dateString, locale = "en") => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

dayjs.extend(relativeTime);

export function formatNotificationTime(dateString) {
  const date = dayjs(dateString);
  const now = dayjs();

  // If less than 24 hours → show relative
  if (now.diff(date, "hour") < 24) {
    return date.fromNow(); // eg: "5 minutes ago"
  }

  // Else → show formatted date
  return date.format("DD MMMM, YYYY . hh:mm A");
}
