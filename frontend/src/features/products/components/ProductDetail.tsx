"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  X,
  Package,
  MapPin,
  Calendar,
  MessageCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useChat } from "@/features/chat/hooks";
import { productApi } from "../api";
import { getSellerIdFromProduit } from "@/lib/product.mapper";
import { getSellerDisplayName, getSellerInitials } from "@/lib/seller.utils";
import { Produit } from "@/types/models.types";

interface ProductDetailProps {
  productId: number;
  onClose?: () => void;
  showChat?: boolean;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  productId,
  onClose,
  showChat = false,
}) => {
  const { openChatForProduct, isLoading: chatLoading } = useChat();
  const [product, setProduct] = useState<Produit | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    productApi
      .fetchProductById(productId)
      .then((data) => {
        if (!cancelled) setProduct(data);
      })
      .catch((err: unknown) => {
        if (!cancelled)
          setError(
            err instanceof Error
              ? err.message
              : "Erreur de chargement du produit",
          );
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [productId]);

  const handleContactSeller = () => {
    if (!product) return;
    const sellerId = getSellerIdFromProduit(product);
    if (!sellerId) return;
    openChatForProduct(product.idProduit, sellerId);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClose && e.target === overlayRef.current) onClose();
  };

  const timeAgo = (() => {
    if (!product) return "";
    const now = new Date();
    const pub = new Date(product.datePublication);
    const diffMs = now.getTime() - pub.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 60) return `il y a ${diffMin} min`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `il y a ${diffH}h`;
    const diffD = Math.floor(diffH / 24);
    if (diffD < 30) return `il y a ${diffD}j`;
    return pub.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  })();

  const modalContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-80 items-center justify-center">
          <Loader2 size={32} className="animate-spin text-[#F2700B]" />
        </div>
      );
    }

    if (error || !product) {
      return (
        <div className="flex h-80 flex-col items-center justify-center gap-4 text-center px-8">
          <div className="h-14 w-14 rounded-2xl bg-red-50 flex items-center justify-center">
            <AlertCircle size={24} className="text-red-500" />
          </div>
          <div>
            <p className="font-semibold text-zinc-900">
              Impossible de charger ce produit
            </p>
            <p className="text-sm text-zinc-500 mt-1">
              {error || "Produit introuvable"}
            </p>
          </div>
        </div>
      );
    }

    const isAvailable = product.statut === "DISPONIBLE";

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
        {/* ── Image ── */}
        <div className="relative bg-[#F5F1E8] min-h-[300px] flex items-center justify-center">
          {product.imageBase64 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`data:image/jpeg;base64,${product.imageBase64}`}
              alt={product.nom}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 p-12">
              <div className="rounded-3xl p-6 bg-[#EDE8DC]">
                <Package size={40} className="text-[#c4b89a]" />
              </div>
              <span className="text-xs font-medium tracking-widest text-[#b3a78f] uppercase">
                Pas d&apos;image
              </span>
            </div>
          )}

          {/* Badge catégorie */}
          {product.categorie?.nom && (
            <div className="absolute left-3 top-3">
              <span className="inline-block rounded-xl bg-white/90 backdrop-blur-md text-[#F2700B] text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 shadow-sm">
                {product.categorie.nom}
              </span>
            </div>
          )}

          {/* Overlay statut */}
          {!isAvailable && (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px] bg-black/35">
              <span
                className={`rounded-full px-6 py-2.5 text-sm font-bold uppercase tracking-wider shadow-lg text-white ${product.statut === "RESERVE" ? "bg-[#F2700B]" : "bg-zinc-950"}`}
              >
                {product.statut === "RESERVE" ? "Réservé" : "Vendu"}
              </span>
            </div>
          )}
        </div>

        {/* ── Infos ── */}
        <div className="flex flex-col p-7 gap-4">
          {/* Prix */}
          <div>
            <p className="text-3xl font-extrabold tracking-tight text-zinc-950">
              {product.prix.toLocaleString("fr-FR")}&nbsp;
              <span className="text-lg font-bold text-zinc-500">F CFA</span>
            </p>
          </div>

          {/* Nom */}
          <h2 className="text-xl font-bold text-zinc-900 leading-snug">
            {product.nom}
          </h2>

          {/* Description */}
          <p className="text-sm text-zinc-600 leading-relaxed flex-1">
            {product.description}
          </p>

          {/* Méta-infos */}
          <div className="flex flex-col gap-2 text-xs text-zinc-500 border-t border-[#d9cdb8]/40 pt-4">
            {product.utilisateur && (
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-gradient-to-r from-[#F2700B] to-[#e05a00] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                  {getSellerInitials(product)}
                </div>
                <span className="font-medium text-zinc-700">
                  {getSellerDisplayName(product)}
                </span>
              </div>
            )}
            {product.utilisateur?.adresse && (
              <div className="flex items-center gap-1.5">
                <MapPin size={13} className="shrink-0" />
                <span>{product.utilisateur.adresse}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="shrink-0" />
              <span>Publié {timeAgo}</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-auto pt-2">
            <button
              onClick={handleContactSeller}
              disabled={!isAvailable}
              className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#F2700B] to-[#e05a00] py-3.5 text-[14px] font-bold text-white shadow-lg shadow-orange-500/15 hover:shadow-orange-500/30 active:scale-[0.98] transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none"
            >
              <MessageCircle size={17} />
              Contacter le vendeur
            </button>
            {!isAvailable && (
              <p className="mt-2 text-center text-xs text-zinc-500">
                Cet article n&apos;est plus disponible
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ── Mode split view (avec onClose) ──
  if (onClose) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 rounded-full px-4 py-2 bg-white border border-[#d9cdb8] text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            <X size={18} />
            Fermer
          </button>
        </div>
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-[#d9cdb8]/40">
          {modalContent()}
        </div>
      </div>
    );
  }

  // ── Mode page standalone (route /produits/:id) ──
  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6">
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm border border-[#d9cdb8]/40">
        {modalContent()}
      </div>
    </div>
  );
};
