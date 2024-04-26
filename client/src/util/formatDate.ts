export function formatDate(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
  
    return `${formattedHours}:${formattedMinutes} ${amOrPm} ${month} ${day}, ${year}`;
  }
  