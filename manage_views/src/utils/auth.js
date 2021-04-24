const STORAGE = "sessionStorage";

export function getToken() {
  return window[STORAGE].getItem("token");
}

export function setToken(token) {
  return window[STORAGE].setItem("token", token);
}

export function removeToken() {
  return window[STORAGE].removeItem("token");
}
