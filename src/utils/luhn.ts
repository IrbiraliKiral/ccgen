/**
 * Validates a credit card number using the Luhn algorithm
 */
export function validateLuhn(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, "");

  if (digits.length < 13) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Calculates the Luhn check digit for a partial card number
 */
export function calculateLuhnCheckDigit(partialCardNumber: string): string {
  const digits = partialCardNumber.replace(/\D/g, "");
  let sum = 0;
  let isEven = true;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit.toString();
}

/**
 * Completes a partial card number with the Luhn check digit
 */
export function completeLuhn(partialCardNumber: string): string {
  const checkDigit = calculateLuhnCheckDigit(partialCardNumber);
  return partialCardNumber + checkDigit;
}

