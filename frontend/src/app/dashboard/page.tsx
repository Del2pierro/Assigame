/**
 * @file page.tsx
 * @route  /dashboard
 * @role   Page principale de l'espace vendeur — charte Assigamé.
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
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#F2700B]">
            Vue d&apos;ensemble
          </p>
          <h2 className="mt-1 text-2xl font-black text-[#111111]">
            Tableau de bord
          </h2>
          <p className="mt-1 text-sm text-[#666666]">
            Suivez l&apos;activité de votre boutique sur Assigamé
          </p>
        </div>
        {!isLoading && stats.totalArticles > 0 && (
          <div
            className="mt-2 flex items-center gap-2 rounded-lg border border-[#d9cdb8] px-3 py-2 text-xs text-[#666666] shadow-sm sm:mt-0"
            style={{ backgroundColor: '#EDE8DC' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#006A4E] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#006A4E]" />
            </span>
            Données à jour
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-500" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <section aria-label="Indicateurs clés">
        <StatsCards stats={stats} isLoading={isLoading} />
      </section>

      <section aria-label="Analyses détaillées" className="pt-4 border-t border-[#d9cdb8]">
        <div className="mb-5">
          <h3 className="text-xl font-black text-[#111111]">Analyses détaillées</h3>
          <p className="text-sm text-[#666666]">
            Répartition et performance par catégorie
          </p>
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
