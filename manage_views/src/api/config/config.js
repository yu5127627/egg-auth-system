import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import { removeToken } from "@/utils/auth";
import qs from "qs";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  transformRequest: [
    (data, config) => {
      switch (config["Content-Type"].toLowerCase()) {
        case "application/x-www-form-urlencoded": {
          return qs.stringify(data);
        }
        case "multipart/form-data;charset=utf-8": {
          return data;
        }
        default: {
          return JSON.stringify(data);
        }
      }
    }
  ]
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["Authorization"] = store.getters.token;
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { message, code } = response.data;
    if (code && code > 201) {
      Message({
        message: message,
        type: "error",
        duration: 5 * 1000
      });
    }
    return response.data;
  },
  error => {
    const statusCode = error.response.status;
    let message = "";
    switch (statusCode) {
      case 401:
        message = error.response.data.message || "认证失败，请重新登录！";
        removeToken();
        location.reload();
        break;
      case 403:
        message = error.response.data.message || "无权访问，请联系管理员！";
        break;
      case 404:
        message = error.response.data.message || "接口地址错误！";
        break;
      case 422:
        message = error.response.data.message || "参数错误!";
        break;
    }
    setTimeout(() => {
      Message({
        message,
        type: "error",
        duration: 5 * 1000
      });
    }, 100);
    return Promise.reject(null);
  }
);

export default service;
