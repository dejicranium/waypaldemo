import axios from "axios";
import { parseCookies } from "nookies";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_LOCATION || "//localhost:8000/api/v1",
});

export default function conn(tok = "") {
  const cookies = parseCookies();
  let token = cookies.token || tok || "";
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
  api.defaults.headers.common["Content-Type"] = 'application/json'
  return api;
}

const errorHandler = (e) => {
  if (e.response) {
    return {
      data: null,
      status: false,
      message: e.response.data.message || e.response.data.data,
    };
  }
  
  return {
    data: null,
    status: false,
    message: e,
  };
};


export const getRequest = async (url, token = "") => {
  return conn(token)
    .get(url)
    .then((r) => r.data)
    .catch(errorHandler);
};

export const postRequest = async (url, data, token = "") => {
  return conn(token)
    .post(url, data)
    .then((r) => r.data)
    .catch(errorHandler);
};

export const putRequest = async (url, data, token = "") => {
  return conn(token)
    .put(url, data)
    .then((r) => r.data)
    .catch(errorHandler);
};

export const deleteRequest = async (url, data, token = "") => {
  return conn(token)
    .delete(url, data)
    .then((r) => r.data)
    .catch(errorHandler);
};
