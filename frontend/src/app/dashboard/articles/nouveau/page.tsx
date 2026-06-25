/**
 * @file page.tsx
 * @route  /dashboard/articles/nouveau
 * @role   Page de création d'un nouvel article.
 */

'use client';

import { useRouter } from 'next/navigation';
import { ProductForm } from '@/features/products/components/ProductForm';

export default function NewArticlePage() {
  const router = useRouter();

  return (
    <ProductForm
      mode="create"
      onSuccess={() => router.push('/dashboard/articles')}
    />
  );
}
