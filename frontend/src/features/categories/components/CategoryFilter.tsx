/**
 * @file CategoryFilter.tsx
 * @feature categories
 * @role  Barre de filtrage par catégorie — chips scrollables, accessibles,
 *        snap horizontal et palette Assigamé (standards UI 2026).
 */

'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useCategories } from '../hooks';
import { Grid3X3, ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryFilterProps {
  onCategorySelect: (categoryId: number | null) => void;
}

const chipBase =
  'relative shrink-0 snap-start inline-flex items-center justify-center gap-1.5 min-h-11 px-4 sm:px-5 rounded-full text-[13px] sm:text-[14px] font-semibold tracking-[-0.01em] border transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2700B]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F5EE] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50';

const chipActive =
  'bg-gradient-to-r from-[#F2700B] to-[#e05a00] text-white border-transparent shadow-[0_6px_20px_-6px_rgba(242,112,11,0.45)]';

const chipInactive =
  'bg-white/85 text-zinc-600 border-[#d9cdb8]/70 shadow-[0_1px_2px_rgba(17,17,17,0.04)] backdrop-blur-sm hover:bg-white hover:text-zinc-900 hover:border-[#c4b89a]/80 hover:shadow-[0_4px_12px_-4px_rgba(17,17,17,0.08)]';

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ onCategorySelect }) => {
  const { categories, activeCategoryId, loadCategories, setActiveCategory, isLoading } = useCategories();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const updateScrollHints = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollHints();
    el.addEventListener('scroll', updateScrollHints, { passive: true });
    window.addEventListener('resize', updateScrollHints);

    return () => {
      el.removeEventListener('scroll', updateScrollHints);
      window.removeEventListener('resize', updateScrollHints);
    };
  }, [categories, isLoading, updateScrollHints]);

  const scrollBy = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -220 : 220,
      behavior: 'smooth',
    });
  };

  const handleSelect = (id: number | null) => {
    setActiveCategory(id);
    onCategorySelect(id);
  };

  if (isLoading) {
    return (
      <div
        className="flex items-center gap-2 overflow-hidden py-1"
        aria-busy="true"
        aria-label="Chargement des catégories"
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`h-11 rounded-full bg-[#EDE8DC]/90 animate-pulse shrink-0 ${
              ['w-[88px]', 'w-[112px]', 'w-[96px]', 'w-[128px]', 'w-[88px]', 'w-[104px]'][i % 6]
            }`}
          />
        ))}
      </div>
    );
  }

  return (
    <section aria-label="Filtrer par catégorie" className="relative w-full">
      {/* Conteneur track — style segmented control 2026 */}
      <div className="relative rounded-2xl border border-[#d9cdb8]/45 bg-[#F0E9D9]/55 p-1.5 sm:p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-md">
        {/* Dégradés de scroll */}
        <div
          aria-hidden
          className={`pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-10 sm:w-14 rounded-l-2xl bg-gradient-to-r from-[#F0E9D9] via-[#F0E9D9]/80 to-transparent transition-opacity duration-200 ${
            canScrollLeft ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-10 sm:w-14 rounded-r-2xl bg-gradient-to-l from-[#F0E9D9] via-[#F0E9D9]/80 to-transparent transition-opacity duration-200 ${
            canScrollRight ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Flèches desktop */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scrollBy('left')}
            aria-label="Catégories précédentes"
            className="absolute left-1.5 top-1/2 z-20 hidden -translate-y-1/2 sm:flex h-8 w-8 items-center justify-center rounded-full border border-[#d9cdb8]/70 bg-white/95 text-zinc-600 shadow-sm hover:text-zinc-900 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2700B]/35"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>
        )}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scrollBy('right')}
            aria-label="Catégories suivantes"
            className="absolute right-1.5 top-1/2 z-20 hidden -translate-y-1/2 sm:flex h-8 w-8 items-center justify-center rounded-full border border-[#d9cdb8]/70 bg-white/95 text-zinc-600 shadow-sm hover:text-zinc-900 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2700B]/35"
          >
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        )}

        <div
          ref={scrollRef}
          role="tablist"
          aria-orientation="horizontal"
          className="category-filter-scroll flex items-center gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide px-1 sm:px-9 py-0.5"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeCategoryId === null}
            onClick={() => handleSelect(null)}
            className={`${chipBase} ${activeCategoryId === null ? chipActive : chipInactive}`}
          >
            <Grid3X3 size={15} strokeWidth={2.25} aria-hidden />
            Tout
          </button>

          {categories.map((cat) => {
            const isActive = activeCategoryId === cat.idCategorie;
            return (
              <button
                key={cat.idCategorie}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelect(cat.idCategorie)}
                className={`${chipBase} ${isActive ? chipActive : chipInactive}`}
              >
                {cat.nom}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
