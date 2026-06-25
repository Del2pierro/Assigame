/**
 * @file DashboardCharts.tsx
 * @feature dashboard
 * @role  Graphiques Recharts pour le vendeur : donut de répartition des statuts
 *        et bar chart produits par catégorie. Style Stripe/Linear.
 */

'use client';

import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts';
import { BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { Produit } from '@/types/models.types';
import { DashboardStats } from '../types';
import { ChartCard } from '@/components/ui/ChartCard';
import { ChartSkeleton } from '@/components/ui/Skeleton';

interface DashboardChartsProps {
  products: Produit[];
  stats: DashboardStats;
  isLoading?: boolean;
}

const STATUS_COLORS = ['#006A4E', '#F2700B', '#111111'];

const tooltipStyle = {
  borderRadius: '8px',
  border: '1px solid #e5e5e5',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  fontSize: '12px',
  padding: '8px 12px',
};

function CustomPieTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { fill: string } }>;
}) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div style={tooltipStyle} className="bg-white">
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: item.payload.fill }}
        />
        <span className="text-neutral-600">{item.name}</span>
        <span className="font-semibold text-neutral-900">{item.value}</span>
      </div>
    </div>
  );
}

function CustomBarTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div style={tooltipStyle} className="bg-white">
      <p className="mb-1 text-xs text-neutral-500">{label}</p>
      <p className="text-sm font-semibold text-neutral-900">
        {payload[0].value} produit{payload[0].value > 1 ? 's' : ''}
      </p>
    </div>
  );
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({
  products,
  stats,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartSkeleton height={280} />
        <ChartSkeleton height={280} />
      </div>
    );
  }

  const statusPieData = [
    { name: 'En vente', value: stats.totalEnVente, fill: STATUS_COLORS[0] },
    { name: 'Réservés', value: stats.totalReserves, fill: STATUS_COLORS[1] },
    { name: 'Vendus', value: stats.totalVendus, fill: STATUS_COLORS[2] },
  ].filter((d) => d.value > 0);

  const categoryMap = products.reduce<Record<string, { count: number; totalPrix: number }>>(
    (acc, product) => {
      const catName = product.categorie?.nom ?? 'Autre';
      if (!acc[catName]) {
        acc[catName] = { count: 0, totalPrix: 0 };
      }
      acc[catName].count += 1;
      acc[catName].totalPrix += product.prix;
      return acc;
    },
    {}
  );

  const productsByCategoryData = Object.entries(categoryMap)
    .map(([name, data]) => ({
      name: name.length > 12 ? `${name.slice(0, 12)}…` : name,
      fullName: name,
      produits: data.count,
      prixMoyen: Math.round(data.totalPrix / data.count),
    }))
    .sort((a, b) => b.produits - a.produits);

  const hasStatusData = statusPieData.length > 0;
  const totalStatus = stats.totalEnVente + stats.totalReserves + stats.totalVendus;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-white px-8 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-50">
          <BarChart3 size={24} className="text-neutral-400" />
        </div>
        <p className="text-sm font-medium text-neutral-900">Aucune donnée disponible</p>
        <p className="mt-1 max-w-sm text-xs text-neutral-500">
          Publiez vos premiers articles pour visualiser la répartition et les performances par catégorie.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Donut — Répartition des statuts */}
      <ChartCard
        title="Répartition des statuts"
        subtitle={`${totalStatus} article${totalStatus > 1 ? 's' : ''} au total`}
      >
        {hasStatusData ? (
          <div className="relative h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  innerRadius={72}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Légende custom */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-wrap justify-center gap-x-4 gap-y-2">
              {statusPieData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs text-neutral-600">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  />
                  {item.name}
                  <span className="font-medium text-neutral-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-[280px] flex-col items-center justify-center text-neutral-400">
            <PieChartIcon size={32} className="mb-2 opacity-40" />
            <p className="text-xs">Pas encore de statistiques</p>
          </div>
        )}
      </ChartCard>

      {/* Bar Chart — Produits par catégorie */}
      <ChartCard
        title="Produits par catégorie"
        subtitle={`${productsByCategoryData.length} catégorie${productsByCategoryData.length > 1 ? 's' : ''}`}
      >
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={productsByCategoryData}
              margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
              barCategoryGap="20%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f0f0"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fill: '#737373', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval={0}
                angle={productsByCategoryData.length > 4 ? -25 : 0}
                textAnchor={productsByCategoryData.length > 4 ? 'end' : 'middle'}
                height={productsByCategoryData.length > 4 ? 50 : 30}
              />
              <YAxis
                tick={{ fill: '#737373', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <RechartsTooltip
                cursor={{ fill: 'rgba(242, 112, 11, 0.06)' }}
                content={<CustomBarTooltip />}
              />
              <Bar
                dataKey="produits"
                fill="#F2700B"
                radius={[6, 6, 0, 0]}
                maxBarSize={48}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};
