export const convertDateTo12hFormat = (date: Date) => {
  let hours = date.getHours();
  const currentHour = new Date().getHours();

  if (currentHour === hours) return "Now";

  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${hours} ${amPm}`;
};

export const getDayOfWeek = (date: Date): [string, boolean] => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let isToday = new Date().getDate() === date.getDate();

  return [days[date.getDay()], isToday];
};
