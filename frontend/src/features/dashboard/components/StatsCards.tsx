/**
 * @file StatsCards.tsx
 * @feature dashboard
 * @role  Composant affichant 4 cartes statistiques du vendeur en grille.
 *        Utilise le composant générique KpiCard avec skeleton loading.
 */

'use client';

import React from 'react';
import { Package, ShoppingBag, Clock, CheckCircle } from 'lucide-react';
import { KpiCard } from '@/components/ui/KpiCard';
import { KpiGridSkeleton } from '@/components/ui/Skeleton';
import { DashboardStats } from '../types';

interface StatsCardsProps {
  stats: DashboardStats;
  isLoading: boolean;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats, isLoading }) => {
  if (isLoading) {
    return <KpiGridSkeleton count={4} />;
  }

  const sellRate =
    stats.totalArticles > 0
      ? Math.round((stats.totalVendus / stats.totalArticles) * 100)
      : 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        label="Total articles"
        value={stats.totalArticles}
        icon={<Package size={20} />}
        accentColor="#F2700B"
        description="Dans votre catalogue"
      />
      <KpiCard
        label="En vente"
        value={stats.totalEnVente}
        icon={<ShoppingBag size={20} />}
        accentColor="#006A4E"
        description="Disponibles à l'achat"
      />
      <KpiCard
        label="Réservés"
        value={stats.totalReserves}
        icon={<Clock size={20} />}
        accentColor="#F2700B"
        description="En cours de négociation"
      />
      <KpiCard
        label="Vendus"
        value={stats.totalVendus}
        icon={<CheckCircle size={20} />}
        accentColor="#111111"
        trend={
          stats.totalArticles > 0
            ? { value: `${sellRate}%`, label: 'du catalogue', positive: sellRate > 0 }
            : undefined
        }
      />
    </div>
  );
};
