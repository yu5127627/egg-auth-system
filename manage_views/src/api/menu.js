import request from "./config";

export const getAllList = (params) => {
  return request({
    url: "/menu/list",
    method: "get",
    params
  });
};
