/**
 * @file SellerProductTable.tsx
 * @feature dashboard
 * @role  Tableau de gestion des produits du vendeur avec actions
 *        (changer statut, supprimer) et barre de recherche.
 *        Style cohérent avec la palette admin Assigamé.
 */

'use client';

import React, { useState, useMemo } from 'react';
import { Search, Trash2, ChevronDown, Package, AlertTriangle, Pencil } from 'lucide-react';
import Link from 'next/link';
import { Produit, ProductStatus } from '@/types/models.types';

interface SellerProductTableProps {
  products: Produit[];
  isLoading: boolean;
  error: string | null;
  onDelete: (productId: number) => void;
  onStatusChange: (productId: number, newStatus: ProductStatus) => void;
  isDeleting: boolean;
  productIdBeingDeleted: number | null;
  isUpdating: boolean;
}

// ─── Badge de statut ─────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<ProductStatus, { label: string; bg: string; text: string }> = {
  DISPONIBLE: { label: 'En vente', bg: '#006A4E1A', text: '#006A4E' },
  RESERVE: { label: 'Réservé', bg: '#F2700B1A', text: '#F2700B' },
  VENDU: { label: 'Vendu', bg: '#1111111A', text: '#111111' },
};

function StatusBadge({ status }: { status: ProductStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.label}
    </span>
  );
}

// ─── Dropdown de changement de statut ────────────────────────────────────────

function StatusDropdown({
  currentStatus,
  onSelect,
  disabled,
}: {
  currentStatus: ProductStatus;
  onSelect: (status: ProductStatus) => void;
  disabled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const statuses: ProductStatus[] = ['DISPONIBLE', 'RESERVE', 'VENDU'];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        disabled={disabled}
        className="flex items-center gap-1 px-2 py-1 text-xs rounded-lg border border-[#d9cdb8] hover:bg-[#F0E9D9] transition-colors disabled:opacity-50"
        style={{ color: '#444444' }}
      >
        Statut
        <ChevronDown size={12} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 mt-1 w-36 rounded-lg border border-[#d9cdb8] shadow-lg z-20 py-1"
            style={{ backgroundColor: '#F8F5EE' }}
          >
            {statuses
              .filter((s) => s !== currentStatus)
              .map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    onSelect(s);
                    setOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-[#F0E9D9] transition-colors"
                  style={{ color: '#444444' }}
                >
                  {STATUS_CONFIG[s].label}
                </button>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Composant principal ─────────────────────────────────────────────────────

export const SellerProductTable: React.FC<SellerProductTableProps> = ({
  products,
  isLoading,
  error,
  onDelete,
  onStatusChange,
  isDeleting,
  productIdBeingDeleted,
  isUpdating,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // Filtrage par recherche
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.nom.toLowerCase().includes(q) ||
        (p.categorie?.nom ?? '').toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [products, searchQuery]);

  // Gestion de la suppression avec confirmation
  const handleDeleteClick = (productId: number) => {
    if (deleteConfirmId === productId) {
      onDelete(productId);
      setDeleteConfirmId(null);
    } else {
      setDeleteConfirmId(productId);
      // Reset confirmation après 3 secondes
      setTimeout(() => setDeleteConfirmId(null), 3000);
    }
  };

  // ─── État de chargement ──
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-16 rounded-xl border border-[#d9cdb8] animate-pulse"
            style={{ backgroundColor: '#EDE8DC' }}
          />
        ))}
      </div>
    );
  }

  // ─── État d'erreur ──
  if (error) {
    return (
      <div
        className="flex items-center gap-3 p-6 rounded-xl border border-red-200"
        style={{ backgroundColor: '#FEF2F2' }}
      >
        <AlertTriangle size={20} className="text-red-500 shrink-0" />
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  // ─── État vide ──
  if (products.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-4 p-12 rounded-xl border border-[#d9cdb8]"
        style={{ backgroundColor: '#EDE8DC' }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#F2700B22' }}
        >
          <Package size={28} style={{ color: '#F2700B' }} />
        </div>
        <div className="text-center">
          <p className="font-bold text-[#111111]">Aucun article</p>
          <p className="text-sm text-[#666666] mt-1">
            Vous n&apos;avez pas encore publié d&apos;article. Commencez dès maintenant !
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Barre de recherche */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un article par nom, catégorie..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#d9cdb8] text-sm focus:outline-none focus:ring-2 focus:ring-[#F2700B] focus:border-transparent transition-shadow"
          style={{ backgroundColor: '#EDE8DC', color: '#111111' }}
        />
      </div>

      {/* Résultat du filtre */}
      {searchQuery && (
        <p className="text-xs text-[#666666]">
          {filtered.length} résultat{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
        </p>
      )}

      {/* Tableau */}
      <div
        className="rounded-xl border border-[#d9cdb8] overflow-hidden shadow-sm"
        style={{ backgroundColor: '#EDE8DC' }}
      >
        {/* En-tête */}
        <div
          className="hidden sm:grid sm:grid-cols-[60px_1fr_100px_120px_100px_120px] gap-4 px-6 py-3 border-b border-[#d9cdb8] text-xs font-bold uppercase tracking-wide text-[#666666]"
          style={{ backgroundColor: '#F0E9D9' }}
        >
          <span>Image</span>
          <span>Nom</span>
          <span>Prix</span>
          <span>Catégorie</span>
          <span>Statut</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Lignes */}
        {filtered.map((product) => (
          <div
            key={product.idProduit}
            className={`grid grid-cols-1 sm:grid-cols-[60px_1fr_100px_120px_100px_120px] gap-4 px-6 py-4 border-b border-[#d9cdb8] last:border-b-0 items-center transition-all duration-200 hover:bg-[#F0E9D9] ${productIdBeingDeleted === product.idProduit ? 'opacity-50' : ''
              }`}
          >
            {/* Image */}
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#d9cdb8] shrink-0">
              {product.imageBase64 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`data:image/jpeg;base64,${product.imageBase64}`}
                  alt={product.nom}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: '#F0E9D9' }}
                >
                  <Package size={16} className="text-[#666666]" />
                </div>
              )}
            </div>

            {/* Nom + description */}
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#111111] truncate">{product.nom}</p>
              <p className="text-xs text-[#666666] truncate">{product.description}</p>
            </div>

            {/* Prix */}
            <p className="text-sm font-bold" style={{ color: '#F2700B' }}>
              {product.prix.toLocaleString('fr-FR')} F
            </p>

            {/* Catégorie */}
            <p className="text-xs text-[#444444]">{product.categorie?.nom}</p>

            {/* Statut */}
            <StatusBadge status={product.statut} />

            {/* Actions */}
            <div className="flex items-center justify-end gap-2">
              <Link
                href={`/dashboard/articles/${product.idProduit}`}
                className="p-2 rounded-lg text-neutral-500 transition-all duration-200 hover:bg-neutral-100 hover:text-[#F2700B]"
                title="Modifier"
              >
                <Pencil size={14} />
              </Link>
              <StatusDropdown
                currentStatus={product.statut}
                onSelect={(s) => onStatusChange(product.idProduit, s)}
                disabled={isUpdating}
              />
              <button
                onClick={() => handleDeleteClick(product.idProduit)}
                disabled={isDeleting && productIdBeingDeleted === product.idProduit}
                className={`p-2 rounded-lg transition-all duration-200 ${deleteConfirmId === product.idProduit
                    ? 'bg-red-500 text-white'
                    : 'hover:bg-red-50 text-[#666666] hover:text-red-500'
                  } disabled:opacity-50`}
                title={
                  deleteConfirmId === product.idProduit
                    ? 'Cliquez pour confirmer'
                    : 'Supprimer'
                }
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
