/**
 * @file page.tsx
 * @route  /admin/categories
 * @role   Page de gestion des catégories de produits.
 *
 * @features
 *  - Liste de toutes les catégories : GET /api/categories
 *  - Création d'une nouvelle catégorie (formulaire inline) : POST /api/categories
 *  - Modification du nom d'une catégorie : PUT /api/categories/{id}
 *  - Suppression avec confirmation : DELETE /api/categories/{id}
 *
 * Route PROTÉGÉE — Rôle ADMIN requis.
 */

'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Check, X, Tag } from 'lucide-react';
import { useAdminStore } from '@/features/admin/store';
import {
  fetchAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/features/admin/api';
import { Categorie } from '@/types/models.types';

export default function AdminCategoriesPage() {
  const {
    categories, isLoading,
    setCategories, setIsLoading,
    confirmDialog, openConfirmDialog, closeConfirmDialog,
  } = useAdminStore();

  // État du formulaire de création
  const [newName, setNewName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // État d'édition inline : stocke l'ID de la catégorie en cours d'édition
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  /** Chargement initial de la liste des catégories */
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllCategories();
        setCategories(data);
      } catch (err) {
        console.error('Erreur chargement catégories :', err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [setCategories, setIsLoading]);

  /** Crée une nouvelle catégorie avec le nom saisi */
  const handleCreate = async () => {
    // Validation : le nom ne doit pas être vide
    if (!newName.trim()) return;
    try {
      const created = await createCategory({ nom: newName.trim() });
      // Ajoute la nouvelle catégorie en tête de liste sans recharger
      setCategories([created, ...categories]);
      setNewName('');
      setIsCreating(false);
    } catch (err) {
      console.error('Erreur création catégorie :', err);
    }
  };

  /** Active le mode édition pour une catégorie */
  const startEdit = (cat: Categorie) => {
    setEditId(cat.idCategorie);
    setEditName(cat.nom); // Pré-remplit le champ avec le nom actuel
  };

  /** Annule le mode édition sans sauvegarder */
  const cancelEdit = () => {
    setEditId(null);
    setEditName('');
  };

  /** Sauvegarde le nouveau nom de la catégorie */
  const handleUpdate = async (id: number) => {
    if (!editName.trim()) return;
    try {
      const updated = await updateCategory(id, { nom: editName.trim() });
      // Mise à jour optimiste : remplace la catégorie modifiée dans la liste
      setCategories(categories.map((c) => (c.idCategorie === id ? updated : c)));
      cancelEdit();
    } catch (err) {
      console.error('Erreur modification catégorie :', err);
    }
  };

  /** Ouvre la modale de confirmation puis supprime si confirmé */
  const handleDeleteRequest = (id: number) => {
    openConfirmDialog({
      targetId: id,
      action: 'deleteCategory',
      message: 'Voulez-vous supprimer cette catégorie ? Les produits associés ne seront pas supprimés.',
    });
  };

  const handleConfirmDelete = async () => {
    if (!confirmDialog.targetId) return;
    try {
      await deleteCategory(confirmDialog.targetId);
      // Retire la catégorie de la liste locale sans recharger
      setCategories(categories.filter((c) => c.idCategorie !== confirmDialog.targetId));
    } catch (err) {
      console.error('Erreur suppression catégorie :', err);
    } finally {
      closeConfirmDialog();
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* ── En-tête ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#111111]">Catégories</h2>
          <p className="text-sm text-[#666666] mt-1">
            {categories.length} catégorie(s) disponible(s)
          </p>
        </div>

        {/* Bouton "Ajouter une catégorie" */}
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-[#111111] transition-colors hover:opacity-80"
          style={{ backgroundColor: '#F2700B' }}
        >
          <Plus size={16} />
          Nouvelle catégorie
        </button>
      </div>

      {/* ── Formulaire de création (affiché seulement si isCreating) ── */}
      {isCreating && (
        <div
          className="flex items-center gap-3 p-4 rounded-xl border border-[#d9cdb8]"
          style={{ backgroundColor: '#EDE8DC' }}
        >
          <Tag size={18} style={{ color: '#F2700B' }} className="shrink-0" />
          <input
            type="text"
            placeholder="Nom de la nouvelle catégorie…"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            // Permet de valider avec la touche Entrée
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            autoFocus
            className="flex-1 bg-transparent text-sm text-[#111111] placeholder-[#999] outline-none"
          />
          {/* Bouton valider */}
          <button
            onClick={handleCreate}
            className="p-1.5 rounded-lg text-white transition-colors hover:opacity-80"
            style={{ backgroundColor: '#F2700B' }}
            title="Créer la catégorie"
          >
            <Check size={15} />
          </button>
          {/* Bouton annuler */}
          <button
            onClick={() => { setIsCreating(false); setNewName(''); }}
            className="p-1.5 rounded-lg border border-[#d9cdb8] text-[#666] hover:bg-[#f0e9d9] transition-colors"
            title="Annuler"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* ── Indicateur de chargement ── */}
      {isLoading && (
        <p className="text-sm text-[#F2700B] animate-pulse">Chargement…</p>
      )}

      {/* ── Liste des catégories ── */}
      <div className="rounded-xl border border-[#d9cdb8] overflow-hidden shadow-sm">
        {categories.length === 0 && !isLoading ? (
          // Message si aucune catégorie
          <div className="py-12 text-center text-[#888] text-sm">
            Aucune catégorie pour le moment.
          </div>
        ) : (
          <ul>
            {categories.map((cat, i) => (
              <li
                key={cat.idCategorie}
                className="flex items-center gap-4 px-5 py-4 border-b border-[#d9cdb8] last:border-b-0 transition-colors hover:bg-[#F0E9D9]"
                style={{ backgroundColor: i % 2 === 0 ? '#F8F5EE' : '#F5F0E6' }}
              >
                {/* Icône */}
                <Tag size={16} style={{ color: '#F2700B' }} className="shrink-0" />

                {/* Nom de la catégorie — mode lecture ou mode édition */}
                {editId === cat.idCategorie ? (
                  // ── Mode édition inline ──
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleUpdate(cat.idCategorie);
                      if (e.key === 'Escape') cancelEdit();
                    }}
                    autoFocus
                    className="flex-1 bg-[#EDE8DC] rounded px-2 py-1 text-sm text-[#111111] outline-none border border-[#F2700B]"
                  />
                ) : (
                  // ── Mode lecture ──
                  <span className="flex-1 text-sm font-medium text-[#111111]">
                    {cat.nom}
                  </span>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {editId === cat.idCategorie ? (
                    // Boutons valider / annuler en mode édition
                    <>
                      <button
                        onClick={() => handleUpdate(cat.idCategorie)}
                        className="p-1.5 rounded-lg text-white transition-colors hover:opacity-80"
                        style={{ backgroundColor: '#F2700B' }}
                        title="Sauvegarder"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-1.5 rounded-lg border border-[#d9cdb8] text-[#666] hover:bg-[#f0e9d9] transition-colors"
                        title="Annuler"
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    // Boutons modifier / supprimer en mode lecture
                    <>
                      <button
                        onClick={() => startEdit(cat)}
                        className="p-1.5 rounded-lg border border-[#d9cdb8] text-[#666] hover:bg-[#EDE8DC] transition-colors"
                        title="Modifier le nom"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteRequest(cat.idCategorie)}
                        className="p-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                        title="Supprimer la catégorie"
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Modale de confirmation de suppression ── */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            className="rounded-2xl p-6 shadow-xl max-w-sm w-full mx-4 border border-[#d9cdb8]"
            style={{ backgroundColor: '#F8F5EE' }}
          >
            <h3 className="text-base font-bold text-[#111111] mb-3">Confirmer la suppression</h3>
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
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
