export interface BinService {
  name: string;
  status: "working" | "not_working" | "unknown";
  lastChecked: string;
}

export interface Bin {
  id: string;
  bin: string;
  type: "Mastercard" | "UnionPay";
  bank: string;
  country: string;
  successRate: number;
  description: string;
  services: BinService[];
}

export interface BinsData {
  bins: Bin[];
}

