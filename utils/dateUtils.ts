export function formatDate(creationTime: number): string {
  const date = new Date(creationTime);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(creationTime: number): string {
  const date = new Date(creationTime);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
