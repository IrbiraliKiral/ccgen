"use client";

import { useState, useMemo } from "react";
import { Bin } from "@/types/bin";

export type BinFilter = "all" | "Mastercard" | "UnionPay";

export function useBinFilters(bins: Bin[]) {
  const [filter, setFilter] = useState<BinFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBins = useMemo(() => {
    let filtered = bins;

    // Filter by type
    if (filter !== "all") {
      filtered = filtered.filter((bin) => bin.type === filter);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (bin) =>
          bin.bin.includes(query) ||
          bin.bank.toLowerCase().includes(query) ||
          bin.country.toLowerCase().includes(query) ||
          bin.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [bins, filter, searchQuery]);

  return {
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    filteredBins,
  };
}

