import { CARD_PATTERNS } from "@/constants/card-patterns";
import { CardType, CardPattern } from "@/types/card";

/**
 * Detects the card type based on the card number
 */
export function detectCardType(cardNumber: string): CardType {
  const cleanNumber = cardNumber.replace(/\D/g, "");

  for (const pattern of CARD_PATTERNS) {
    for (const regex of pattern.patterns) {
      if (regex.test(cleanNumber)) {
        return pattern.name;
      }
    }
  }

  return "Unknown";
}

/**
 * Gets the card pattern configuration for a specific card type
 */
export function getCardPattern(cardType: CardType): CardPattern | undefined {
  return CARD_PATTERNS.find((pattern) => pattern.name === cardType);
}

/**
 * Gets the card pattern configuration based on BIN
 */
export function getCardPatternFromBin(bin: string): CardPattern | undefined {
  const cardType = detectCardType(bin);
  return getCardPattern(cardType);
}

/**
 * Determines the appropriate card length based on BIN and card type
 */
export function determineCardLength(bin: string): number {
  const pattern = getCardPatternFromBin(bin);
  
  if (!pattern) {
    return 16; // Default length
  }

  // Return the most common length for the card type
  return pattern.lengths.includes(16) ? 16 : pattern.lengths[0];
}

