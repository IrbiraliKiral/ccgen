"use client";

import { useBins } from "@/hooks/use-bins";
import { useBinFilters, BinFilter } from "@/hooks/use-bin-filters";
import { BinCard } from "@/components/bin-card";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch, FaFilter } from "react-icons/fa";
import { cn } from "@/lib/utils";

export default function BinsPage() {
  const { bins, loading, error } = useBins();
  const { filter, setFilter, searchQuery, setSearchQuery, filteredBins } =
    useBinFilters(bins);

  const filterOptions: { value: BinFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "Mastercard", label: "Mastercard" },
    { value: "UnionPay", label: "UnionPay" },
  ];

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-2">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground">Loading BINs...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-destructive font-medium">Error loading BINs</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">BIN Database</h1>
          <p className="text-muted-foreground">
            Browse working BIN numbers with success rates and supported services
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by BIN, bank, country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap">
            <FaFilter className="h-4 w-4 text-muted-foreground" />
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                variant={filter === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(option.value)}
                className={cn(
                  "transition-all",
                  filter === option.value && "shadow-md"
                )}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {filteredBins.length === 0 ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  No BINs found matching your criteria
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBins.map((bin) => (
              <BinCard key={bin.id} bin={bin} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Showing {filteredBins.length} of {bins.length} BIN{bins.length !== 1 && "s"}
          </p>
        </div>
      </div>
    </main>
  );
}

