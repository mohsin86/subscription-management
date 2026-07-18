import { describe, it, expect } from "vitest";
import { getSubscriptionStatus } from "../subscription-status";

describe("getSubscriptionStatus", () => {
  it("returns ACTIVE when renewal is far in the future", () => {
    const farFuture = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days out
    expect(getSubscriptionStatus(farFuture)).toBe("ACTIVE");
  });

  it("returns RENEWING_SOON when within the reminder window", () => {
    const soon = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days out
    expect(getSubscriptionStatus(soon, 7)).toBe("RENEWING_SOON");
  });

  it("returns EXPIRED when the renewal date has already passed", () => {
    const past = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000); // 1 day ago
    expect(getSubscriptionStatus(past)).toBe("EXPIRED");
  });

  it("respects a custom reminderDaysBefore", () => {
    const in10Days = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);
    expect(getSubscriptionStatus(in10Days, 7)).toBe("ACTIVE"); // outside a 7-day window
    expect(getSubscriptionStatus(in10Days, 14)).toBe("RENEWING_SOON"); // inside a 14-day window
  });

  it("accepts a date string, not just a Date object", () => {
    const soonString = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString();
    expect(getSubscriptionStatus(soonString, 7)).toBe("RENEWING_SOON");
  });
});
