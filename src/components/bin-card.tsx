"use client";

import Link from "next/link";
import { Bin } from "@/types/bin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaCreditCard, FaChartLine, FaGlobe } from "react-icons/fa";

interface BinCardProps {
  bin: Bin;
}

export function BinCard({ bin }: BinCardProps) {
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
    <Link href={`/bins/${bin.id}`}>
      <Card className="hover:bg-accent/50 transition-all cursor-pointer group h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <FaCreditCard className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl font-mono">{bin.bin}</CardTitle>
            </div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-md border ${getTypeColor(
                bin.type
              )}`}
            >
              {bin.type}
            </span>
          </div>
          <CardDescription className="line-clamp-2">{bin.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <FaGlobe className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{bin.bank}</span>
            <span className="text-muted-foreground">• {bin.country}</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2">
              <FaChartLine className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Success Rate</span>
            </div>
            <span className={`text-lg font-bold ${getSuccessRateColor(bin.successRate)}`}>
              {bin.successRate}%
            </span>
          </div>

          <div className="flex flex-wrap gap-1">
            {bin.services.slice(0, 3).map((service, index) => (
              <span
                key={index}
                className={`text-xs px-2 py-1 rounded-md ${
                  service.status === "working"
                    ? "bg-green-500/10 text-green-500"
                    : "bg-red-500/10 text-red-500"
                }`}
              >
                {service.name}
              </span>
            ))}
            {bin.services.length > 3 && (
              <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                +{bin.services.length - 3} more
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

