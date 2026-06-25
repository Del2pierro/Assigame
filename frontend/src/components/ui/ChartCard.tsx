'use client';

import React from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

/** Conteneur graphique style Stripe/Linear */
export function ChartCard({ title, subtitle, children, className = '' }: ChartCardProps) {
  return (
    <div
      className={`rounded-xl border border-neutral-200/80 bg-white p-6 shadow-sm ${className}`}
    >
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-neutral-900">{title}</h4>
        {subtitle && (
          <p className="mt-0.5 text-xs text-neutral-500">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}
