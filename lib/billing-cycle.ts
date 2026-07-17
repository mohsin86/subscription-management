/**
 * BILLING_CYCLE_OPTIONS — the billing cycle choices offered in the subscription form.
 */
export const BILLING_CYCLE_OPTIONS: { months: number; label: string }[] = [
  { months: 1, label: "Monthly" },
  { months: 2, label: "Every 2 months" },
  { months: 3, label: "Every 3 months" },
  { months: 6, label: "Every 6 months" },
  { months: 12, label: "Yearly" },
];

/**
 * formatBillingCycle — human-readable label for a billingCycleMonths value.
 * Args: months (number). Returns: e.g. "Monthly", "Yearly", or "Every 4 months" for anything not in BILLING_CYCLE_OPTIONS.
 */
export function formatBillingCycle(months: number): string {
  const known = BILLING_CYCLE_OPTIONS.find((option) => option.months === months);
  if (known) return known.label;
  return `Every ${months} month${months === 1 ? "" : "s"}`;
}
