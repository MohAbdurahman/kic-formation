import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'niveau' | 'modalite' | 'promo' | 'status';
  className?: string;
}

export default function Badge({ children, variant = 'niveau', className = '' }: BadgeProps) {
  const variantStyles = {
    niveau: 'bg-[#25318D]/15 text-[#25318D]',
    modalite: 'bg-green-100 text-green-800',
    promo: 'bg-yellow-100 text-yellow-900',
    status: 'bg-gray-100 text-gray-800',
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
