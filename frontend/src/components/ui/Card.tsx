"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ 
  children, 
  className = "", 
  hover = false,
  padding = 'md'
}: CardProps) {
  const baseStyles = "bg-white rounded-lg overflow-hidden";
  const hoverStyles = hover ? "transition-shadow duration-300 hover:shadow-md" : "";
  
  const paddingStyles = {
    none: "",
    sm: "p-2",
    md: "p-4",
    lg: "p-6"
  };
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={`border-b pb-4 mb-4 ${className}`}>
      {children}
    </div>
  );
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function CardBody({ children, className = "" }: CardBodyProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div className={`border-t pt-4 mt-4 ${className}`}>
      {children}
    </div>
  );
}