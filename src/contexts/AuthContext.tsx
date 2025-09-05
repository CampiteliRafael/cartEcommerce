"use client";

import { AuthState, User } from "@/types";
import { authService } from "@/services/api";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ERROR_MESSAGES } from "@/utils/constants";

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoading(false);
          return;
        }

        setAuthState(prev => ({ ...prev, token, isAuthenticated: true }));
        await fetchCurrentUser();
      } catch (err) {
        console.error("Auth initialization error:", err);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const fetchCurrentUser = async () => {
    setIsLoading(true);
    try {
      const user = await authService.getCurrentUser();
      setAuthState(prev => ({ ...prev, user, isAuthenticated: true }));
      setError(null);
    } catch (err) {
      console.error("Error fetching current user:", err);
      logout();
      setError(ERROR_MESSAGES.AUTH.REQUIRED);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await authService.login(email, password);
      setAuthState({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
      });
      setError(null);
    } catch (err) {
      console.error("Login error:", err);
      setError(ERROR_MESSAGES.AUTH.LOGIN_FAILED);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await authService.register(name, email, password);
      await login(email, password);
      setError(null);
    } catch (err) {
      console.error("Registration error:", err);
      setError(ERROR_MESSAGES.AUTH.REGISTER_FAILED);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        register,
        logout,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}