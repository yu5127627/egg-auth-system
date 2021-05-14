import request from "./config";

export const getList = (params) => {
  return request({
    url: "/manager",
    method: "get",
    params
  });
};

export const create = (data) => {
  return request({
    url: "/manager",
    method: "post",
    data
  });
};

export const update = (id, data) => {
  return request({
    url: `/manager/${id}`,
    method: "put",
    data
  });
};

export const remove = (data) => {
  return request({
    url: "/manager",
    method: "delete",
    data
  });
};
