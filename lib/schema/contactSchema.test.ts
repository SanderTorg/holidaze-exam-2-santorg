import { describe, expect, it } from "vitest";
import { contactSchema } from "./contactSchema";

const validData = {
  fullName: "Ola Nordmann",
  email: "ola@example.com",
  subject: "Hello there",
  message: "This is a test message that is long enough.",
};

describe("contactSchema - fullName", () => {
  it("accepts a valid full name", () => {
    expect(contactSchema.safeParse(validData).success).toBe(true);
  });

  it("rejects a name shorter than 3 characters", () => {
    const result = contactSchema.safeParse({ ...validData, fullName: "Ol" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Full name must be at least 3 characters long",
    );
  });

  it("rejects a name with invalid characters", () => {
    const result = contactSchema.safeParse({
      ...validData,
      fullName: "Ola123!",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Full name must not contain invalid characters",
    );
  });

  it("accepts names with Norwegian characters", () => {
    const result = contactSchema.safeParse({
      ...validData,
      fullName: "Åse Æbleskive Ørsted",
    });
    expect(result.success).toBe(true);
  });
});

describe("contactSchema - email", () => {
  it("accepts a valid email", () => {
    expect(contactSchema.safeParse(validData).success).toBe(true);
  });

  it("rejects an invalid email format", () => {
    const result = contactSchema.safeParse({
      ...validData,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an empty email", () => {
    const result = contactSchema.safeParse({ ...validData, email: "" });
    expect(result.success).toBe(false);
  });
});

describe("contactSchema - subject", () => {
  it("rejects a subject shorter than 3 characters", () => {
    const result = contactSchema.safeParse({ ...validData, subject: "Hi" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Subject must be at least 3 characters long",
    );
  });

  it("accepts a subject of exactly 3 characters", () => {
    const result = contactSchema.safeParse({ ...validData, subject: "Hey" });
    expect(result.success).toBe(true);
  });
});

describe("contactSchema - message", () => {
  it("rejects a message shorter than 10 characters", () => {
    const result = contactSchema.safeParse({
      ...validData,
      message: "Too short",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Message must be at least 10 characters long",
    );
  });

  it("accepts a message of exactly 10 characters", () => {
    const result = contactSchema.safeParse({
      ...validData,
      message: "1234567890",
    });
    expect(result.success).toBe(true);
  });
});
