"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaCreditCard } from "react-icons/fa";
import { isValidBin, isValidMonth, isValidYear, isValidCvv } from "@/utils/format";
import { getCardPatternFromBin } from "@/utils/card-type";
import { MIN_BIN_LENGTH, MIN_QUANTITY, MAX_QUANTITY } from "@/constants/card-patterns";

interface GeneratorFormProps {
  onGenerate: (data: {
    bin: string;
    quantity: number;
    cvv?: string;
    expirationMonth?: string;
    expirationYear?: string;
  }) => void;
  initialBin?: string;
}

export function GeneratorForm({ onGenerate, initialBin }: GeneratorFormProps) {
  const [bin, setBin] = useState("");
  const [quantity, setQuantity] = useState(10);
  const [customCvv, setCustomCvv] = useState(false);
  const [cvv, setCvv] = useState("");
  const [customExpiration, setCustomExpiration] = useState(false);
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Set initial BIN if provided
  useEffect(() => {
    if (initialBin && !bin) {
      setBin(initialBin);
    }
  }, [initialBin, bin]);

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (!bin || bin.replace(/\D/g, "").length < MIN_BIN_LENGTH) {
      newErrors.bin = `BIN must be at least ${MIN_BIN_LENGTH} digits`;
    } else if (!isValidBin(bin)) {
      newErrors.bin = "BIN must contain only digits";
    }

    if (quantity < MIN_QUANTITY || quantity > MAX_QUANTITY) {
      newErrors.quantity = `Quantity must be between ${MIN_QUANTITY} and ${MAX_QUANTITY}`;
    }

    if (customCvv) {
      const pattern = getCardPatternFromBin(bin);
      const cvvLength = pattern?.cvvLength || 3;
      
      if (!cvv) {
        newErrors.cvv = "CVV is required";
      } else if (!isValidCvv(cvv, cvvLength)) {
        newErrors.cvv = `CVV must be ${cvvLength} digits`;
      }
    }

    if (customExpiration) {
      if (!expirationMonth) {
        newErrors.expirationMonth = "Month is required";
      } else if (!isValidMonth(expirationMonth)) {
        newErrors.expirationMonth = "Invalid month (1-12)";
      }

      if (!expirationYear) {
        newErrors.expirationYear = "Year is required";
      } else if (!isValidYear(expirationYear)) {
        newErrors.expirationYear = "Invalid year";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const cleanBin = bin.replace(/\D/g, "");

    onGenerate({
      bin: cleanBin,
      quantity,
      cvv: customCvv ? cvv : undefined,
      expirationMonth: customExpiration ? expirationMonth : undefined,
      expirationYear: customExpiration ? expirationYear : undefined,
    });
  }

  function handleBinChange(value: string) {
    const cleaned = value.replace(/\D/g, "");
    setBin(cleaned);
    if (errors.bin) {
      setErrors({ ...errors, bin: "" });
    }
  }

  function handleQuantityChange(value: string) {
    const num = parseInt(value) || 0;
    setQuantity(num);
    if (errors.quantity) {
      setErrors({ ...errors, quantity: "" });
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FaCreditCard className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Credit Card Generator</CardTitle>
        </div>
        <CardDescription>
          Generate valid credit card numbers for testing purposes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bin">
              BIN (Bank Identification Number) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="bin"
              placeholder="Enter at least 6 digits"
              value={bin}
              onChange={(e) => handleBinChange(e.target.value)}
              maxLength={16}
            />
            {errors.bin && (
              <p className="text-sm text-destructive">{errors.bin}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">
              Quantity <span className="text-destructive">*</span>
            </Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Number of cards to generate"
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              min={MIN_QUANTITY}
              max={MAX_QUANTITY}
            />
            {errors.quantity && (
              <p className="text-sm text-destructive">{errors.quantity}</p>
            )}
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="customCvv"
                checked={customCvv}
                onCheckedChange={(checked) => {
                  setCustomCvv(checked as boolean);
                  if (!checked) {
                    setCvv("");
                    setErrors({ ...errors, cvv: "" });
                  }
                }}
              />
              <Label htmlFor="customCvv" className="cursor-pointer">
                Custom CVV
              </Label>
            </div>

            {customCvv && (
              <div className="space-y-2 ml-6">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="Enter CVV"
                  value={cvv}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, "");
                    setCvv(cleaned);
                    if (errors.cvv) {
                      setErrors({ ...errors, cvv: "" });
                    }
                  }}
                  maxLength={4}
                />
                {errors.cvv && (
                  <p className="text-sm text-destructive">{errors.cvv}</p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="customExpiration"
                checked={customExpiration}
                onCheckedChange={(checked) => {
                  setCustomExpiration(checked as boolean);
                  if (!checked) {
                    setExpirationMonth("");
                    setExpirationYear("");
                    setErrors({
                      ...errors,
                      expirationMonth: "",
                      expirationYear: "",
                    });
                  }
                }}
              />
              <Label htmlFor="customExpiration" className="cursor-pointer">
                Custom Expiration Date
              </Label>
            </div>

            {customExpiration && (
              <div className="grid grid-cols-2 gap-4 ml-6">
                <div className="space-y-2">
                  <Label htmlFor="expirationMonth">Month</Label>
                  <Input
                    id="expirationMonth"
                    placeholder="MM"
                    value={expirationMonth}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/\D/g, "");
                      setExpirationMonth(cleaned);
                      if (errors.expirationMonth) {
                        setErrors({ ...errors, expirationMonth: "" });
                      }
                    }}
                    maxLength={2}
                  />
                  {errors.expirationMonth && (
                    <p className="text-sm text-destructive">
                      {errors.expirationMonth}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expirationYear">Year</Label>
                  <Input
                    id="expirationYear"
                    placeholder="YYYY"
                    value={expirationYear}
                    onChange={(e) => {
                      const cleaned = e.target.value.replace(/\D/g, "");
                      setExpirationYear(cleaned);
                      if (errors.expirationYear) {
                        setErrors({ ...errors, expirationYear: "" });
                      }
                    }}
                    maxLength={4}
                  />
                  {errors.expirationYear && (
                    <p className="text-sm text-destructive">
                      {errors.expirationYear}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" size="lg">
            Generate Cards
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

