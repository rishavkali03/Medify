const BASE_URL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_BACKEND_URL_DEV
    : import.meta.env.VITE_BACKEND_URL;

export default BASE_URL; 