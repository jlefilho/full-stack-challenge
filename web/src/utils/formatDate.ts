export function formatIsoDateToReadable(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
