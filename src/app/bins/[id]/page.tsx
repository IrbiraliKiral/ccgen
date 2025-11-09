"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Bin } from "@/types/bin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FaCreditCard,
  FaChartLine,
  FaGlobe,
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCopy,
} from "react-icons/fa";

export default function BinDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [bin, setBin] = useState<Bin | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchBin() {
      try {
        const response = await fetch("/bins.json");
        if (!response.ok) {
          throw new Error("Failed to fetch bins");
        }
        const data = await response.json();
        const foundBin = data.bins.find((b: Bin) => b.id === params.id);
        setBin(foundBin || null);
      } catch (err) {
        console.error("Error fetching bin:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBin();
  }, [params.id]);

  async function copyBin() {
    if (!bin) return;
    try {
      await navigator.clipboard.writeText(bin.bin);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-2">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Loading BIN details...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!bin) {
    return (
      <main className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">BIN not found</p>
                <Button onClick={() => router.push("/bins")} variant="outline">
                  <FaArrowLeft className="mr-2 h-4 w-4" />
                  Back to BINs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 80) return "text-green-500";
    if (rate >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getTypeColor = (type: string) => {
    if (type === "Mastercard") return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    if (type === "UnionPay") return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    return "bg-gray-500/10 text-gray-500 border-gray-500/20";
  };

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button
          onClick={() => router.push("/bins")}
          variant="ghost"
          className="mb-6"
        >
          <FaArrowLeft className="mr-2 h-4 w-4" />
          Back to BINs
        </Button>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <FaCreditCard className="h-6 w-6 text-primary" />
                    <CardTitle className="text-3xl font-mono">{bin.bin}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={copyBin}
                      className="h-8 w-8"
                    >
                      {copied ? (
                        <FaCheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <FaCopy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <CardDescription className="text-base">{bin.description}</CardDescription>
                </div>
                <span
                  className={`text-sm font-medium px-3 py-1.5 rounded-lg border ${getTypeColor(
                    bin.type
                  )}`}
                >
                  {bin.type}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FaGlobe className="h-4 w-4" />
                    <span className="text-sm font-medium">Bank Information</span>
                  </div>
                  <div className="pl-6 space-y-1">
                    <p className="font-medium">{bin.bank}</p>
                    <p className="text-sm text-muted-foreground">{bin.country}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FaChartLine className="h-4 w-4" />
                    <span className="text-sm font-medium">Success Rate</span>
                  </div>
                  <div className="pl-6">
                    <p className={`text-3xl font-bold ${getSuccessRateColor(bin.successRate)}`}>
                      {bin.successRate}%
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Supported Services</CardTitle>
              <CardDescription>
                Services tested with this BIN and their current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bin.services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {service.status === "working" ? (
                        <FaCheckCircle className="h-5 w-5 text-green-500" />
                      ) : service.status === "not_working" ? (
                        <FaTimesCircle className="h-5 w-5 text-red-500" />
                      ) : (
                        <FaClock className="h-5 w-5 text-yellow-500" />
                      )}
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Last checked: {new Date(service.lastChecked).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        service.status === "working"
                          ? "bg-green-500/10 text-green-500"
                          : service.status === "not_working"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {service.status === "working"
                        ? "Working"
                        : service.status === "not_working"
                        ? "Not Working"
                        : "Unknown"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <FaCreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Need to generate cards?</p>
                  <p className="text-sm text-muted-foreground">
                    Use this BIN in the generator to create test credit card numbers
                  </p>
                  <Button
                    onClick={() => router.push(`/?bin=${bin.bin}`)}
                    variant="outline"
                    size="sm"
                    className="mt-2"
                  >
                    Generate Cards
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

