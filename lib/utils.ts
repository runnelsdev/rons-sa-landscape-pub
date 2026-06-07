export const fmtMoney = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);

export const fmtMoney0 = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const fmtDate = (iso?: string) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

export const fmtDateShort = (iso?: string) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const titleize = (s: string) =>
  s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const statusTone = (status: string): "good" | "warn" | "bad" | "neutral" => {
  switch (status) {
    case "paid":
    case "completed":
    case "in-service":
      return "good";
    case "in-progress":
    case "scheduled":
    case "needs-service":
      return "warn";
    case "in-shop":
    case "retired":
      return "bad";
    default:
      return "neutral";
  }
};
