import axios from "axios";

import { BASE_API_URL } from "../config/params";

const createShortenedUrl = async (id, url, password) => {
  const response = await axios.post(`${BASE_API_URL}url/create`, {
    id,
    url,
    password,
  });
  return response.data;
};

const getShortenedUrl = async (id, password) => {
  const response = await axios
    .post(`${BASE_API_URL}url`, {
      id,
      password,
    })
    .catch((e) => {
      if (e.response.status === 401) {
        throw new Error("Invalid password");
      }
    });
  return response.data;
};

const hasPassword = async (id) => {
  const response = await axios.post(`${BASE_API_URL}url/has-password`, {
    id,
  });
  return response.data;
};

const isIdExist = async (id) => {
  const response = await axios.post(`${BASE_API_URL}url/is-id-exist`, {
    id,
  });
  return response.data.data;
};

export { createShortenedUrl, getShortenedUrl, hasPassword, isIdExist };
