import axios from "axios";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const httpClient = axios.create({
  headers,
  baseURL: `${process.env.API_URL}`,
});
