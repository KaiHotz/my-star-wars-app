import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

export const httpClient = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
  },
});
