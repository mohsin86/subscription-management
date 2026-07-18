import { describe, it, expect } from "vitest";
import { SubscriptionSchema } from "../validation/subscription";

describe("SubscriptionSchema", () => {
  const validInput = {
    name: "Netflix",
    category: "Streaming",
    price: "15.49",
    currency: "USD",
    billingCycleMonths: "1",
    renewalDate: "2026-08-01",
  };

  it("accepts valid input and coerces strings to numbers/dates", () => {
    const result = SubscriptionSchema.safeParse(validInput);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.price).toBe(15.49);
      expect(result.data.billingCycleMonths).toBe(1);
      expect(result.data.renewalDate).toBeInstanceOf(Date);
    }
  });

  it("applies default values for autoRenew and reminderDaysBefore", () => {
    const result = SubscriptionSchema.safeParse(validInput);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.autoRenew).toBe(true);
      expect(result.data.reminderDaysBefore).toBe(7);
    }
  });

  it("rejects a missing name", () => {
    const result = SubscriptionSchema.safeParse({ ...validInput, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects a zero or negative price", () => {
    const result = SubscriptionSchema.safeParse({ ...validInput, price: "0" });
    expect(result.success).toBe(false);
  });

  it("rejects a billing cycle under 1 month", () => {
    const result = SubscriptionSchema.safeParse({ ...validInput, billingCycleMonths: "0" });
    expect(result.success).toBe(false);
  });

  it("accepts an empty string for the optional vendorUrl", () => {
    const result = SubscriptionSchema.safeParse({ ...validInput, vendorUrl: "" });
    expect(result.success).toBe(true);
  });

  it("rejects a malformed vendorUrl", () => {
    const result = SubscriptionSchema.safeParse({ ...validInput, vendorUrl: "not-a-url" });
    expect(result.success).toBe(false);
  });
});
