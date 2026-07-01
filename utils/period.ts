import { formatStoryDateFromDate } from "@/utils/date";

export function getPeriodRange(period: string) {
  const endDate = new Date();
  const startDate = new Date();

  if (period === "7day") {
    startDate.setDate(endDate.getDate() - 7);
  }

  if (period === "1month") {
    startDate.setMonth(endDate.getMonth() - 1);
  }

  if (period === "6month") {
    startDate.setMonth(endDate.getMonth() - 6);
  }

  if (period === "12month") {
    startDate.setMonth(endDate.getMonth() - 12);
  }

  if (period === "overall") {
    return "Todo o tempo";
  }

  return `${formatStoryDateFromDate(startDate)} — ${formatStoryDateFromDate(endDate)}`;
}