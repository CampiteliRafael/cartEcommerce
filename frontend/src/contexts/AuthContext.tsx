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

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

function setCookie(name: string, value: string, days: number = 7) {
  if (typeof document === 'undefined') return;
  
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + value + expires + "; path=/; SameSite=Lax";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const syncToken = () => {
    if (typeof window === 'undefined') return null;
    
    const localToken = localStorage.getItem('token');
    const cookieToken = getCookie('token');
 
    if (localToken && !cookieToken) {
      setCookie('token', localToken);
      return localToken;
    }
    
    if (cookieToken && !localToken) {
      localStorage.setItem('token', cookieToken);
      return cookieToken;
    }
    
    return localToken || cookieToken;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = syncToken();
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
      const token = data.accessToken || data.token;
      
      if (token && typeof window !== 'undefined') {
        localStorage.setItem('token', token);
        setCookie('token', token);
      }
      
      setAuthState({
        user: data.user,
        token: token,
        isAuthenticated: true,
      });
      setError(null);
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.message && typeof err.message === 'string') {
        setError(err.message);
      } else {
        setError(ERROR_MESSAGES.AUTH.LOGIN_FAILED);
      }
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
    } catch (err: any) {
      console.error("Registration error:", err);
      
      if (err.message) {
        if (err.message.includes("409") || err.message.includes("já cadastrado")) {
          setError("Este e-mail já está cadastrado.");
        } else if (err.message.includes("400") || err.message.includes("senha")) {
          setError("A senha não atende aos requisitos de segurança.");
        } else {
          setError(err.message);
        }
      } else {
        setError(ERROR_MESSAGES.AUTH.REGISTER_FAILED);
      }
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
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax";
    }
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