/**
 * @file page.tsx
 * @route  /admin/utilisateurs
 * @role   Page de gestion de tous les utilisateurs de la plateforme.
 *
 * @features
 *  - Liste complète de tous les utilisateurs inscrits
 *  - Filtre par statut actif/inactif et recherche par email
 *  - Basculement actif ↔ inactif : PATCH /api/utilisateurs/{id}/toggle-actif
 *  - Suppression d'un compte : DELETE /api/utilisateurs/{id}
 *
 * Route PROTÉGÉE — Rôle ADMIN requis.
 */

'use client';

import { useEffect, useState } from 'react';
import { UserCheck, UserX, Trash2, Search } from 'lucide-react';
import { useAdminStore } from '@/features/admin/store';
import { fetchAllUsers, toggleUserStatus, deleteUser } from '@/features/admin/api';
import { Utilisateur } from '@/types/models.types';

export default function AdminUsersPage() {
  const {
    users, isLoading,
    setUsers, setIsLoading, updateUserInList, removeUserFromList,
    confirmDialog, openConfirmDialog, closeConfirmDialog,
  } = useAdminStore();

  // Filtre local : recherche texte + filtre actif/inactif
  const [search, setSearch]   = useState('');
  const [filterActif, setFilterActif] = useState<boolean | null>(null);

  /** Chargement initial de la liste des utilisateurs */
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAllUsers();
        setUsers(data);
      } catch (err) {
        console.error('Erreur chargement utilisateurs :', err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [setUsers, setIsLoading]);

  /** Active ou désactive un compte utilisateur */
  const handleToggle = async (user: Utilisateur) => {
    try {
      const result = await toggleUserStatus(user.idUtilisateur);
      // Mise à jour optimiste : on modifie l'utilisateur dans la liste locale
      updateUserInList({ ...user, actif: result.actif });
    } catch (err) {
      console.error('Erreur toggle statut :', err);
    }
  };

  /** Ouvre la modale de confirmation puis supprime si confirmé */
  const handleDeleteRequest = (id: number) => {
    openConfirmDialog({
      targetId: id,
      action: 'deleteUser',
      message: 'Voulez-vous vraiment supprimer définitivement ce compte ? Cette action est irréversible.',
    });
  };

  const handleConfirmDelete = async () => {
    if (!confirmDialog.targetId) return;
    try {
      await deleteUser(confirmDialog.targetId);
      removeUserFromList(confirmDialog.targetId); // Mise à jour optimiste
    } catch (err) {
      console.error('Erreur suppression utilisateur :', err);
    } finally {
      closeConfirmDialog();
    }
  };

  // ─── Filtrage côté client ─────────────────────────────────────────────────
  const filteredUsers = users.filter((u) => {
    const matchSearch =
      search === '' ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.nom.toLowerCase().includes(search.toLowerCase()) ||
      u.prenom.toLowerCase().includes(search.toLowerCase());
    const matchActif = filterActif === null || u.actif === filterActif;
    return matchSearch && matchActif;
  });

  return (
    <div className="space-y-6">
      {/* ── En-tête ── */}
      <div>
        <h2 className="text-2xl font-black text-[#111111]">Gestion des utilisateurs</h2>
        <p className="text-sm text-[#666666] mt-1">{users.length} utilisateur(s) inscrit(s)</p>
      </div>

      {/* ── Barre de filtres ── */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Champ de recherche */}
        <div className="flex items-center gap-2 bg-[#EDE8DC] border border-[#d9cdb8] rounded-lg px-3 py-2 flex-1 min-w-[200px]">
          <Search size={16} className="text-[#666666] shrink-0" />
          <input
            type="text"
            placeholder="Rechercher par nom ou email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-[#111111] placeholder-[#999] outline-none w-full"
          />
        </div>

        {/* Filtres statut */}
        {[
          { label: 'Tous',     value: null  },
          { label: 'Actifs',   value: true  },
          { label: 'Inactifs', value: false },
        ].map(({ label, value }) => (
          <button
            key={label}
            onClick={() => setFilterActif(value)}
            className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
            style={{
              backgroundColor: filterActif === value ? '#F2700B' : '#EDE8DC',
              color:           filterActif === value ? '#111111' : '#444444',
              borderColor:     filterActif === value ? '#F2700B' : '#d9cdb8',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Indicateur de chargement ── */}
      {isLoading && (
        <p className="text-sm text-[#F2700B] animate-pulse">Chargement…</p>
      )}

      {/* ── Tableau des utilisateurs ── */}
      <div className="rounded-xl border border-[#d9cdb8] overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead style={{ backgroundColor: '#EDE8DC' }}>
            <tr>
              {['ID', 'Nom / Prénom', 'Email', 'Rôle', 'Inscription', 'Statut', 'Actions'].map((col) => (
                <th key={col} className="px-4 py-3 text-left text-xs font-bold text-[#444444] uppercase tracking-wide">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, i) => (
              <tr
                key={user.idUtilisateur}
                className="border-t border-[#d9cdb8] transition-colors hover:bg-[#F0E9D9]"
                style={{ backgroundColor: i % 2 === 0 ? '#F8F5EE' : '#F5F0E6' }}
              >
                <td className="px-4 py-3 text-[#888]">#{user.idUtilisateur}</td>
                <td className="px-4 py-3 font-semibold text-[#111111]">
                  {user.prenom} {user.nom}
                </td>
                <td className="px-4 py-3 text-[#444444]">{user.email}</td>
                <td className="px-4 py-3">
                  <span
                    className="px-2 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: user.typeUtilisateur.libelle === 'ADMIN' ? '#F2700B22' : '#11111111',
                      color:           user.typeUtilisateur.libelle === 'ADMIN' ? '#F2700B'   : '#444444',
                    }}
                  >
                    {user.typeUtilisateur.libelle}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#666]">
                  {new Date(user.dateInscription).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-4 py-3">
                  <span
                    className="px-2 py-1 rounded-full text-xs font-bold border"
                    style={{
                      backgroundColor: user.actif ? '#d1fae5' : '#fee2e2',
                      color:           user.actif ? '#065f46'  : '#991b1b',
                      borderColor:     user.actif ? '#6ee7b7'  : '#fca5a5',
                    }}
                  >
                    {user.actif ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {/* Bouton activer / désactiver */}
                    <button
                      onClick={() => handleToggle(user)}
                      title={user.actif ? 'Désactiver le compte' : 'Activer le compte'}
                      className="p-1.5 rounded-lg border transition-colors hover:opacity-80"
                      style={{
                        borderColor:     user.actif ? '#d9cdb8' : '#6ee7b7',
                        backgroundColor: 'transparent',
                        color:           user.actif ? '#666'    : '#065f46',
                      }}
                    >
                      {user.actif ? <UserX size={15} /> : <UserCheck size={15} />}
                    </button>

                    {/* Bouton supprimer */}
                    <button
                      onClick={() => handleDeleteRequest(user.idUtilisateur)}
                      title="Supprimer définitivement"
                      className="p-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* Message si aucun résultat */}
            {filteredUsers.length === 0 && !isLoading && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[#888] text-sm">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
