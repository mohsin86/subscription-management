/**
 * buildGoogleCalendarUrl — builds a Google Calendar "quick add event" link for a subscription renewal.
 * Args: name, price, currency (strings), renewalDate (Date). Returns: a calendar.google.com URL.
 */
export function buildGoogleCalendarUrl(
  name: string,
  price: string,
  currency: string,
  renewalDate: Date
): string {
  const start = renewalDate.toISOString().slice(0, 10).replace(/-/g, "");
  const endDate = new Date(renewalDate);
  endDate.setDate(endDate.getDate() + 1);
  const end = endDate.toISOString().slice(0, 10).replace(/-/g, "");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${name} renews`,
    dates: `${start}/${end}`,
    details: `${name} subscription renews today — ${price} ${currency}.`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
