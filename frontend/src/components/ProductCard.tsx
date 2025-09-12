import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

// Componente separado para avaliações em estrelas
const StarRating = ({ rating = 4.5 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <svg key={`full-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        } else if (i === fullStars && hasHalfStar) {
          return (
            <svg key="half" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        } else {
          return (
            <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        }
      })}
    </div>
  );
};

// Componente de botão reutilizável
const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary',
  className = '',
  type = "button",
  title
}) => {
  const baseStyles = "transition-colors text-sm font-medium rounded-md";
  
  const variantStyles = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    disabled: "bg-gray-400 text-white cursor-not-allowed"
  };
  
  const currentVariant = disabled ? 'disabled' : variant;
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[currentVariant]} ${className}`}
      type={type}
      title={title}
    >
      {children}
    </button>
  );
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isLoading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showQuantity, setShowQuantity] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = async () => {
    await addToCart(product._id, quantity);
    setShowQuantity(false);
  };

  // Calcular desconto fictício para efeito visual
  const originalPrice = product.price * 1.2;
  const discountPercentage = Math.round((1 - product.price / originalPrice) * 100);

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!isLoading) setShowQuantity(false);
      }}
    >
      <div className="relative">
        {/* Badge de desconto */}
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
          -{discountPercentage}%
        </div>
        
        {/* Badge de estoque baixo */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            Últimas unidades
          </div>
        )}
        
        {/* Imagem do produto */}
        <div className="relative h-48 w-full overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Sem imagem</span>
            </div>
          )}
          
          {/* Overlay com botões de ação rápida - visível apenas em desktop */}
          <div 
            className={`absolute inset-0 bg-black bg-opacity-20 items-center justify-center gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} hidden md:flex`}
          >
            <button 
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              title="Adicionar aos favoritos"
              type="button"
              aria-label="Adicionar aos favoritos"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button 
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              title="Visualização rápida"
              type="button"
              aria-label="Visualização rápida"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        {/* Categoria do produto */}
        <div className="text-xs text-gray-500 mb-1">Categoria</div>
        
        {/* Nome do produto */}
        <Link href={`/product/${product._id}`} className="hover:text-indigo-600 transition-colors">
          <h3 className="text-sm font-medium mb-1 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        
        {/* Avaliações */}
        <div className="flex items-center gap-1 mb-2">
          <StarRating rating={4.5} />
          <span className="text-xs text-gray-500">(24)</span>
        </div>
        
        {/* Preço */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(product.price)}
          </span>
          <span className="text-sm text-gray-500 line-through">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(originalPrice)}
          </span>
        </div>
        
        {/* Descrição curta */}
        <p className="text-xs text-gray-600 mb-4 line-clamp-2 min-h-[2rem]">
          {product.description}
        </p>

        {/* Controle de quantidade e botão de adicionar ao carrinho */}
        <div className="mt-auto">
          {showQuantity ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-md">
                <button 
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  type="button"
                  aria-label="Diminuir quantidade"
                >
                  -
                </button>
                <span className="px-3 py-1 text-sm">{quantity}</span>
                <button 
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                  type="button"
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={isLoading || product.stock === 0}
                className="flex-1 py-2"
              >
                {isLoading ? "..." : "Adicionar"}
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => product.stock > 0 && setShowQuantity(true)}
              disabled={product.stock === 0}
              variant={product.stock === 0 ? "disabled" : "primary"}
              className="w-full py-2"
            >
              {product.stock === 0 ? "Sem estoque" : "Adicionar ao carrinho"}
            </Button>
          )}
        </div>
        
        {/* Indicador de disponibilidade */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <span className={`inline-block w-2 h-2 rounded-full mr-1 ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-xs text-gray-500">
              {product.stock > 0 ? 'Em estoque' : 'Indisponível'}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {product.stock > 0 ? `${product.stock} unid.` : ''}
          </span>
        </div>
      </div>
    </div>
  );
}