import { describe, expect, it } from "vitest";
import { formatCalgaryTime } from "../app/lib/time";

describe("formatCalgaryTime", () => {
  it("uses Mountain Daylight Time before permanent Alberta time", () => {
    expect(formatCalgaryTime(new Date("2026-07-01T18:00:00Z"))).toMatch(/^12:00:00 p\.m\.$|^12:00:00 PM$/i);
  });
  it("uses UTC-6 after the permanent Alberta time transition", () => {
    expect(formatCalgaryTime(new Date("2026-12-01T18:00:00Z"))).toMatch(/^12:00:00 p\.m\.$|^12:00:00 PM$/i);
  });
});
