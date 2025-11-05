"use client";

import { CreditCard } from "@/types/card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCardNumber, formatExpirationDate } from "@/utils/format";
import { FaCopy, FaCheckCircle, FaDownload } from "react-icons/fa";
import { useState } from "react";

interface CardDisplayProps {
  cards: CreditCard[];
}

export function CardDisplay({ cards }: CardDisplayProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  async function copyToClipboard(text: string, index: number) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  function exportCards() {
    const csvContent = [
      "Card Number,CVV,Expiration,Type",
      ...cards.map((card) =>
        [
          card.number,
          card.cvv,
          formatExpirationDate(card.expirationMonth, card.expirationYear),
          card.type,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `credit-cards-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  if (cards.length === 0) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl">
          Generated Cards ({cards.length})
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={exportCards}
          className="gap-2"
        >
          <FaDownload className="h-4 w-4" />
          Export CSV
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {cards.map((card, index) => (
            <div
              key={index}
              className="relative group rounded-lg border bg-card p-4 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      #{index + 1}
                    </span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                      {card.type}
                    </span>
                  </div>
                  
                  <div className="font-mono text-lg tracking-wider">
                    {formatCardNumber(card.number)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">CVV: </span>
                      <span className="font-mono">{card.cvv}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expires: </span>
                      <span className="font-mono">
                        {formatExpirationDate(
                          card.expirationMonth,
                          card.expirationYear
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    copyToClipboard(
                      `${card.number}|${card.cvv}|${formatExpirationDate(
                        card.expirationMonth,
                        card.expirationYear
                      )}`,
                      index
                    )
                  }
                  className="shrink-0"
                >
                  {copiedIndex === index ? (
                    <FaCheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <FaCopy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

