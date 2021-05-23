import request from "./config";

export const getList = (params) => {
  return request({
    url: "/log/login",
    method: "get",
    params
  });
};

export const remove = (data) => {
  return request({
    url: "/log/login",
    method: "delete",
    data
  });
};
