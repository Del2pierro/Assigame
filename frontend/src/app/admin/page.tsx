/**
 * @file page.tsx
 * @route  /admin
 * @role   Page d'accueil du tableau de bord administrateur.
 *         Affiche les statistiques globales de la plateforme.
 *
 * Route PROTÉGÉE — Rôle ADMIN requis (via AdminLayout).
 */

'use client';

import { useEffect } from 'react';
import { Users, Package, Tag, UserCheck, UserX, ShoppingBag } from 'lucide-react';
import { useAdminStore } from '@/features/admin/store';
import { fetchAllUsers, fetchAllProductsAdmin, fetchAllCategories } from '@/features/admin/api';

// ─── Composant carte de statistique ─────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  accentColor?: string; // Couleur de la valeur (orange par défaut)
}

function StatCard({ label, value, icon, accentColor = '#F2700B' }: StatCardProps) {
  return (
    <div
      className="flex items-center gap-4 rounded-xl p-6 shadow-sm border border-[#d9cdb8]"
      style={{ backgroundColor: '#EDE8DC' }}
    >
      {/* Icône */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: '#F2700B22' }} // Orange très transparent
      >
        <span style={{ color: '#F2700B' }}>{icon}</span>
      </div>

      {/* Valeur + libellé */}
      <div>
        <p className="text-3xl font-black" style={{ color: accentColor }}>
          {value}
        </p>
        <p className="text-sm font-medium text-[#444444]">{label}</p>
      </div>
    </div>
  );
}

// ─── Page principale ─────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const { users, allProducts, categories, isLoading, setUsers, setAllProducts, setCategories, setIsLoading } =
    useAdminStore();

  /**
   * Au chargement de la page, on récupère les données du backend
   * pour calculer les statistiques en temps réel.
   */
  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true);
      try {
        // Chargement parallèle des 3 ressources pour optimiser la vitesse
        const [usersData, productsData, categoriesData] = await Promise.all([
          fetchAllUsers(),
          fetchAllProductsAdmin(),
          fetchAllCategories(),
        ]);
        setUsers(usersData);
        setAllProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques admin :', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, [setUsers, setAllProducts, setCategories, setIsLoading]);

  // ─── Calcul des statistiques à partir des données chargées ───────────────
  const stats = {
    totalUtilisateurs:    users.length,
    utilisateursActifs:   users.filter((u) => u.actif).length,
    utilisateursInactifs: users.filter((u) => !u.actif).length,
    totalProduits:        allProducts.length,
    produitsDisponibles:  allProducts.filter((p) => p.statut === 'DISPONIBLE').length,
    produitsVendus:       allProducts.filter((p) => p.statut === 'VENDU').length,
    totalCategories:      categories.length,
  };

  return (
    <div className="space-y-8">
      {/* ── Titre de la page ── */}
      <div>
        <h2 className="text-2xl font-black text-[#111111]">Tableau de bord</h2>
        <p className="text-sm text-[#666666] mt-1">
          Vue d'ensemble de la plateforme Assigamé
        </p>
      </div>

      {/* ── Indicateur de chargement ── */}
      {isLoading && (
        <p className="text-sm text-[#F2700B] font-medium animate-pulse">
          Chargement des données…
        </p>
      )}

      {/* ── Statistiques utilisateurs ── */}
      <section>
        <h3 className="text-base font-bold text-[#111111] mb-4 uppercase tracking-wide">
          Utilisateurs
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total inscrits"  value={stats.totalUtilisateurs}    icon={<Users size={22} />} />
          <StatCard label="Comptes actifs"  value={stats.utilisateursActifs}   icon={<UserCheck size={22} />} />
          <StatCard label="Comptes inactifs" value={stats.utilisateursInactifs} icon={<UserX size={22} />} accentColor="#111111" />
        </div>
      </section>

      {/* ── Statistiques produits ── */}
      <section>
        <h3 className="text-base font-bold text-[#111111] mb-4 uppercase tracking-wide">
          Produits
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total produits"    value={stats.totalProduits}       icon={<Package size={22} />} />
          <StatCard label="Disponibles"       value={stats.produitsDisponibles} icon={<ShoppingBag size={22} />} />
          <StatCard label="Vendus"            value={stats.produitsVendus}      icon={<ShoppingBag size={22} />} accentColor="#111111" />
        </div>
      </section>

      {/* ── Statistiques catégories ── */}
      <section>
        <h3 className="text-base font-bold text-[#111111] mb-4 uppercase tracking-wide">
          Catégories
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Catégories actives" value={stats.totalCategories} icon={<Tag size={22} />} />
        </div>
      </section>
    </div>
  );
}
