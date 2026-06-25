'use client';

import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

export interface KpiCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  accentColor?: string;
  description?: string;
  trend?: {
    value: string;
    label?: string;
    positive?: boolean;
  };
  className?: string;
}

export function KpiCard({
  label,
  value,
  icon,
  accentColor = '#F2700B',
  description,
  trend,
  className = '',
}: KpiCardProps) {
  const TrendIcon = trend?.positive !== false ? TrendingUp : TrendingDown;
  const trendColor =
    trend?.positive === undefined
      ? 'text-[#666666]'
      : trend.positive
        ? 'text-[#006A4E]'
        : 'text-red-500';

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-[#d9cdb8] p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${className}`}
      style={{ backgroundColor: '#EDE8DC' }}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[13px] font-semibold text-[#666666]">{label}</p>
        {icon && (
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-105"
            style={{ backgroundColor: `${accentColor}22`, color: accentColor }}
          >
            {icon}
          </div>
        )}
      </div>

      <p
        className="mt-3 text-3xl font-black tracking-tight tabular-nums"
        style={{ color: accentColor }}
      >
        {value}
      </p>

      {(description || trend) && (
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
          {trend && (
            <span className={`inline-flex items-center gap-1 text-xs font-medium ${trendColor}`}>
              <TrendIcon size={12} />
              {trend.value}
              {trend.label && (
                <span className="font-normal text-[#999999]">{trend.label}</span>
              )}
            </span>
          )}
          {description && (
            <span className="text-xs text-[#666666]">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}
