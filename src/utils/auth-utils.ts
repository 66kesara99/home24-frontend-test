const AUTH_TOKEN_NAME = "auth-token";

export function saveAuthToken(token: string) {
  localStorage.setItem(AUTH_TOKEN_NAME, token);
}

export function checkAuthToken() {
  return !!localStorage.getItem(AUTH_TOKEN_NAME);
}

export function removeAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_NAME);
}
