import { CreditCard } from "@/types/card";
import { completeLuhn } from "@/utils/luhn";
import { detectCardType, determineCardLength } from "@/utils/card-type";
import { getCardPatternFromBin } from "@/utils/card-type";

/**
 * Generates a random digit string of specified length
 */
function generateRandomDigits(length: number): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
}

/**
 * Generates a random CVV
 */
export function generateRandomCvv(length: number = 3): string {
  return generateRandomDigits(length);
}

/**
 * Generates a random expiration date (month and year)
 */
export function generateRandomExpiration(): {
  month: string;
  year: string;
} {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  // Generate a date 1-5 years in the future
  const yearsToAdd = Math.floor(Math.random() * 5) + 1;
  const year = currentYear + yearsToAdd;

  // Generate a random month
  let month = Math.floor(Math.random() * 12) + 1;

  // If it's the current year, make sure month is in the future
  if (year === currentYear && month < currentMonth) {
    month = currentMonth + Math.floor(Math.random() * (12 - currentMonth + 1));
  }

  return {
    month: month.toString().padStart(2, "0"),
    year: year.toString(),
  };
}

/**
 * Generates a complete credit card number from a BIN
 */
export function generateCardNumber(bin: string): string {
  const cleanBin = bin.replace(/\D/g, "");
  const cardLength = determineCardLength(cleanBin);

  // Calculate how many random digits we need (excluding the check digit)
  const digitsNeeded = cardLength - cleanBin.length - 1;

  if (digitsNeeded < 0) {
    throw new Error("BIN is too long for the card type");
  }

  // Generate random middle digits
  const randomDigits = generateRandomDigits(digitsNeeded);

  // Combine BIN and random digits, then add Luhn check digit
  const partialNumber = cleanBin + randomDigits;
  return completeLuhn(partialNumber);
}

/**
 * Generates multiple credit cards based on parameters
 */
export function generateCreditCards(
  bin: string,
  quantity: number,
  customCvv?: string,
  customMonth?: string,
  customYear?: string
): CreditCard[] {
  const cards: CreditCard[] = [];
  const pattern = getCardPatternFromBin(bin);
  const cvvLength = pattern?.cvvLength || 3;

  for (let i = 0; i < quantity; i++) {
    const cardNumber = generateCardNumber(bin);
    const cardType = detectCardType(cardNumber);

    let cvv: string;
    let month: string;
    let year: string;

    if (customCvv) {
      cvv = customCvv;
    } else {
      cvv = generateRandomCvv(cvvLength);
    }

    if (customMonth && customYear) {
      month = customMonth;
      year = customYear;
    } else {
      const expiration = generateRandomExpiration();
      month = expiration.month;
      year = expiration.year;
    }

    cards.push({
      number: cardNumber,
      cvv,
      expirationMonth: month,
      expirationYear: year,
      type: cardType,
    });
  }

  return cards;
}

