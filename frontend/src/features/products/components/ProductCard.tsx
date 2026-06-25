'use client';

import React from 'react';
import { Heart, Package } from 'lucide-react';
import { Produit } from '@/types/models.types';
import { getSellerDisplayName, getSellerInitials } from '@/lib/seller.utils';

interface ProductCardProps {
  product: Produit;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {

  // Temps écoulé depuis la publication
  const timeAgo = (() => {
    const now = new Date();
    const pub = new Date(product.datePublication);
    const diffMs = now.getTime() - pub.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 60) return `il y a ${diffMin}min`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `il y a ${diffH}h`;
    const diffD = Math.floor(diffH / 24);
    if (diffD < 30) return `il y a ${diffD}j`;
    return pub.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  })();

  return (
    <>
      <article
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#d9cdb8]/60 bg-white transition-all duration-500 ease-out cursor-pointer group hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)]"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick && onClick()}
        aria-label={`Voir le détail de ${product.nom}`}
      >
        {/* ── Image ── */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F5F1E8]">
          {product.imageBase64 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`data:image/jpeg;base64,${product.imageBase64}`}
              alt={product.nom}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#F5F1E8]">
              <div className="rounded-2xl p-4 bg-[#EDE8DC]">
                <Package size={28} className="text-[#c4b89a]" />
              </div>
              <span className="text-[11px] font-medium tracking-wide text-[#b3a78f] uppercase">
                Pas d&apos;image
              </span>
            </div>
          )}

          {/* Gradient overlay pour lisibilité */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Badge catégorie — top left */}
          <div className="absolute left-2.5 top-2.5">
            <span className="inline-block rounded-lg bg-white/90 backdrop-blur-md text-[#F2700B] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 shadow-sm transition-transform duration-300 group-hover:scale-105">
              {product.categorie?.nom}
            </span>
          </div>

          {/* Bouton favoris — top right */}
          <button
            className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-110 active:scale-95"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            aria-label="Ajouter aux favoris"
          >
            <Heart size={14} className="text-zinc-400 group-hover:text-[#F2700B] transition-colors" />
          </button>

          {/* Overlay statut si non disponible */}
          {product.statut !== 'DISPONIBLE' && (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px] bg-black/35">
              <span
                className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider shadow-lg text-white ${
                  product.statut === 'RESERVE' ? 'bg-[#F2700B]' : 'bg-zinc-950'
                }`}
              >
                {product.statut === 'RESERVE' ? 'Réservé' : 'Vendu'}
              </span>
            </div>
          )}
        </div>

        {/* ── Contenu ── */}
        <div className="flex flex-1 flex-col p-3.5">
          {/* Prix */}
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-[17px] font-extrabold tracking-tight text-zinc-950">
              {product.prix.toLocaleString('fr-FR')}&nbsp;
              <span className="text-[13px] font-bold text-zinc-500">F CFA</span>
            </p>
          </div>

          {/* Nom du produit */}
          <h3 className="mt-1.5 line-clamp-2 text-[13px] font-medium leading-[1.4] text-zinc-700">
            {product.nom}
          </h3>

          {/* Séparateur + infos vendeur */}
          <div className="mt-auto pt-3">
            <div className="flex items-center justify-between border-t border-[#d9cdb8]/40 pt-2.5">
              {/* Vendeur */}
              <div className="flex items-center gap-1.5 min-w-0">
                <div className="h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0 bg-gradient-to-r from-[#F2700B] to-[#e05a00]">
                  {getSellerInitials(product)}
                </div>
                <span className="text-[11px] font-medium text-zinc-500 truncate max-w-[110px]">
                  {getSellerDisplayName(product)}
                </span>
              </div>

              {/* Date de publication */}
              <span className="text-[10px] text-zinc-400 shrink-0">
                {timeAgo}
              </span>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
