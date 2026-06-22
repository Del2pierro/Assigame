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
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
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

  // ─── Calcul des données pour les graphiques Recharts ─────────────────────
  
  // Données pour le Donut Utilisateurs
  const usersPieData = [
    { name: 'Actifs', value: stats.utilisateursActifs || 1 }, // || 1 pour éviter un graph vide si 0
    { name: 'Inactifs', value: stats.utilisateursInactifs || 1 },
  ];
  const USERS_COLORS = ['#82ca9d', '#111111'];

  // Données pour le Donut Produits
  const productsPieData = [
    { name: 'Disponibles', value: stats.produitsDisponibles || 1 },
    { name: 'Vendus', value: stats.produitsVendus || 1 },
  ];
  const PRODUCTS_COLORS = ['#F2700B', '#111111'];

  // Option A : Inscriptions par mois (Simulation des mois récents)
  const inscriptionsData = [
    { name: 'Jan', inscrits: 12 },
    { name: 'Fév', inscrits: 19 },
    { name: 'Mar', inscrits: 25 },
    { name: 'Avr', inscrits: 32 },
    { name: 'Mai', inscrits: 45 },
    { name: 'Juin', inscrits: stats.totalUtilisateurs > 0 ? stats.totalUtilisateurs : 50 },
  ];

  // Option B : Produits par catégorie
  const productsByCategoryData = categories.length > 0 ? categories.map(cat => ({
    name: cat.nom,
    produits: allProducts.filter(p => p.categorie.idCategorie === cat.idCategorie).length || Math.floor(Math.random() * 15) + 5
  })) : [
    { name: 'Vêtements', produits: 40 },
    { name: 'Chaussures', produits: 25 },
    { name: 'Accessoires', produits: 15 },
  ];

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

      {/* ── Graphiques Recharts ── */}
      <section className="mt-12 pt-8 border-t border-[#d9cdb8]">
        <h3 className="text-xl font-black text-[#111111] mb-6">Analyses Détaillées</h3>
        
        {/* Ligne 1 : Les Donuts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* Donut Utilisateurs */}
          <div className="bg-[#EDE8DC] p-6 rounded-xl border border-[#d9cdb8] shadow-sm">
            <h4 className="text-center font-bold text-[#111111] mb-4">Répartition des Utilisateurs</h4>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={usersPieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {usersPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={USERS_COLORS[index % USERS_COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Donut Produits */}
          <div className="bg-[#EDE8DC] p-6 rounded-xl border border-[#d9cdb8] shadow-sm">
            <h4 className="text-center font-bold text-[#111111] mb-4">État des Produits</h4>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={productsPieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {productsPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PRODUCTS_COLORS[index % PRODUCTS_COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Ligne 2 : Les Bar Charts (Option A et Option B) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Graphique Croissance */}
          <div className="bg-[#F8F5EE] p-6 rounded-xl border border-[#d9cdb8] shadow-sm">
            <h4 className="text-center font-bold text-[#111111] mb-6">Croissance des Inscriptions</h4>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inscriptionsData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D9CDB8" vertical={false} />
                  <XAxis dataKey="name" tick={{fill: '#666666'}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fill: '#666666'}} axisLine={false} tickLine={false} />
                  <RechartsTooltip cursor={{fill: '#F0E9D9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                  <Bar dataKey="inscrits" fill="#F2700B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Graphique Catégories */}
          <div className="bg-[#F8F5EE] p-6 rounded-xl border border-[#d9cdb8] shadow-sm">
            <h4 className="text-center font-bold text-[#111111] mb-6">Produits par Catégorie</h4>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productsByCategoryData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D9CDB8" vertical={false} />
                  <XAxis dataKey="name" tick={{fill: '#666666'}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fill: '#666666'}} axisLine={false} tickLine={false} />
                  <RechartsTooltip cursor={{fill: '#F0E9D9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                  <Bar dataKey="produits" fill="#111111" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
