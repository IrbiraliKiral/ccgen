"use client";

import { useState } from "react";
import { GeneratorForm } from "@/components/generator-form";
import { CardDisplay } from "@/components/card-display";
import { CreditCard } from "@/types/card";
import { generateCreditCards } from "@/helpers/card-generator";

export default function Home() {
  const [generatedCards, setGeneratedCards] = useState<CreditCard[]>([]);

  function handleGenerate(data: {
    bin: string;
    quantity: number;
    cvv?: string;
    expirationMonth?: string;
    expirationYear?: string;
  }) {
    try {
      const cards = generateCreditCards(
        data.bin,
        data.quantity,
        data.cvv,
        data.expirationMonth,
        data.expirationYear
      );
      setGeneratedCards(cards);
    } catch (error) {
      console.error("Error generating cards:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to generate cards. Please check your inputs."
      );
    }
  }

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Credit Card Generator
          </h1>
          <p className="text-muted-foreground">
            
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          <GeneratorForm onGenerate={handleGenerate} />
          <CardDisplay cards={generatedCards} />
        </div>
      </div>
    </main>
  );
}

