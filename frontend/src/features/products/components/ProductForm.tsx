'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Upload,
  Package,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { productSchema } from '@/lib/validators';
import { productApi } from '../api';
import { categoryApi } from '@/features/categories/api';
import { Categorie } from '@/types/models.types';

interface ProductFormProps {
  mode: 'create' | 'edit';
  productId?: number;
  onSuccess?: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  mode,
  productId,
  onSuccess,
}) => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [idCategorie, setIdCategorie] = useState('');
  const [imageBase64, setImageBase64] = useState<string | undefined>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [categories, setCategories] = useState<Categorie[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(mode === 'edit');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    categoryApi.fetchCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    if (mode !== 'edit' || !productId) return;

    setIsLoadingData(true);
    productApi
      .fetchProductById(productId)
      .then((product) => {
        setNom(product.nom);
        setDescription(product.description);
        setPrix(String(product.prix));
        setIdCategorie(String(product.categorie.idCategorie));
        if (product.imageBase64) {
          setImageBase64(product.imageBase64);
          setImagePreview(`data:image/jpeg;base64,${product.imageBase64}`);
        }
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoadingData(false));
  }, [mode, productId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('L\'image ne doit pas dépasser 5 Mo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      setImageBase64(base64);
      setImagePreview(result);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const parsed = productSchema.safeParse({
      nom,
      description,
      prix,
      idCategorie,
    });

    if (!parsed.success) {
      const errors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0]?.toString() ?? 'form';
        errors[key] = issue.message;
      });
      setFieldErrors(errors);
      return;
    }

    if (mode === 'create' && !imageBase64) {
      setFieldErrors({ image: 'Une image est requise pour publier un article.' });
      return;
    }

    const userId =
      typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;
    if (!userId) {
      setError('Session expirée. Veuillez vous reconnecter.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        nom: parsed.data.nom,
        description: parsed.data.description,
        prix: parsed.data.prix,
        imageBase64,
      };

      if (mode === 'create') {
        await productApi.createProduct(
          Number(userId),
          parsed.data.idCategorie,
          payload
        );
      } else if (productId) {
        await productApi.updateProduct(productId, payload);
      }

      onSuccess?.();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'enregistrement.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[#F2700B]" />
      </div>
    );
  }

  const title = mode === 'create' ? 'Nouvel article' : 'Modifier l\'article';

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/articles"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-colors hover:bg-neutral-50"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h2 className="text-xl font-semibold text-neutral-900">{title}</h2>
          <p className="text-sm text-neutral-500">
            {mode === 'create'
              ? 'Remplissez les informations de votre annonce'
              : 'Mettez à jour les informations de votre annonce'}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-sm"
      >
        <div className="space-y-6 p-6">
          {error && (
            <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          {/* Image */}
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Photo du produit {mode === 'create' && <span className="text-red-500">*</span>}
            </label>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="relative flex h-36 w-36 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50">
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imagePreview}
                    alt="Aperçu"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Package size={32} className="text-neutral-300" />
                )}
              </div>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
                <Upload size={16} />
                Choisir une image
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            {fieldErrors.image && (
              <p className="mt-1.5 text-xs text-red-600">{fieldErrors.image}</p>
            )}
          </div>

          {/* Nom */}
          <div>
            <label htmlFor="nom" className="mb-2 block text-sm font-medium text-neutral-700">
              Nom du produit <span className="text-red-500">*</span>
            </label>
            <input
              id="nom"
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm focus:border-[#F2700B] focus:outline-none focus:ring-2 focus:ring-[#F2700B]/20"
              placeholder="Ex : Robe wax traditionnelle"
            />
            {fieldErrors.nom && (
              <p className="mt-1.5 text-xs text-red-600">{fieldErrors.nom}</p>
            )}
          </div>

          {/* Catégorie */}
          <div>
            <label htmlFor="categorie" className="mb-2 block text-sm font-medium text-neutral-700">
              Catégorie <span className="text-red-500">*</span>
            </label>
            <select
              id="categorie"
              value={idCategorie}
              onChange={(e) => setIdCategorie(e.target.value)}
              disabled={mode === 'edit'}
              className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm focus:border-[#F2700B] focus:outline-none focus:ring-2 focus:ring-[#F2700B]/20 disabled:bg-neutral-50 disabled:text-neutral-500"
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.idCategorie} value={cat.idCategorie}>
                  {cat.nom}
                </option>
              ))}
            </select>
            {mode === 'edit' && (
              <p className="mt-1 text-xs text-neutral-400">
                La catégorie ne peut pas être modifiée après publication.
              </p>
            )}
            {fieldErrors.idCategorie && (
              <p className="mt-1.5 text-xs text-red-600">{fieldErrors.idCategorie}</p>
            )}
          </div>

          {/* Prix */}
          <div>
            <label htmlFor="prix" className="mb-2 block text-sm font-medium text-neutral-700">
              Prix (F CFA) <span className="text-red-500">*</span>
            </label>
            <input
              id="prix"
              type="number"
              min="1"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-sm focus:border-[#F2700B] focus:outline-none focus:ring-2 focus:ring-[#F2700B]/20"
              placeholder="Ex : 15000"
            />
            {fieldErrors.prix && (
              <p className="mt-1.5 text-xs text-red-600">{fieldErrors.prix}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-medium text-neutral-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-lg border border-neutral-200 px-4 py-2.5 text-sm focus:border-[#F2700B] focus:outline-none focus:ring-2 focus:ring-[#F2700B]/20"
              placeholder="Décrivez votre article (état, taille, matière…)"
            />
            {fieldErrors.description && (
              <p className="mt-1.5 text-xs text-red-600">{fieldErrors.description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-neutral-100 bg-neutral-50/50 px-6 py-4">
          <Link
            href="/dashboard/articles"
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100"
          >
            Annuler
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-lg bg-[#F2700B] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#e0650a] disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Enregistrement…
              </>
            ) : (
              <>
                <CheckCircle2 size={16} />
                {mode === 'create' ? 'Publier l\'article' : 'Enregistrer'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
