/**
 * @file page.tsx
 * @route  /dashboard
 * @role   Page principale de l'espace vendeur. Affiche les statistiques rapides
 *         (articles en vente, articles vendus, réservés) et les graphiques
 *         de performance. Assemble : StatsCards + DashboardCharts.
 *         Route PROTÉGÉE (authentification requise via DashboardLayout).
 */

'use client';

import { useSellerDashboard } from '@/features/dashboard/hooks';
import { StatsCards } from '@/features/dashboard/components/StatsCards';
import { DashboardCharts } from '@/features/dashboard/components/DashboardCharts';
import { AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  const { sellerProducts, stats, isLoading, error } = useSellerDashboard();

  return (
    <div className="mx-auto max-w-7xl space-y-8 animate-[fadeInUp_0.4s_ease-out]">
      {/* ── En-tête ── */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
            Vue d&apos;ensemble
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900">
            Tableau de bord
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Suivez l&apos;activité de votre boutique sur Assigamé
          </p>
        </div>
        {!isLoading && stats.totalArticles > 0 && (
          <div className="mt-2 flex items-center gap-2 rounded-lg border border-neutral-200/80 bg-white px-3 py-2 text-xs text-neutral-500 shadow-sm sm:mt-0">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Données à jour
          </div>
        )}
      </div>

      {/* ── Erreur ── */}
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-500" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* ── KPI Cards ── */}
      <section aria-label="Indicateurs clés">
        <StatsCards stats={stats} isLoading={isLoading} />
      </section>

      {/* ── Graphiques ── */}
      <section aria-label="Analyses détaillées">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-neutral-900">Analyses</h3>
            <p className="text-xs text-neutral-500">
              Répartition et performance par catégorie
            </p>
          </div>
        </div>
        <DashboardCharts
          products={sellerProducts}
          stats={stats}
          isLoading={isLoading}
        />
      </section>
    </div>
  );
}
