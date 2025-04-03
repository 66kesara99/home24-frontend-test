import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  checkAuthToken,
  removeAuthToken,
  saveAuthToken,
} from "../../utils/auth-utils";

const localStorageMock = {
  store: {} as Record<string, string>,
  getItem: vi.fn((key: string) => localStorageMock.store[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    localStorageMock.store[key] = value.toString();
  }),
  removeItem: vi.fn((key: string) => {
    delete localStorageMock.store[key];
  }),
  clear: vi.fn(() => {
    localStorageMock.store = {};
  }),
};

vi.stubGlobal("localStorage", localStorageMock);

describe("Auth Utils", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe("saveAuthToken", () => {
    it("should save the token to localStorage", () => {
      const testToken = "test-token-123";
      saveAuthToken(testToken);
      expect(localStorage.getItem("auth-token")).toBe(testToken);
    });
  });

  describe("checkAuthToken", () => {
    it("should return true when token exists", () => {
      const testToken = "test-token-123";
      localStorage.setItem("auth-token", testToken);
      expect(checkAuthToken()).toBe(true);
    });

    it("should return false when token does not exist", () => {
      expect(checkAuthToken()).toBe(false);
    });
  });

  describe("removeAuthToken", () => {
    it("should remove the token from localStorage", () => {
      const testToken = "test-token-123";
      localStorage.setItem("auth-token", testToken);
      removeAuthToken();
      expect(localStorage.getItem("auth-token")).toBeNull();
    });
  });
});
