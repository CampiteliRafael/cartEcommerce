"use client";

import { Card } from '@/components/ui/Card';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';

export default function ProductsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {[...Array(8)].map((_, index) => (
        <Card key={index} className="h-full">
          <ProductCardSkeleton />
        </Card>
      ))}
    </div>
  );
}