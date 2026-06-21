/**
 * @file page.tsx
 * @route  /admin/produits
 * @role   Page de modération de tous les produits de la plateforme.
 *         Vue catalogue (grille) style Vinted. L'admin peut supprimer tout article.
 *
 * @features
 *  - Liste de TOUS les produits : GET /api/produits
 *  - Filtres : statut (DISPONIBLE / RESERVE / VENDU) + catégorie
 *  - Suppression admin : DELETE /api/produits/{id}
 *
 * Route PROTÉGÉE — Rôle ADMIN requis.
 */

'use client';

import { useEffect, useState } from 'react';
import { Trash2, Search, ExternalLink } from 'lucide-react';
import { useAdminStore } from '@/features/admin/store';
import {
  fetchAllProductsAdmin,
  fetchAllCategories,
  deleteProductAdmin,
} from '@/features/admin/api';
import { ProductStatus } from '@/types/models.types';

// ─── Badge de statut coloré ──────────────────────────────────────────────────
function StatusBadge({ statut }: { statut: ProductStatus }) {
  const styles: Record<ProductStatus, { bg: string; color: string }> = {
    DISPONIBLE: { bg: '#d1fae5', color: '#065f46' },
    RESERVE:    { bg: '#FFF3E0', color: '#F2700B' },
    VENDU:      { bg: '#f3f4f6', color: '#6b7280' },
  };
  const labels: Record<ProductStatus, string> = {
    DISPONIBLE: 'Disponible',
    RESERVE:    'Réservé',
    VENDU:      'Vendu',
  };
  return (
    <span
      className="px-2 py-0.5 rounded-full text-xs font-bold"
      style={styles[statut]}
    >
      {labels[statut]}
    </span>
  );
}

// ─── Page principale ─────────────────────────────────────────────────────────
export default function AdminProductsPage() {
  const {
    allProducts, categories, isLoading,
    setAllProducts, setCategories, setIsLoading,
    removeProductFromList,
    confirmDialog, openConfirmDialog, closeConfirmDialog,
  } = useAdminStore();

  // Filtres locaux
  const [search,          setSearch]          = useState('');
  const [filterStatut,    setFilterStatut]    = useState<ProductStatus | ''>('');
  const [filterCategorie, setFilterCategorie] = useState<number | ''>('');

  /** Chargement initial des produits et catégories */
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [produitsData, catsData] = await Promise.all([
          fetchAllProductsAdmin(),
          fetchAllCategories(),
        ]);
        setAllProducts(produitsData);
        setCategories(catsData);
      } catch (err) {
        console.error('Erreur chargement produits admin :', err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [setAllProducts, setCategories, setIsLoading]);

  /** Demande confirmation avant suppression */
  const handleDeleteRequest = (id: number) => {
    openConfirmDialog({
      targetId: id,
      action: 'deleteProduct',
      message: 'Voulez-vous vraiment supprimer cette annonce ? Cette action est irréversible.',
    });
  };

  /** Confirme et exécute la suppression */
  const handleConfirmDelete = async () => {
    if (!confirmDialog.targetId) return;
    try {
      await deleteProductAdmin(confirmDialog.targetId);
      removeProductFromList(confirmDialog.targetId); // Mise à jour optimiste
    } catch (err) {
      console.error('Erreur suppression produit :', err);
    } finally {
      closeConfirmDialog();
    }
  };

  // ─── Filtrage côté client ─────────────────────────────────────────────────
  const filtered = allProducts.filter((p) => {
    const matchSearch     = search === '' || p.nom.toLowerCase().includes(search.toLowerCase());
    const matchStatut     = filterStatut === '' || p.statut === filterStatut;
    const matchCategorie  = filterCategorie === '' || p.categorie.idCategorie === filterCategorie;
    return matchSearch && matchStatut && matchCategorie;
  });

  return (
    <div className="space-y-6">
      {/* ── En-tête ── */}
      <div>
        <h2 className="text-2xl font-black text-[#111111]">Catalogue des produits</h2>
        <p className="text-sm text-[#666666] mt-1">
          {allProducts.length} article(s) en ligne sur la plateforme
        </p>
      </div>

      {/* ── Barre de filtres ── */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Recherche par nom */}
        <div className="flex items-center gap-2 bg-[#EDE8DC] border border-[#d9cdb8] rounded-lg px-3 py-2 flex-1 min-w-[180px]">
          <Search size={16} className="text-[#666666] shrink-0" />
          <input
            type="text"
            placeholder="Rechercher un article…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-[#111111] placeholder-[#999] outline-none w-full"
          />
        </div>

        {/* Filtre par statut */}
        <select
          value={filterStatut}
          onChange={(e) => setFilterStatut(e.target.value as ProductStatus | '')}
          className="px-3 py-2 rounded-lg text-sm border border-[#d9cdb8] bg-[#EDE8DC] text-[#444444] outline-none"
        >
          <option value="">Tous les statuts</option>
          <option value="DISPONIBLE">Disponible</option>
          <option value="RESERVE">Réservé</option>
          <option value="VENDU">Vendu</option>
        </select>

        {/* Filtre par catégorie */}
        <select
          value={filterCategorie}
          onChange={(e) => setFilterCategorie(e.target.value === '' ? '' : Number(e.target.value))}
          className="px-3 py-2 rounded-lg text-sm border border-[#d9cdb8] bg-[#EDE8DC] text-[#444444] outline-none"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((c) => (
            <option key={c.idCategorie} value={c.idCategorie}>{c.nom}</option>
          ))}
        </select>
      </div>

      {/* ── Indicateur de chargement ── */}
      {isLoading && (
        <p className="text-sm text-[#F2700B] animate-pulse">Chargement des articles…</p>
      )}

      {/* ── Grille catalogue (style Vinted) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((produit) => (
          <div
            key={produit.idProduit}
            className="rounded-xl border border-[#d9cdb8] overflow-hidden shadow-sm flex flex-col group transition-shadow hover:shadow-md"
            style={{ backgroundColor: '#F0E9D9' }}
          >
            {/* Image du produit */}
            <div className="relative aspect-square bg-[#EDE8DC] overflow-hidden">
              {produit.imageBase64 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`data:image/jpeg;base64,${produit.imageBase64}`}
                  alt={produit.nom}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                // Placeholder si pas d'image
                <div className="w-full h-full flex items-center justify-center text-[#aaa] text-xs">
                  Pas d'image
                </div>
              )}

              {/* Badge statut en superposition */}
              <div className="absolute top-2 right-2">
                <StatusBadge statut={produit.statut} />
              </div>
            </div>

            {/* Informations produit */}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-bold text-[#111111] text-sm line-clamp-2 mb-1">
                {produit.nom}
              </h3>
              <p className="text-lg font-black text-[#F2700B] mb-2">
                {produit.prix.toFixed(2).replace('.', ',')} €
              </p>

              {/* Catégorie + vendeur */}
              <div className="flex flex-col gap-0.5 text-xs text-[#666] mb-3">
                <span>📦 {produit.categorie.nom}</span>
                <span>👤 {produit.utilisateur.prenom} {produit.utilisateur.nom}</span>
                <span>📅 {new Date(produit.datePublication).toLocaleDateString('fr-FR')}</span>
              </div>

              {/* Actions admin */}
              <div className="mt-auto flex gap-2">
                {/* Ouvrir la fiche produit dans un nouvel onglet */}
                <a
                  href={`/produits/${produit.idProduit}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium border border-[#d9cdb8] text-[#444] hover:bg-[#EDE8DC] transition-colors"
                >
                  <ExternalLink size={13} />
                  Voir
                </a>

                {/* Bouton supprimer */}
                <button
                  onClick={() => handleDeleteRequest(produit.idProduit)}
                  className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-bold border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                  title="Supprimer cette annonce"
                >
                  <Trash2 size={13} />
                  Retirer
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Message si liste vide */}
        {filtered.length === 0 && !isLoading && (
          <div className="col-span-full py-12 text-center text-[#888] text-sm">
            Aucun produit trouvé avec ces filtres.
          </div>
        )}
      </div>

      {/* ── Modale de confirmation ── */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            className="rounded-2xl p-6 shadow-xl max-w-sm w-full mx-4 border border-[#d9cdb8]"
            style={{ backgroundColor: '#F8F5EE' }}
          >
            <h3 className="text-base font-bold text-[#111111] mb-3">Confirmer le retrait</h3>
            <p className="text-sm text-[#444444] mb-6">{confirmDialog.message}</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={closeConfirmDialog}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-[#d9cdb8] text-[#444444] hover:bg-[#EDE8DC] transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition-colors"
              >
                Retirer l'annonce
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
