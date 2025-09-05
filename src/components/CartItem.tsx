"use client";

import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CartItemProps {
  item: CartItemType;
}

// Componente de botão para ações do carrinho
const CartActionButton = ({ 
  onClick, 
  disabled = false, 
  children, 
  icon, 
  className = "" 
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`text-sm text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-1 ${className}`}
      type="button"
    >
      {icon}
      {children}
    </button>
  );
};

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart, isLoading } = useCart();
  const { product, quantity, price } = item;
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      await updateQuantity(product._id, newQuantity);
    }
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    await removeFromCart(product._id);
  };

  return (
    <div 
      className={`flex flex-col sm:flex-row items-start sm:items-center py-6 border-b transition-opacity duration-300 ${isRemoving ? 'opacity-50' : 'opacity-100'}`}
      aria-busy={isRemoving}
    >
      {/* Imagem do produto */}
      <div className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden border border-gray-200">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="96px"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
            <span className="text-gray-400 text-xs">Sem imagem</span>
          </div>
        )}
      </div>

      {/* Informações do produto */}
      <div className="sm:ml-6 flex-grow mt-4 sm:mt-0 w-full sm:w-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <Link href={`/product/${product._id}`} className="hover:text-indigo-600 transition-colors">
              <h3 className="text-base font-medium text-gray-900">
                {product.name}
              </h3>
            </Link>
            <p className="mt-1 text-sm text-gray-500 line-clamp-1">
              {product.description}
            </p>
          </div>
          <div className="mt-2 sm:mt-0 text-left sm:text-right">
            <p className="text-lg font-medium text-gray-900">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(price * quantity)}
            </p>
            <p className="text-sm text-gray-500">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(price)} cada
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          <div className="flex items-center">
            {/* Controle de quantidade */}
            <div className="flex items-center border border-gray-300 rounded-md">
              <button 
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={isLoading || quantity <= 1}
                type="button"
                aria-label="Diminuir quantidade"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="px-3 py-1 text-sm min-w-[30px] text-center">{quantity}</span>
              <button 
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={isLoading || quantity >= product.stock}
                type="button"
                aria-label="Aumentar quantidade"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            
            {/* Estoque disponível */}
            <span className="ml-3 text-xs text-gray-500">
              {product.stock} disponíveis
            </span>
          </div>

          {/* Ações */}
          <div className="flex items-center gap-4">
            <CartActionButton 
              onClick={handleRemove}
              disabled={isLoading}
              icon={
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                  />
                </svg>
              }
              className="hover:text-red-600"
            >
              Remover
            </CartActionButton>
            
            <CartActionButton 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              }
            >
              Salvar
            </CartActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}