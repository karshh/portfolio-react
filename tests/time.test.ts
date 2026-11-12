import { describe, expect, it } from "vitest";
import { formatCalgaryTime } from "../app/lib/time";

describe("formatCalgaryTime", () => {
  it("uses Mountain Daylight Time before permanent Alberta time", () => {
    expect(formatCalgaryTime(new Date("2026-07-01T18:00:00Z"))).toMatch(/^12:00:00 p\.m\.$|^12:00:00 PM$/i);
  });
  it("uses UTC-6 after the permanent Alberta time transition", () => {
    expect(formatCalgaryTime(new Date("2026-12-01T18:00:00Z"))).toMatch(/^12:00:00 p\.m\.$|^12:00:00 PM$/i);
  });

  it("does not move backward at the November 2026 transition", () => {
    expect(formatCalgaryTime(new Date("2026-11-01T07:59:59Z"))).toMatch(/^1:59:59 a\.m\.$|^1:59:59 AM$/i);
    expect(formatCalgaryTime(new Date("2026-11-01T08:00:00Z"))).toMatch(/^2:00:00 a\.m\.$|^2:00:00 AM$/i);
  });
});
