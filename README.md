# Credit Card Generator

A modern, production-ready credit card generator built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Generate valid credit card numbers using the Luhn algorithm
- Automatic card type detection (Visa, Mastercard, American Express, Discover, JCB, Diners Club, UnionPay, Maestro)
- Custom or random CVV generation
- Custom or random expiration date generation
- Batch generation (up to 100 cards at once)
- Export generated cards to CSV
- Dark theme with modern UI
- Fully responsive design

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Enter BIN**: Provide a Bank Identification Number (at least 6 digits)
2. **Set Quantity**: Choose how many cards to generate (1-100)
3. **Optional Customization**:
   - Enable "Custom CVV" to specify a CVV (otherwise randomly generated)
   - Enable "Custom Expiration Date" to set a specific date (otherwise randomly generated)
4. **Generate**: Click the "Generate Cards" button
5. **Export**: Use the "Export CSV" button to download all generated cards

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles with dark theme
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── input.tsx
│   │   └── label.tsx
│   ├── card-display.tsx  # Card results display
│   └── generator-form.tsx # Generator form
├── constants/            # Application constants
│   └── card-patterns.ts  # Card type patterns and rules
├── helpers/              # Helper functions
│   └── card-generator.ts # Card generation logic
├── lib/                  # Library utilities
│   └── utils.ts          # Utility functions
├── types/                # TypeScript types
│   └── card.ts           # Card-related types
└── utils/                # Utility functions
    ├── card-type.ts      # Card type detection
    ├── format.ts         # Formatting and validation
    └── luhn.ts           # Luhn algorithm implementation
```

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: react-icons
- **Algorithm**: Luhn algorithm for card validation

## Important Notice

This tool generates valid credit card numbers for **testing and development purposes only**:

- Numbers are mathematically valid but not linked to real accounts
- Cannot be used for actual purchases
- CVV and expiration dates are randomly generated
- Always use official test cards from payment processors for production testing

## License

This project is for educational and testing purposes only.

