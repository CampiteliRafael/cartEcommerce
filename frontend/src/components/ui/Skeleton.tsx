"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  animate?: boolean;
}

export function Skeleton({
  className = "",
  width,
  height,
  borderRadius = "0.25rem",
  animate = true,
}: SkeletonProps) {
  const style = {
    width: width ? (typeof width === "number" ? `${width}px` : width) : "100%",
    height: height ? (typeof height === "number" ? `${height}px` : height) : "1rem",
    borderRadius,
  };

  return (
    <div
      className={`bg-gray-200 ${animate ? "animate-pulse" : ""} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lineHeight?: string | number;
  spacing?: string | number;
  width?: string | number | string[];
}

export function SkeletonText({
  lines = 3,
  className = "",
  lineHeight = "1rem",
  spacing = "0.5rem",
  width,
}: SkeletonTextProps) {
  const getWidth = (index: number) => {
    if (!width) {
      // Variação aleatória para parecer mais natural
      const widths = ["100%", "90%", "95%", "85%", "80%"];
      return widths[index % widths.length];
    }

    if (Array.isArray(width)) {
      return width[index % width.length];
    }

    return width;
  };

  return (
    <div className={`space-y-${typeof spacing === "string" ? spacing : `[${spacing}px]`} ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          height={lineHeight}
          width={getWidth(index)}
        />
      ))}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm h-full">
      <div className="animate-pulse">
        <div className="bg-gray-200 h-48 w-full"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 w-4 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-full mt-auto"></div>
        </div>
      </div>
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b animate-pulse">
      <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
      <div className="sm:ml-6 flex-grow mt-4 sm:mt-0 w-full sm:w-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div>
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          </div>
          <div className="mt-2 sm:mt-0">
            <div className="h-6 bg-gray-200 rounded w-20 mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          <div className="h-8 bg-gray-200 rounded w-32"></div>
          <div className="flex gap-4">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
}