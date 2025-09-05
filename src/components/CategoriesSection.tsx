"use client";

import { useState } from 'react';
import Link from 'next/link';
import { PRODUCT_CATEGORIES } from '@/utils/constants';

export default function CategoriesSection() {
  const [activeCategory, setActiveCategory] = useState("todos");
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Categorias</h2>
        <Link href="/categories" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
          Ver todas
        </Link>
      </div>
      <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {PRODUCT_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap transition-colors text-sm ${
              activeCategory === category.id
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            type="button"
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}