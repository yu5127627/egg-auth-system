import request from "./config";

export const login = (data) => {
  return request({
    url: "/auth/login",
    method: "post",
    data
  });
};

export const logout = () => {
  return request({
    url: "/auth/logout",
    method: "get"
  });
};

export const getInfo = () => {
  return request({
    url: "/manager/info",
    method: "get"
  });
};
