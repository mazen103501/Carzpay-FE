export const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return ""; // Return empty string if null or undefined

  const date = new Date(dateTimeString);
  if (isNaN(date.getTime())) return ""; // Handle invalid date

  return date
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "UTC",
    })
    .replace(",", "")
    .replace(/[/]/g, "-");
};