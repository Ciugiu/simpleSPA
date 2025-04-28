export const apiUrl =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_REMOTE_API_URL
    : import.meta.env.VITE_LOCAL_API_URL;
