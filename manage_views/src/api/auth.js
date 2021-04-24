import request from "./config";

export const login = (data) => {
  return request({
    url: "/auth/login",
    method: "post",
    data
  });
};

export const getInfo = () => {
  return request({
    url: "/manager/info",
    method: "get"
  });
};

const create = data => {
  return request({
    url: "category",
    method: "post",
    data
  });
};

const update = (id, data) => {
  return request({
    url: `category/${id}`,
    method: "put",
    data
  });
};

const del = (id) => {
  return request({
    url: `category/${id}`,
    method: "delete"
  });
};
