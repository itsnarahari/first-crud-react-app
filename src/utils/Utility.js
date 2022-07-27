import axios from "axios";
import React from "react";
import { BASE_URL } from "./Constants";

export const makeApiCall = (path, method, headers, body) => {
  const URL = `${BASE_URL}/${path}`;
  let commonHeaders = {
    "Content-Type": "application/json",
  };
  headers = { ...headers, ...commonHeaders };
  console.log(URL);
  return axios(URL, {
    method: method,
    headers: headers,
    data: body,
  })
    .then((response) => response.data)
    .catch((error) => error);
};
