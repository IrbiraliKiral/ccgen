/**
 * Formats a card number with spaces for better readability
 */
export function formatCardNumber(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\D/g, "");
  const groups = cleaned.match(/.{1,4}/g);
  return groups ? groups.join(" ") : cleaned;
}

/**
 * Formats expiration date as MM/YY
 */
export function formatExpirationDate(month: string, year: string): string {
  const formattedMonth = month.padStart(2, "0");
  const formattedYear = year.slice(-2);
  return `${formattedMonth}/${formattedYear}`;
}

/**
 * Validates BIN format
 */
export function isValidBin(bin: string): boolean {
  const cleaned = bin.replace(/\D/g, "");
  return cleaned.length >= 6 && /^\d+$/.test(cleaned);
}

/**
 * Validates CVV format
 */
export function isValidCvv(cvv: string, length: number = 3): boolean {
  return cvv.length === length && /^\d+$/.test(cvv);
}

/**
 * Validates expiration month
 */
export function isValidMonth(month: string): boolean {
  const monthNum = parseInt(month, 10);
  return monthNum >= 1 && monthNum <= 12;
}

/**
 * Validates expiration year
 */
export function isValidYear(year: string): boolean {
  const currentYear = new Date().getFullYear();
  const yearNum = parseInt(year, 10);
  return yearNum >= currentYear && yearNum <= currentYear + 20;
}

