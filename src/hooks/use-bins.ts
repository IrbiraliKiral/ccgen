"use client";

import { useState, useEffect } from "react";
import { Bin } from "@/types/bin";

export function useBins() {
  const [bins, setBins] = useState<Bin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBins() {
      try {
        const response = await fetch("/bins.json");
        if (!response.ok) {
          throw new Error("Failed to fetch bins");
        }
        const data = await response.json();
        setBins(data.bins || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load bins");
      } finally {
        setLoading(false);
      }
    }

    fetchBins();
  }, []);

  return { bins, loading, error };
}

