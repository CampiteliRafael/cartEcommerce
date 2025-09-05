"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";

// Componente para o ícone do carrinho com contador
const CartIcon = ({ count = 0 }) => {
  return (
    <div className="relative">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
        />
      </svg>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center" aria-label={`${count} itens no carrinho`}>
          {count}
        </span>
      )}
    </div>
  );
};

// Componente para links de navegação
const NavLink = ({ href, children, className = "" }) => {
  return (
    <Link 
      href={href} 
      className={`text-gray-700 hover:text-indigo-600 font-medium text-sm ${className}`}
    >
      {children}
    </Link>
  );
};

export default function Header() {
  const { authState, logout } = useAuth();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para ajustar o header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Desktop Header */}
        <div className="hidden md:flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ShopSmart
            </span>
          </Link>

          <div className="relative w-1/3 max-w-xs">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              aria-label="Buscar produtos"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <nav className="flex items-center gap-6">
            <NavLink href="/">
              Produtos
            </NavLink>
            
            <Link 
              href="/cart" 
              className="flex items-center text-gray-700 hover:text-indigo-600 font-medium text-sm relative"
              aria-label={`Carrinho com ${totalItems} itens`}
            >
              <CartIcon count={totalItems} />
              <span className="ml-2">Carrinho</span>
            </Link>

            {authState.isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <button 
                    className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-medium text-sm"
                    aria-expanded={false}
                    aria-haspopup="true"
                  >
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium">
                      {authState.user?.name.charAt(0).toUpperCase()}
                    </div>
                    <span>{authState.user?.name.split(' ')[0]}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Minha conta</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Meus pedidos</a>
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                    >
                      Sair
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <NavLink href="/login">
                  Login
                </NavLink>
                <Link 
                  href="/register" 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </nav>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden justify-between items-center h-14">
          <Link href="/" className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ShopSmart
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link 
              href="/cart" 
              className="relative text-gray-700"
              aria-label={`Carrinho com ${totalItems} itens`}
            >
              <CartIcon count={totalItems} />
            </Link>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Usando transição para suavizar a abertura/fechamento */}
      <div 
        className={`md:hidden bg-white border-t shadow-lg overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4">
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              aria-label="Buscar produtos"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
          <nav className="flex flex-col gap-4">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-indigo-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Produtos
            </Link>
            
            {authState.isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 py-2">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium">
                    {authState.user?.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700">{authState.user?.name}</span>
                </div>
                <a href="#" className="text-gray-700 hover:text-indigo-600 py-2">Minha conta</a>
                <a href="#" className="text-gray-700 hover:text-indigo-600 py-2">Meus pedidos</a>
                <button 
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-indigo-600 py-2"
                >
                  Sair
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-4 pt-2">
                <Link 
                  href="/login" 
                  className="text-gray-700 hover:text-indigo-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
      
      {/* Categories Navigation */}
      <div className="hidden md:block bg-gray-100 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center">
            <nav className="flex overflow-x-auto scrollbar-hide py-2">
              {["Eletrônicos", "Moda", "Casa e Decoração", "Esportes", "Beleza", "Livros"].map((category) => (
                <a 
                  key={category}
                  href="#" 
                  className="px-4 text-sm font-medium text-gray-700 hover:text-indigo-600 whitespace-nowrap"
                >
                  {category}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <a href="#" className="py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 whitespace-nowrap">Ofertas do dia</a>
              <a href="#" className="py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 whitespace-nowrap">Atendimento</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}