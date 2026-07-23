import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://effective-telegram-qvvpg7qv66p9h9r79-5000.app.github.dev/api",
});

// ==================================
// GET TOKEN
// ==================================

const getStoredToken = () => {

  if (typeof window === "undefined") {
    return null;
  }

  return (
    localStorage.getItem("token") ||
    Cookies.get("token") ||
    null
  );

};


// ==================================
// PUBLIC ROUTES
// ==================================

const isPublicRequest = (
  url: string = ""
) => {

  const normalizedUrl =
    url.startsWith("/")
      ? url
      : `/${url}`;

  return [

    "/auth/login",

    "/auth/register",

    "/auth/forgot-password",

    "/auth/reset-password",

    "/products",

    "/products/featured",

    "/products/best-sellers",

    "/products/new-arrivals",

    "/categories",

    "/search",

  ].some(
    (path) =>
      normalizedUrl.startsWith(path)
  );

};


// ==================================
// REQUEST INTERCEPTOR
// ==================================

api.interceptors.request.use(

  (config) => {

    if (
      !isPublicRequest(
        config.url || ""
      )
    ) {

      const token =
        getStoredToken();

      if (token) {

        config.headers.Authorization =
          `Bearer ${token}`;

      }

    }

    return config;

  },

  (error) => {

    return Promise.reject(
      error
    );

  }

);


// ==================================
// RESPONSE INTERCEPTOR
// ==================================

api.interceptors.response.use(

  (response) => response,

  (error) => {

    if (
      error.response?.status === 401
    ) {

      const url =
        error.config?.url || "";

      console.log(
        "Unauthorized:",
        url
      );

      // শুধুমাত্র user authentication fail হলে logout হবে

      if (

        url.includes("/auth/me")

        ||

        url.includes("/users/me")

      ) {

        Cookies.remove(
          "token",
          {
            path: "/",
          }
        );

        localStorage.removeItem(
          "token"
        );

      }

    }

    return Promise.reject(
      error
    );

  }

);


export default api;