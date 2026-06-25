/**
 * @file page.tsx
 * @route  /dashboard/articles/:id
 * @role   Page d'édition d'un article existant.
 */

'use client';

import { useRouter, useParams } from 'next/navigation';
import { ProductForm } from '@/features/products/components/ProductForm';

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);

  if (!productId || Number.isNaN(productId)) {
    return (
      <p className="text-sm text-red-600">Identifiant d&apos;article invalide.</p>
    );
  }

  return (
    <ProductForm
      mode="edit"
      productId={productId}
      onSuccess={() => router.push('/dashboard/articles')}
    />
  );
}
