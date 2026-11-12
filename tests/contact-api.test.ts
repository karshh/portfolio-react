import { describe, expect, it } from "vitest";
import { validateContactMessage } from "../server/contact-api";

const valid = { name: "Karsh", email: "karsh@example.com", subject: "Hello", message: "Test", website: "", turnstileToken: "token" };
describe("validateContactMessage", () => {
  it("accepts a valid message", () => expect(validateContactMessage(valid)).toEqual(valid));
  it("rejects the spam honeypot", () => expect(validateContactMessage({ ...valid, website: "spam" })).toBeNull());
  it("rejects an invalid email", () => expect(validateContactMessage({ ...valid, email: "invalid" })).toBeNull());
});
