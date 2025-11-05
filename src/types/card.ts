export interface CreditCard {
  number: string;
  cvv: string;
  expirationMonth: string;
  expirationYear: string;
  type: CardType;
}

export interface CardPattern {
  name: CardType;
  patterns: RegExp[];
  lengths: number[];
  cvvLength: number;
}

export type CardType =
  | "Visa"
  | "Mastercard"
  | "American Express"
  | "Discover"
  | "JCB"
  | "Diners Club"
  | "UnionPay"
  | "Maestro"
  | "Unknown";

export interface GeneratorFormData {
  bin: string;
  cvv: string;
  expirationMonth: string;
  expirationYear: string;
  quantity: number;
  customCvv: boolean;
  customExpiration: boolean;
}

