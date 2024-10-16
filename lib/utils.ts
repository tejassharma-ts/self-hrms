import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function getFullName(firstName: string, lastName: string) {
  return [firstName, lastName].join(" ");
}

export function getFullbackName(firstName: string, lastName: string) {
  return [firstName[0], lastName[0]].join(" ");
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
