export function formatStoryDateFromDate(date: Date) {
  const months = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ];

  return `${String(date.getDate()).padStart(2, "0")} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;
}

export function formatStoryDate() {
  return formatStoryDateFromDate(new Date());
}