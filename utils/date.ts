export function formatStoryDate() {
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

  const date = new Date();

  return `${String(date.getDate()).padStart(2, "0")} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;
}