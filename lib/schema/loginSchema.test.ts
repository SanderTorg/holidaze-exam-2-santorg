import { describe, expect, it } from "vitest";
import { loginSchema } from "./loginSchema";

const validData = {
  email: "user@stud.noroff.no",
  password: "secret123",
};

describe("loginSchema - email", () => {
  it("accepts a valid email", () => {
    expect(loginSchema.safeParse(validData).success).toBe(true);
  });

  it("rejects an invalid email format", () => {
    const result = loginSchema.safeParse({
      ...validData,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Invalid email address");
  });

  it("rejects a non-noroff email", () => {
    const result = loginSchema.safeParse({
      ...validData,
      email: "user@gmail.com",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Must be a @stud.noroff.no email",
    );
  });

  it("rejects an empty email", () => {
    const result = loginSchema.safeParse({ ...validData, email: "" });
    expect(result.success).toBe(false);
  });
});

describe("loginSchema - password", () => {
  it("accepts a password of exactly 6 characters", () => {
    const result = loginSchema.safeParse({ ...validData, password: "abc123" });
    expect(result.success).toBe(true);
  });

  it("accepts a password longer than 6 characters", () => {
    const result = loginSchema.safeParse({
      ...validData,
      password: "longerpassword",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a password shorter than 6 characters", () => {
    const result = loginSchema.safeParse({ ...validData, password: "ab12" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Password must be at least 6 characters",
    );
  });

  it("rejects an empty password", () => {
    const result = loginSchema.safeParse({ ...validData, password: "" });
    expect(result.success).toBe(false);
  });
});
