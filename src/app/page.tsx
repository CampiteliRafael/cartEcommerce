// Página principal - componente do lado do servidor
import { Suspense } from 'react';
import ProductsGrid from '@/components/ProductsGrid';
import CategoriesSection from '@/components/CategoriesSection';
import ProductSorter from '@/components/ProductSorter';
import NewsletterSection from '@/components/NewsletterSection';
import ProductsLoadingSkeleton from '@/components/ProductsLoadingSkeleton';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 px-4 sm:px-8 py-12 sm:py-16 md:py-20 md:w-3/5 lg:w-1/2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Ofertas Especiais de Verão
          </h1>
          <p className="text-white text-opacity-90 mb-6 text-sm sm:text-base">
            Aproveite descontos de até 50% em produtos selecionados. Promoção por tempo limitado!
          </p>
          <Link href="/products">
            <Button variant="secondary" size="md">
              Ver ofertas
            </Button>
          </Link>
        </div>
      </div>

      {/* Categorias */}
      <CategoriesSection />

      {/* Produtos */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 sm:gap-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Produtos em Destaque</h2>
          <div className="flex items-center">
            <ProductSorter />
          </div>
        </div>

        <Suspense fallback={<ProductsLoadingSkeleton />}>
          <ProductsGrid />
        </Suspense>
      </div>

      {/* Banners promocionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 sm:p-6 text-white">
          <h3 className="text-lg sm:text-xl font-bold mb-2">Frete Grátis</h3>
          <p className="mb-4 text-sm sm:text-base">Em compras acima de R$ 200</p>
          <Button variant="secondary" size="sm">
            Saiba mais
          </Button>
        </div>
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 sm:p-6 text-white">
          <h3 className="text-lg sm:text-xl font-bold mb-2">Primeira Compra</h3>
          <p className="mb-4 text-sm sm:text-base">Ganhe 10% de desconto</p>
          <Button variant="secondary" size="sm">
            Usar cupom
          </Button>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
}