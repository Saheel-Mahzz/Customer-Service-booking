const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
];

export function isDayAvailable(date: Date, availableDays: string[]): boolean {
  if (!availableDays) return false;
  if (availableDays.includes("Everyday")) return true;
  const dayName = DAY_NAMES[date.getDay()];
  return availableDays.includes(dayName);
}

export function isPastDate(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}