export const API_ENDPOINTS = {
  LOGIN: "auth/login",
  SIGN_UP: "auth/sign-up",
  SHORTEN_URL: "shortIt",
  GET_ORIGINAL_URL: "shortIt/getLink",
  GET_ALL_LINKS: "getAllLinks",
};

export const BASE_URL = import.meta.env.VITE_API_DEPLOYED_URL;
