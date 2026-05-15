import { beforeEach, describe, expect, it } from "vitest";

import { useUserStore } from "./useUserStore";

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  accessToken: "token-123",
  venueManager: false,
  avatar: { url: "https://example.com/avatar.jpg", alt: "John's avatar" },
  banner: { url: "https://example.com/banner.jpg", alt: "John's banner" },
};

beforeEach(() => {
  useUserStore.getState().clearUser();
});

describe("useUserStore - setUser", () => {
  it("sets user fields and marks isLoggedIn as true", () => {
    useUserStore.getState().setUser(mockUser);
    const state = useUserStore.getState();

    expect(state.name).toBe("John Doe");
    expect(state.email).toBe("john@example.com");
    expect(state.accessToken).toBe("token-123");
    expect(state.venueManager).toBe(false);
    expect(state.isLoggedIn).toBe(true);
  });

  it("sets avatar and banner", () => {
    useUserStore.getState().setUser(mockUser);
    const state = useUserStore.getState();

    expect(state.avatar?.url).toBe("https://example.com/avatar.jpg");
    expect(state.banner?.url).toBe("https://example.com/banner.jpg");
  });

  it("sets venueManager to true when provided", () => {
    useUserStore.getState().setUser({ ...mockUser, venueManager: true });
    expect(useUserStore.getState().venueManager).toBe(true);
  });
});

describe("useUserStore - clearUser", () => {
  it("resets all fields to default values", () => {
    useUserStore.getState().setUser(mockUser);
    useUserStore.getState().clearUser();
    const state = useUserStore.getState();

    expect(state.name).toBe("");
    expect(state.email).toBe("");
    expect(state.accessToken).toBe("");
    expect(state.venueManager).toBe(false);
    expect(state.isLoggedIn).toBe(false);
    expect(state.avatar).toBeUndefined();
    expect(state.banner).toBeUndefined();
  });

  it("sets isLoggedIn to false after logout", () => {
    useUserStore.getState().setUser(mockUser);
    expect(useUserStore.getState().isLoggedIn).toBe(true);

    useUserStore.getState().clearUser();
    expect(useUserStore.getState().isLoggedIn).toBe(false);
  });
});
