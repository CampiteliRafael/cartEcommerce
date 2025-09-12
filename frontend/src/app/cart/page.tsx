"use client";

import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import CartItem from "@/components/CartItem";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

// Componente de esqueleto para carregamento
const CartSkeleton = () => (
  <div className="animate-pulse space-y-6">
    {[...Array(3)].map((_, index) => (
      <div key={index} className="flex flex-col sm:flex-row gap-4 pb-6 border-b">
        <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
        <div className="flex-grow">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="flex justify-between">
            <div className="h-8 bg-gray-200 rounded w-24"></div>
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default function CartPage() {
  const { cart, isLoading, totalItems, totalPrice } = useCart();
  const { authState } = useAuth();
  const router = useRouter();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    // Redirecionar para login se não estiver autenticado
    if (!authState.isAuthenticated && !isLoading) {
      router.push("/login?redirect=/cart");
    }
  }, [authState.isAuthenticated, isLoading, router]);

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "desconto10") {
      setCouponApplied(true);
      setDiscount(totalPrice * 0.1);
    } else {
      alert("Cupom inválido");
    }
  };

  if (!authState.isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 sm:py-16">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 sm:h-16 w-12 sm:w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Acesso restrito</h2>
        <p className="text-gray-600 mb-6">Você precisa estar logado para acessar o carrinho</p>
        <Button 
          variant="primary"
          onClick={() => router.push("/login?redirect=/cart")}
        >
          Fazer login
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Seu Carrinho</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <Card padding="md">
              <CardHeader>
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Produto</span>
                  <div className="hidden sm:block">
                    <span>Subtotal</span>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <CartSkeleton />
              </CardBody>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="lg:sticky lg:top-24" padding="md">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 sm:py-16">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 sm:h-16 w-12 sm:w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Seu carrinho está vazio</h2>
        <p className="text-gray-600 mb-6">Parece que você ainda não adicionou nenhum produto ao seu carrinho</p>
        <Button 
          variant="primary"
          onClick={() => router.push("/")}
        >
          Continuar comprando
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Seu Carrinho</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Lista de produtos */}
        <div className="lg:col-span-2">
          <Card padding="md" className="mb-6">
            <CardHeader>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Produto</span>
                <div className="hidden sm:block">
                  <span>Subtotal</span>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-1">
                {cart.items.map((item) => (
                  <CartItem key={item.product._id} item={item} />
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Produtos recomendados */}
          <div className="hidden lg:block">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Você também pode gostar</h3>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <Card key={i} padding="md" className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0"></div>
                  <div>
                    <h4 className="font-medium text-sm">Produto Recomendado</h4>
                    <p className="text-gray-500 text-xs mb-2">Descrição curta</p>
                    <p className="text-indigo-600 font-medium text-sm">R$ 99,90</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Resumo do pedido */}
        <div className="lg:col-span-1">
          <Card className="lg:sticky lg:top-24" padding="md">
            <h2 className="text-lg font-bold mb-4">Resumo do Pedido</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'itens'})</span>
                <span>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(totalPrice)}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Frete</span>
                <span className="text-green-600">Grátis</span>
              </div>
              
              {couponApplied && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Desconto</span>
                  <span className="text-green-600">
                    -{new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(discount)}
                  </span>
                </div>
              )}
              
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(totalPrice - discount)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Em até 12x sem juros
                </p>
              </div>
            </div>
            
            {/* Cupom de desconto */}
            <div className="mb-6">
              <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
                Cupom de desconto
              </label>
              <div className="flex gap-2">
                <Input
                  id="coupon"
                  type="text"
                  placeholder="Digite seu cupom"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponApplied}
                  className="flex-grow"
                />
                <Button
                  onClick={handleApplyCoupon}
                  disabled={couponApplied || !couponCode}
                  variant={couponApplied ? "secondary" : "outline"}
                >
                  {couponApplied ? "Aplicado" : "Aplicar"}
                </Button>
              </div>
              {couponApplied && (
                <p className="text-xs text-green-600 mt-1">
                  Cupom &quot;DESCONTO10&quot; aplicado com sucesso!
                </p>
              )}
            </div>
            
            {/* Botão de finalizar compra */}
            <Button 
              variant="primary"
              fullWidth
              className="mb-4"
              onClick={() => alert("Funcionalidade de checkout não implementada")}
            >
              Finalizar compra
            </Button>
            
            <Link 
              href="/"
              className="block text-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              Continuar comprando
            </Link>
            
            {/* Métodos de pagamento */}
            <CardFooter>
              <div>
                <p className="text-xs text-gray-500 mb-2">Formas de pagamento</p>
                <div className="flex gap-2">
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                  <div className="w-10 h-6 bg-gray-200 rounded"></div>
                </div>
              </div>
              
              {/* Segurança */}
              <div className="mt-4 flex items-center text-xs text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Compra 100% segura
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}