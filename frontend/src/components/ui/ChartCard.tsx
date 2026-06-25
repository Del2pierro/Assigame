'use client';

import React from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({ title, subtitle, children, className = '' }: ChartCardProps) {
  return (
    <div
      className={`rounded-xl border border-[#d9cdb8] p-6 shadow-sm ${className}`}
      style={{ backgroundColor: '#EDE8DC' }}
    >
      <div className="mb-6">
        <h4 className="text-sm font-bold text-[#111111]">{title}</h4>
        {subtitle && (
          <p className="mt-0.5 text-xs text-[#666666]">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}
