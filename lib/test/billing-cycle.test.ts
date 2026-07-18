import { describe, it, expect } from "vitest";
import { formatBillingCycle } from "../billing-cycle";

describe("formatBillingCycle", () => {
  it("labels the known options", () => {
    expect(formatBillingCycle(1)).toBe("Monthly");
    expect(formatBillingCycle(2)).toBe("Every 2 months");
    expect(formatBillingCycle(3)).toBe("Every 3 months");
    expect(formatBillingCycle(6)).toBe("Every 6 months");
    expect(formatBillingCycle(12)).toBe("Yearly");
  });

  it("falls back to a generic label for an unlisted interval", () => {
    expect(formatBillingCycle(4)).toBe("Every 4 months");
  });
});
