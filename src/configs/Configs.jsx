import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
});

export const ageApi = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_AGE_BASE_URL,
});
