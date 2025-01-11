// sum.test.js
import { describe, expect, it, test } from "vitest";
import { sum } from "./sum";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

describe("sample test", () => {
  it("should work", () => {
    expect(1).toBe(1);
  });

  it("should not work", () => {
    expect(1).not.toBe(2);
  });
});
