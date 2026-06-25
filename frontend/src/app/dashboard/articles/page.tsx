/**
 * @file page.tsx
 * @route  /dashboard/articles
 * @role   Page de gestion des articles du vendeur. Affiche la liste de tous
 *         les produits du vendeur avec les actions de gestion (statut, suppression).
 *         Assemble : SellerProductTable.
 *         Route PROTÉGÉE (authentification requise via DashboardLayout).
 */

'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useSellerDashboard, useProductDelete, useStatusUpdate } from '@/features/dashboard/hooks';
import { SellerProductTable } from '@/features/dashboard/components/SellerProductTable';

export default function ArticlesPage() {
  const { sellerProducts, isLoading, error } = useSellerDashboard();
  const { deleteProduct, isDeleting, productIdBeingDeleted } = useProductDelete();
  const { updateStatus, isUpdating } = useStatusUpdate();

  return (
    <div className="space-y-6">
      {/* ── En-tête avec bouton d'action ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#111111]">Mes articles</h2>
          <p className="text-sm text-[#666666] mt-1">
            Gérez vos annonces publiées sur Assigamé
          </p>
        </div>
        <Link
          href="/dashboard/articles/nouveau"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:shadow-md"
          style={{ backgroundColor: '#F2700B' }}
        >
          <Plus size={16} />
          Nouveau produit
        </Link>
      </div>

      {/* ── Table des produits ── */}
      <SellerProductTable
        products={sellerProducts}
        isLoading={isLoading}
        error={error}
        onDelete={deleteProduct}
        onStatusChange={updateStatus}
        isDeleting={isDeleting}
        productIdBeingDeleted={productIdBeingDeleted}
        isUpdating={isUpdating}
      />
    </div>
  );
}
