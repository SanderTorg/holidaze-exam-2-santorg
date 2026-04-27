import { describe, it, expect } from "vitest";
import { vitestFunction } from "./vitest";

describe("vitestFunction", () => {
  it("should add two numbers", () => {
    const result = vitestFunction(2, 3);
    expect(result).toBe(5);
  });
});
