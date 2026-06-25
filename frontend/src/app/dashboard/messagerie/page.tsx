/**
 * @file page.tsx
 * @route  /dashboard/messagerie
 * @role   Page de messagerie du vendeur. Affiche toutes les conversations
 *         avec les acheteurs et permet de répondre en temps réel.
 *         Assemble : SellerChatPanel.
 *         Route PROTÉGÉE (authentification requise via DashboardLayout).
 */

'use client';

import { SellerChatPanel } from '@/features/dashboard/components/SellerChatPanel';

export default function MessageriePage() {
  return (
    <div className="space-y-6">
      {/* ── En-tête ── */}
      <div>
        <h2 className="text-2xl font-black text-[#111111]">Messagerie</h2>
        <p className="text-sm text-[#666666] mt-1">
          Répondez aux acheteurs intéressés par vos articles
        </p>
      </div>

      {/* ── Panel de chat ── */}
      <SellerChatPanel />
    </div>
  );
}
