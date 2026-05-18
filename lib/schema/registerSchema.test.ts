import { describe, expect, it } from "vitest";
import { schema } from "./registerSchema";

const validData = {
  name: "john_doe",
  email: "john@stud.noroff.no",
  password: "password123",
};

describe("registerSchema - name", () => {
  it("accepts a valid name", () => {
    expect(schema.safeParse(validData).success).toBe(true);
  });

  it("rejects an empty name", () => {
    const result = schema.safeParse({ ...validData, name: "" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Name is required");
  });

  it("rejects a name with spaces", () => {
    const result = schema.safeParse({ ...validData, name: "john doe" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Name can only contain letters, numbers, and underscores",
    );
  });

  it("rejects a name with special characters", () => {
    const result = schema.safeParse({ ...validData, name: "john!" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Name can only contain letters, numbers, and underscores",
    );
  });

  it("accepts a name with underscores and numbers", () => {
    const result = schema.safeParse({ ...validData, name: "john_doe_42" });
    expect(result.success).toBe(true);
  });
});

describe("registerSchema - email", () => {
  it("accepts a valid @stud.noroff.no email", () => {
    expect(schema.safeParse(validData).success).toBe(true);
  });

  it("rejects a non-noroff email", () => {
    const result = schema.safeParse({ ...validData, email: "john@gmail.com" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Must be a @stud.noroff.no email",
    );
  });

  it("rejects an invalid email format", () => {
    const result = schema.safeParse({ ...validData, email: "not-an-email" });
    expect(result.success).toBe(false);
  });
});

describe("registerSchema - password", () => {
  it("accepts a password of exactly 8 characters", () => {
    const result = schema.safeParse({ ...validData, password: "12345678" });
    expect(result.success).toBe(true);
  });

  it("rejects a password shorter than 8 characters", () => {
    const result = schema.safeParse({ ...validData, password: "short" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Password must be at least 8 characters",
    );
  });
});

describe("registerSchema - optional fields", () => {
  it("accepts without optional fields", () => {
    expect(schema.safeParse(validData).success).toBe(true);
  });

  it("accepts a valid avatar URL", () => {
    const result = schema.safeParse({
      ...validData,
      avatar: { url: "https://example.com/avatar.jpg", alt: "My avatar" },
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid avatar URL", () => {
    const result = schema.safeParse({
      ...validData,
      avatar: { url: "not-a-url" },
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Avatar must be a valid URL");
  });

  it("rejects a bio over 160 characters", () => {
    const result = schema.safeParse({
      ...validData,
      bio: "a".repeat(161),
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Bio must be less than 160 characters",
    );
  });

  it("accepts venueManager as true", () => {
    const result = schema.safeParse({ ...validData, venueManager: true });
    expect(result.success).toBe(true);
  });
});
