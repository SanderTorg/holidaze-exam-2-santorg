export function getUserFromLocalStorage() {
  if (typeof window === "undefined") {
    return null;
  }
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function setUserInLocalStorage(user: {
  id: number;
  name: string;
  email: string;
  token: string;
}) {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem("user", JSON.stringify(user));
}

export function getAccessTokenFromLocalStorage() {
  if (typeof window === "undefined") {
    return null;
  }
  const token = localStorage.getItem("accessToken");
  return token ? JSON.parse(token) : null;
}

export function setAccessTokenInLocalStorage(token: string) {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem("accessToken", JSON.stringify(token));
}
