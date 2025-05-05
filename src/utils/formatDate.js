import dayjs from "dayjs";

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
