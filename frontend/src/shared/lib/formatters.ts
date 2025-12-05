
export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "-";

  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) return "-";

  return d.toLocaleDateString("pt-BR");
}


export function formatDateTime(date: string | Date | null | undefined): string {
  if (!date) return "-";

  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) return "-";

  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined) return "R$ 0,00";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return "0";

  return new Intl.NumberFormat("pt-BR").format(value);
}

export function truncate(
  text: string | null | undefined,
  maxLength: number
): string {
  if (!text) return "-";
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}
export function capitalize(text: string | null | undefined): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function removeAccents(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
