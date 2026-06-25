/**
 * @file ProductGrid.tsx
 * @feature products
 * @role  Grille responsive de ProductCards avec animations d'entrée.
 *        Layout dense adaptatif style marketplace moderne.
 */

import React, { useEffect } from 'react';
import { useProducts } from '../hooks';
import { ProductCard } from './ProductCard';
import { Loader2, PackageOpen } from 'lucide-react';

interface ProductGridProps {
  categoryId: number | null;
  onProductClick?: (productId: number) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ categoryId, onProductClick }) => {
  const { products, isLoading, loadProducts, error } = useProducts();

  useEffect(() => {
    loadProducts(categoryId);
  }, [categoryId, loadProducts]);

  // ── Loading : skeleton grid ──
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-2xl overflow-hidden border border-[#d9cdb8]/40 bg-white">
            <div className="aspect-[3/4] bg-[#F0ECE2]" />
            <div className="p-3.5 space-y-2.5">
              <div className="h-5 w-20 rounded-md bg-[#F0ECE2]" />
              <div className="h-3.5 w-full rounded-md bg-[#F5F1E8]" />
              <div className="h-3.5 w-3/4 rounded-md bg-[#F5F1E8]" />
              <div className="flex items-center gap-2 pt-2 mt-1 border-t border-[#d9cdb8]/30">
                <div className="h-5 w-5 rounded-full bg-[#F0ECE2]" />
                <div className="h-3 w-16 rounded-md bg-[#F5F1E8]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ── Erreur ──
  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="rounded-2xl px-8 py-6 text-center max-w-md bg-red-50 border border-red-200/60 shadow-sm">
          <p className="text-sm font-semibold text-red-700">{error}</p>
          <p className="text-xs text-red-500/80 mt-2">Veuillez réessayer plus tard</p>
        </div>
      </div>
    );
  }

  // ── Vide ──
  if (products.length === 0) {
    return (
      <div className="flex min-h-[450px] flex-col items-center justify-center gap-6 py-12">
        <div className="h-20 w-20 rounded-3xl flex items-center justify-center bg-gradient-to-br from-amber-50 to-[#FFE0B2] shadow-sm">
          <PackageOpen size={32} className="text-[#F2700B]" />
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-zinc-950">Aucun article disponible</p>
          <p className="text-sm text-zinc-500 mt-2 max-w-xs">
            Essayez une autre catégorie ou revenez plus tard pour découvrir de nouvelles annonces
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Compteur de résultats */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[13px] font-medium text-zinc-500">
          <span className="font-bold text-zinc-950">{products.length}</span> article{products.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Grille */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.map((product, index) => (
          <div
            key={product.idProduit}
            className="animate-[fadeInUp_0.4s_ease-out_forwards] opacity-0"
            style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
          >
            <ProductCard product={product} onClick={() => onProductClick && onProductClick(product.idProduit)} />
          </div>
        ))}
      </div>
    </>
  );
};
