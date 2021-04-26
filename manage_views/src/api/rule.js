import request from "./config";

export const login = (data) => {
  return request({
    url: "/auth/login",
    method: "post",
    data
  });
};

export const getList = (params) => {
  return request({
    url: "/rule",
    method: "get",
    params
  });
};
