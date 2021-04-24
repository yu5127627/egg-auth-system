import service from "./config";

const request = ({ method, url, data, headers, params }) => {
  headers = headers || {
    "Content-Type": "application/json"
  };
  method = method.toLocaleLowerCase() || "GET";
  return service({
    method,
    url,
    data,
    params,
    headers
  });
};

export default request;
