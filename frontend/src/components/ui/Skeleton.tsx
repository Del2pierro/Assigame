'use client';

import React from 'react';

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      style={style}
      className={cn(
        'relative overflow-hidden rounded-lg bg-[#EDE8DC]',
        'before:absolute before:inset-0 before:-translate-x-full',
        'before:animate-shimmer',
        'before:bg-gradient-to-r before:from-transparent before:via-[#F8F5EE]/60 before:to-transparent',
        className
      )}
    />
  );
}

export function KpiCardSkeleton() {
  return (
    <div
      className="rounded-xl border border-[#d9cdb8] p-5 shadow-sm"
      style={{ backgroundColor: '#EDE8DC' }}
    >
      <div className="flex items-start justify-between">
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
      <Skeleton className="mt-4 h-8 w-16" />
      <Skeleton className="mt-2 h-3 w-32" />
    </div>
  );
}

export function ChartSkeleton({ height = 280 }: { height?: number }) {
  return (
    <div
      className="rounded-xl border border-[#d9cdb8] p-6 shadow-sm"
      style={{ backgroundColor: '#EDE8DC' }}
    >
      <Skeleton className="h-4 w-40" />
      <Skeleton className="mt-2 h-3 w-56" />
      <Skeleton className="mt-6 w-full rounded-lg" style={{ height }} />
    </div>
  );
}

export function KpiGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <KpiCardSkeleton key={i} />
      ))}
    </div>
  );
}
