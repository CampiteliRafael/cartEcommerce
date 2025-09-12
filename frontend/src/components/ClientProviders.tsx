"use client";

import { ReactNode, useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

function syncAuthToken() {
  if (typeof window === 'undefined') return;
  
  const localToken = localStorage.getItem('token');
  
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  };
  
  const setCookie = (name: string, value: string, days: number = 7) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/; SameSite=Lax";
  };
  
  const cookieToken = getCookie('token');
  
  if (localToken && !cookieToken) {
    setCookie('token', localToken);
  } else if (cookieToken && !localToken) {
    localStorage.setItem('token', cookieToken);
  }
}

function TokenSynchronizer() {
  useEffect(() => {
    syncAuthToken();
  }, []);
  
  return null;
}

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <TokenSynchronizer />
        {children}
      </CartProvider>
    </AuthProvider>
  );
}