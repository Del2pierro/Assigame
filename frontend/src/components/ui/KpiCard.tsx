'use client';

import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

export interface KpiCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  /** Couleur d'accent pour l'icône et les détails */
  accentColor?: string;
  /** Sous-texte descriptif */
  description?: string;
  /** Indicateur de tendance optionnel */
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
      ? 'text-neutral-500'
      : trend.positive
        ? 'text-emerald-600'
        : 'text-red-500';

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-neutral-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md ${className}`}
    >
      {/* Accent subtil en haut */}
      <div
        className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)` }}
      />

      <div className="flex items-start justify-between gap-3">
        <p className="text-[13px] font-medium text-neutral-500">{label}</p>
        {icon && (
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105"
            style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
          >
            {icon}
          </div>
        )}
      </div>

      <p className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 tabular-nums">
        {value}
      </p>

      {(description || trend) && (
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
          {trend && (
            <span className={`inline-flex items-center gap-1 text-xs font-medium ${trendColor}`}>
              <TrendIcon size={12} />
              {trend.value}
              {trend.label && (
                <span className="font-normal text-neutral-400">{trend.label}</span>
              )}
            </span>
          )}
          {description && (
            <span className="text-xs text-neutral-400">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}
