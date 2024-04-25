export function formatDate(inputDate: string): string {
  const dateParts: number[] = inputDate
    .split("-")
    .map((part) => parseInt(part, 10));
  const [year, month, day] = dateParts;

  const formattedDate = new Date(year, month - 1, day);

  const monthNames: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Format the date string
  const formattedString: string = `${
    monthNames[formattedDate.getMonth()]
  } ${formattedDate.getDate()}, ${formattedDate.getFullYear()}`;

  return formattedString;
}
