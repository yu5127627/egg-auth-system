import request from "./config";

export const getList = (params) => {
  return request({
    url: "/role",
    method: "get",
    params
  });
};
