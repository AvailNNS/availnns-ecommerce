"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import {
  loginUser,
  registerUser,
  getMe,
} from "@/services/auth.service";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;

  login: (
    data: LoginData
  ) => Promise<void>;

  register: (
    data: RegisterData
  ) => Promise<void>;

  logout: () => void;

  refreshUser: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {

  const router =
    useRouter();

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  // =====================
  // GET CURRENT USER
  // =====================

  const refreshUser =
    async () => {

      try {

        const token =
          Cookies.get("token");

        if (!token) {

          setUser(null);

          return;

        }

        const res =
          await getMe();

        setUser(
          res.user
        );

      } catch (error) {

        console.error(error);

        Cookies.remove(
          "token"
        );

        setUser(null);

      }

    };

  // =====================
  // LOGIN
  // =====================

  const login =
    async (
      data: LoginData
    ) => {

      const res =
        await loginUser(
          data
        );

      Cookies.set(
        "token",
        res.token,
        {
          expires: 7,
        }
      );

      setUser(
        res.user
      );

      router.push(
        "/dashboard"
      );

    };

  // =====================
  // REGISTER
  // =====================

  const register =
    async (
      data: RegisterData
    ) => {

      const res =
        await registerUser(
          data
        );

      Cookies.set(
        "token",
        res.token,
        {
          expires: 7,
        }
      );

      setUser(
        res.user
      );

      router.push(
        "/dashboard"
      );

    };

  // =====================
  // LOGOUT
  // =====================

  const logout = () => {

    Cookies.remove(
      "token"
    );

    setUser(null);

    router.push(
      "/login"
    );

  };

  // =====================
  // INIT
  // =====================

  useEffect(() => {

    const init =
      async () => {

        try {

          await refreshUser();

        } finally {

          setLoading(
            false
          );

        }

      };

    init();

  }, []);

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}

// =====================
// CUSTOM HOOK
// =====================

export const useAuth = () => {

  const context =
    useContext(
      AuthContext
    );

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }

  return context;

};