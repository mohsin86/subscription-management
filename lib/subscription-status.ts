/*
Takes Date | string since the subscriptions list page gets renewalDate as a JSON string (via the API route), 
while the dashboard/detail pages get a real Date from Prisma directly.
*/

export type SubscriptionStatus = "ACTIVE" | "RENEWING_SOON" | "EXPIRED";

const DEFAULT_REMINDER_DAYS = 7;

/**
 * getSubscriptionStatus — classifies a subscription's renewal state.
 * Args: renewalDate (Date | string), reminderDaysBefore (days before renewal counted as "soon", default 7)
 * Returns: "ACTIVE" | "RENEWING_SOON" | "EXPIRED"
 */
export function getSubscriptionStatus(
  renewalDate: Date | string,
  reminderDaysBefore: number = DEFAULT_REMINDER_DAYS
): SubscriptionStatus {
  const renewal = new Date(renewalDate);
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysUntilRenewal = (renewal.getTime() - now.getTime()) / msPerDay;

  if (daysUntilRenewal < 0) return "EXPIRED";
  if (daysUntilRenewal <= reminderDaysBefore) return "RENEWING_SOON";
  return "ACTIVE";
}

export const STATUS_LABEL: Record<SubscriptionStatus, string> = {
  ACTIVE: "Active",
  RENEWING_SOON: "Renewing soon",
  EXPIRED: "Expired",
};

export const STATUS_COLOR: Record<SubscriptionStatus, string> = {
  ACTIVE: "text-green-600",
  RENEWING_SOON: "text-yellow-600",
  EXPIRED: "text-red-600",
};
