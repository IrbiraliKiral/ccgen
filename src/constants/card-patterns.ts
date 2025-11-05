import { CardPattern } from "@/types/card";

export const CARD_PATTERNS: CardPattern[] = [
  {
    name: "Visa",
    patterns: [/^4/],
    lengths: [13, 16, 19],
    cvvLength: 3,
  },
  {
    name: "Mastercard",
    patterns: [/^5[1-5]/, /^2[2-7]/],
    lengths: [16],
    cvvLength: 3,
  },
  {
    name: "American Express",
    patterns: [/^3[47]/],
    lengths: [15],
    cvvLength: 4,
  },
  {
    name: "Discover",
    patterns: [/^6(?:011|5)/, /^64[4-9]/, /^65/],
    lengths: [16, 19],
    cvvLength: 3,
  },
  {
    name: "JCB",
    patterns: [/^35/],
    lengths: [16, 19],
    cvvLength: 3,
  },
  {
    name: "Diners Club",
    patterns: [/^3(?:0[0-5]|[68])/, /^36/],
    lengths: [14, 16, 19],
    cvvLength: 3,
  },
  {
    name: "UnionPay",
    patterns: [/^62/],
    lengths: [16, 17, 18, 19],
    cvvLength: 3,
  },
  {
    name: "Maestro",
    patterns: [/^(?:5[06789]|6)/],
    lengths: [12, 13, 14, 15, 16, 17, 18, 19],
    cvvLength: 3,
  },
];

export const DEFAULT_CARD_LENGTH = 16;
export const MIN_BIN_LENGTH = 6;
export const MAX_QUANTITY = 100;
export const MIN_QUANTITY = 1;

