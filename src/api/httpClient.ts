import axios from 'axios';

const isDev = import.meta.env.DEV;
const baseURL = isDev ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_URL_PROD;

export const httpClient = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
  },
});
