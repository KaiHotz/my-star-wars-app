import axios from 'axios';

// Use proxy when running with Vite server (dev/preview), direct API URL for static hosting (GitHub Pages)
// GitHub Pages doesn't have a proxy, so we check if we're in a static build context
const isStaticBuild = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
const baseURL = isStaticBuild ? import.meta.env.VITE_SWAPI_URL : import.meta.env.VITE_API_URL;

export const httpClient = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
  },
});
