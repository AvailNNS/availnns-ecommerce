import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://effective-telegram-qvvpg7qv66p9h9r79-5000.app.github.dev/api",
});

const getStoredToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem("token");
};

const isPublicRequest = (url = "") => {
  const normalizedUrl = url.startsWith("/") ? url : `/${url}`;

  return [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/products",
    "/categories",
    "/search",
  ].some(
    (path) =>
      normalizedUrl === path ||
      normalizedUrl.startsWith(`${path}/`) ||
      normalizedUrl.startsWith(`${path}?`)
  );
};

api.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }

  if (!isPublicRequest(config.url || "")) {
    delete config.headers.Authorization;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== "undefined") {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);

export default api;