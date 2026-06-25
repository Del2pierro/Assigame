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
  Tag,
} from 'lucide-react';
import { productSchema } from '@/lib/validators';
import { productApi } from '../api';
import { categoryApi } from '@/features/categories/api';
import { Categorie } from '@/types/models.types';

const OTHER_CATEGORY = '__other__';

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
  const [customCategoryName, setCustomCategoryName] = useState('');
  const [imageBase64, setImageBase64] = useState<string | undefined>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [categories, setCategories] = useState<Categorie[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(mode === 'edit');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setIsLoadingCategories(true);
    categoryApi
      .fetchCategories()
      .then(setCategories)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoadingCategories(false));
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

    const isOtherCategory = idCategorie === OTHER_CATEGORY;

    if (!idCategorie) {
      setFieldErrors({ idCategorie: 'La catégorie est obligatoire.' });
      return;
    }

    if (isOtherCategory && !customCategoryName.trim()) {
      setFieldErrors({ customCategory: 'Indiquez le nom de la nouvelle catégorie.' });
      return;
    }

    const parsed = productSchema.safeParse({
      nom,
      description,
      prix,
      idCategorie: isOtherCategory ? 1 : idCategorie,
    });

    if (!parsed.success) {
      const errors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0]?.toString() ?? 'form';
        if (key !== 'idCategorie' || !isOtherCategory) {
          errors[key] = issue.message;
        }
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
      let categoryId = parsed.data.idCategorie;

      if (isOtherCategory) {
        const created = await categoryApi.createCategory(customCategoryName.trim());
        categoryId = created.idCategorie;
      }

      const payload = {
        nom: parsed.data.nom,
        description: parsed.data.description,
        prix: parsed.data.prix,
        imageBase64,
      };

      if (mode === 'create') {
        await productApi.createProduct(Number(userId), categoryId, payload);
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
  const inputClass =
    'w-full rounded-xl border border-[#d9cdb8] bg-[#F8F5EE] px-4 py-2.5 text-sm text-[#111111] focus:border-[#F2700B] focus:outline-none focus:ring-2 focus:ring-[#F2700B]/20';

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/articles"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#d9cdb8] text-[#666666] transition-colors hover:bg-[#F0E9D9]"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h2 className="text-xl font-black text-[#111111]">{title}</h2>
          <p className="text-sm text-[#666666]">
            {mode === 'create'
              ? 'Remplissez les informations de votre annonce'
              : 'Mettez à jour les informations de votre annonce'}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-xl border border-[#d9cdb8] bg-[#EDE8DC] shadow-sm"
      >
        <div className="space-y-6 p-6">
          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          {/* Image */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#444444]">
              Photo du produit {mode === 'create' && <span className="text-red-500">*</span>}
            </label>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="relative flex h-36 w-36 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#d9cdb8] bg-[#F8F5EE]">
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imagePreview}
                    alt="Aperçu"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Package size={32} className="text-[#c4b89a]" />
                )}
              </div>
              <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#d9cdb8] bg-[#F8F5EE] px-4 py-2.5 text-sm font-medium text-[#444444] transition-colors hover:bg-[#F0E9D9]">
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
            <label htmlFor="nom" className="mb-2 block text-sm font-semibold text-[#444444]">
              Nom du produit <span className="text-red-500">*</span>
            </label>
            <input
              id="nom"
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className={inputClass}
              placeholder="Ex : Robe wax traditionnelle"
            />
            {fieldErrors.nom && (
              <p className="mt-1.5 text-xs text-red-600">{fieldErrors.nom}</p>
            )}
          </div>

          {/* Catégorie */}
          <div>
            <label htmlFor="categorie" className="mb-2 block text-sm font-semibold text-[#444444]">
              Catégorie <span className="text-red-500">*</span>
            </label>
            {isLoadingCategories ? (
              <div className="flex items-center gap-2 rounded-xl border border-[#d9cdb8] bg-[#F8F5EE] px-4 py-3 text-sm text-[#666666]">
                <Loader2 size={16} className="animate-spin text-[#F2700B]" />
                Chargement des catégories…
              </div>
            ) : (
              <select
                id="categorie"
                value={idCategorie}
                onChange={(e) => setIdCategorie(e.target.value)}
                disabled={mode === 'edit'}
                className={`${inputClass} disabled:bg-[#F0E9D9] disabled:text-[#666666]`}
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat.idCategorie} value={cat.idCategorie}>
                    {cat.nom}
                  </option>
                ))}
                {mode === 'create' && (
                  <option value={OTHER_CATEGORY}>Autre — créer une catégorie</option>
                )}
              </select>
            )}
            {idCategorie === OTHER_CATEGORY && mode === 'create' && (
              <div className="mt-3">
                <label htmlFor="customCategory" className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-[#444444]">
                  <Tag size={14} className="text-[#F2700B]" />
                  Nom de la nouvelle catégorie <span className="text-red-500">*</span>
                </label>
                <input
                  id="customCategory"
                  type="text"
                  value={customCategoryName}
                  onChange={(e) => setCustomCategoryName(e.target.value)}
                  className={inputClass}
                  placeholder="Ex : Accessoires, Bijoux…"
                />
                {fieldErrors.customCategory && (
                  <p className="mt-1.5 text-xs text-red-600">{fieldErrors.customCategory}</p>
                )}
              </div>
            )}
            {mode === 'edit' && (
              <p className="mt-1 text-xs text-[#666666]">
                La catégorie ne peut pas être modifiée après publication.
              </p>
            )}
            {fieldErrors.idCategorie && (
              <p className="mt-1.5 text-xs text-red-600">{fieldErrors.idCategorie}</p>
            )}
          </div>

          {/* Prix */}
          <div>
            <label htmlFor="prix" className="mb-2 block text-sm font-semibold text-[#444444]">
              Prix (F CFA) <span className="text-red-500">*</span>
            </label>
            <input
              id="prix"
              type="number"
              min="1"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
              className={inputClass}
              placeholder="Ex : 15000"
            />
            {fieldErrors.prix && (
              <p className="mt-1.5 text-xs text-red-600">{fieldErrors.prix}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="mb-2 block text-sm font-semibold text-[#444444]">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={`${inputClass} resize-none`}
              placeholder="Décrivez votre article (état, taille, matière…)"
            />
            {fieldErrors.description && (
              <p className="mt-1.5 text-xs text-red-600">{fieldErrors.description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-[#d9cdb8] bg-[#F0E9D9]/50 px-6 py-4">
          <Link
            href="/dashboard/articles"
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-[#666666] transition-colors hover:bg-[#F0E9D9]"
          >
            Annuler
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || isLoadingCategories}
            className="flex items-center gap-2 rounded-xl bg-[#F2700B] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:opacity-90 disabled:opacity-60"
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
