export const apiUrl =
  import.meta.env.NODE_ENV === "PROD"
    ? import.meta.env.VITE_REMOTE_API_URL
    : import.meta.env.VITE_LOCAL_API_URL;
