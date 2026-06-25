/**
 * @file page.tsx
 * @route  /produits/:id
 * @role   Page de détail d'un article. Récupère l'ID depuis params.id et
 *         passe au composant ProductDetail de la feature products.
 *         Ne contient aucune logique métier.
 */

'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ProductDetail } from '@/features/products/components/ProductDetail';
import { ChatSidebar } from '@/features/chat/components/ChatSidebar';
import { useAuthStore } from '@/store/auth.store';

export default function ProductDetailPage() {
  const params = useParams();
  const idStr = Array.isArray(params.id) ? params.id[0] : params.id;
  const productId = parseInt(idStr || '1', 10);

  useEffect(() => {
    useAuthStore.getState().initGuest();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f5ee]">
      {/* Composant Produit (Navbar etc devraient être dans layout.tsx) */}
      <div className="pt-12">
        <ProductDetail productId={productId} />
      </div>

      {/* Sidebar du Chat (S'affiche par dessus le reste si ouverte) */}
      <ChatSidebar />
    </div>
  );
}
