import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  startOfWeek,
  eachDayOfInterval,
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  setDate,
} from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getMonthNumber = (month: string) => {
  if (month) return months.indexOf(month) + 1;
};

export const getMonthNameFromNumber = (monthNumber: number) => {
  return months[monthNumber - 1];
};

export function formatTodaysDate() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const dayName = days[today.getDay()];
  const date = today.getDate();
  const monthName = months[today.getMonth()];
  const year = today.getFullYear();

  return `${dayName}, ${date} ${monthName} ${year}`;
}

export async function delay(duration: number) {
  return new Promise((res) => setTimeout(res, duration));
}

export function getFullName(firstName: string, lastName?: string) {
  return [firstName, lastName ?? ""].join(" ");
}

export function getFullbackName(firstName: string, lastName?: string) {
  return [firstName[0], lastName?.[0] || ""].join(" ");
}

export function formatISODate(isoDate: string): string {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString(undefined, options);
}

export function formatISOToTime(isoDate: string): string {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleTimeString(undefined, options);
}

export const formatTime = (time: any) => {
  if (!time) return "-";
  const today = new Date().toISOString().split("T")[0];
  const dateTimeString = `${today}T${time}`;

  const dateObject = new Date(dateTimeString);
  return dateObject.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export function formatAdharNumber(value: string) {
  if (!value) return;
  value = value.replace(/\D/g, "");
  return value.match(/.{1,4}/g)?.join(" ") || "";
}

export function combineDateAndTime(date: Date, time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  const newDate = new Date(date);
  newDate.setHours(hours);
  newDate.setMinutes(minutes);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  return newDate;
}

export const getDatesPerWeekForCurrentMonth = ({
  selectedYear,
  selectedMonth,
}: {
  selectedYear: number;
  selectedMonth: number;
}) => {
  const today = new Date(selectedYear, selectedMonth - 1);
  const firstDayOfMonth = startOfMonth(today); // Date Tue Oct 01 2024 00:00:00 GMT+0530 (India Standard Time)
  const lastDayOfMonth = endOfMonth(today); // Date Thu Oct 31 2024 23:59:59 GMT+0530 (India Standard Time)

  const result = [];
  let currentWeekStart = startOfWeek(firstDayOfMonth, { weekStartsOn: 0 }); // Date Sun Sep 29 2024 00:00:00 GMT+0530 (India Standard Time) }

  while (currentWeekStart <= lastDayOfMonth) {
    const currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 0 }); // Date Sat Oct 5 2024 00:00:00 GMT+0530 (India Standard Time) }

    const weekDates = eachDayOfInterval({ start: currentWeekStart, end: currentWeekEnd })
      .filter((date) => isSameMonth(date, today))
      .map((date) => format(date, "dd EEE"));

    if (weekDates.length > 0) {
      result.push(weekDates);
    }

    currentWeekStart = addDays(currentWeekEnd, 1);
  }

  return result;
};

export const formatCurrency = (amount: number) => {
  if (isNaN(amount)) return null;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
