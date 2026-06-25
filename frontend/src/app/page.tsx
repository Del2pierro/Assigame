/**
 * @file page.tsx
 * @route  / (Accueil — Catalogue public)
 * @role   Catalogue marketplace premium Assigamé — style Vinted moderne.
 *         Affiche directement les produits sans section d'intro.
 *         Navbar glassmorphism + recherche intégrée + filtres catégories.
 *         Accessible à tous sans connexion.
 */

"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search, User, LogIn, X, PackageOpen, ShoppingBag } from "lucide-react";
import { CategoryFilter } from "@/features/categories/components/CategoryFilter";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { ProductCard } from "@/features/products/components/ProductCard";
import { ProductDetail } from "@/features/products/components/ProductDetail";
import { ChatSidebar } from "@/features/chat/components/ChatSidebar";
import { useProducts } from "@/features/products/hooks";
import { Produit } from "@/types/models.types";

import { useAuthStore } from "@/store/auth.store";

// ─── Navbar glassmorphism ────────────────────────────────────────────────────

function Navbar({
  searchQuery,
  setSearchQuery,
  resultCount,
}: {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  resultCount: number | null;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex flex-col transition-all duration-300 ${
        scrolled
          ? "bg-[#F0E9D9]/90 backdrop-blur-xl shadow-sm border-b border-[#d9cdb8]/50"
          : "bg-[#F0E9D9] border-b border-[#d9cdb8]"
      }`}
    >
      {/* ── HEADER PRINCIPAL ── */}
      <div className="mx-auto flex w-full h-[64px] md:h-[72px] max-w-[1440px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 mr-2 md:mr-6">
          <img
            src="/logo.png"
            alt="Assigamé"
            className="h-10 md:h-12 w-auto object-contain"
          />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-[18px] font-bold text-zinc-900">
              Marketplace
            </span>
          </div>
        </Link>

        {/* Barre de Recherche (centrée, prend un max de place sur desktop) */}
        <div className="flex-1 hidden md:block max-w-3xl">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            resultCount={resultCount}
          />
        </div>

        {/* Espace libre sur mobile pour décaler les boutons */}
        <div className="flex-1 md:hidden"></div>

        {/* Actions Utilisateur */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <Link
            href="/login"
            className="flex items-center gap-1.5 rounded-full px-3 md:px-5 py-2 md:py-2.5 text-[13px] md:text-[14px] font-medium text-zinc-700 bg-white/60 border border-[#d9cdb8]/60 hover:bg-white hover:text-black hover:shadow-sm transition-colors"
          >
            Se connecter
          </Link>
          <Link
            href="/register"
            className="flex items-center justify-center rounded-full px-4 md:px-6 py-2 md:py-2.5 text-[13px] md:text-[14px] font-semibold text-white bg-gradient-to-r from-[#F2700B] to-[#e05a00] hover:shadow-lg transition-colors shadow-sm"
          >
            S&apos;inscrire
          </Link>
        </div>
      </div>

      {/* ── BARRE DE RECHERCHE MOBILE ── */}
      <div className="md:hidden px-4 pb-3 w-full border-b border-[#d9cdb8]/50">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          resultCount={resultCount}
        />
      </div>
    </nav>
  );
}

// ─── Barre de recherche premium ──────────────────────────────────────────────
function SearchBar({
  value,
  onChange,
  resultCount,
}: {
  value: string;
  onChange: (value: string) => void;
  resultCount: number | null;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full group">
      <div
        className={`relative flex items-center w-full h-[40px] md:h-[44px] rounded-full transition-all duration-300 ${
          isFocused || value
            ? "bg-white border-2 border-[#F2700B] shadow-[0_0_0_4px_rgba(242,112,11,0.1)]"
            : "bg-white border-2 border-transparent shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-md"
        }`}
      >
        <Search
          size={18}
          strokeWidth={2.5}
          className={`absolute left-4 transition-colors ${
            isFocused ? "text-[#F2700B]" : "text-zinc-400"
          }`}
        />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Rechercher des articles..."
          className="w-full h-full bg-transparent pl-11 pr-20 text-[14px] md:text-[15px] text-zinc-900 placeholder:text-zinc-500 placeholder:font-normal font-medium outline-none truncate"
        />

        <div className="absolute right-2.5 flex items-center gap-1">
          {value && resultCount !== null && (
            <span className="hidden sm:flex rounded-full px-2 py-0.5 text-[11px] font-bold bg-zinc-100 text-zinc-600">
              {resultCount}
            </span>
          )}

          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              tabIndex={-1}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200/80 hover:bg-zinc-300 text-zinc-500 hover:text-zinc-700 transition"
              aria-label="Effacer la recherche"
            >
              <X size={13} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page catalogue ──────────────────────────────────────────────────────────

export default function HomePage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );

  const { products } = useProducts();

  useEffect(() => {
    useAuthStore.getState().initGuest();
  }, []);

  // Compteur de résultats pour la barre de recherche
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.nom.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.utilisateur?.prenom ?? "").toLowerCase().includes(q) ||
        (p.categorie?.nom ?? "").toLowerCase().includes(q),
    );
  }, [products, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        resultCount={filteredProducts ? filteredProducts.length : null}
      />

      {/* ── Padding top ajouté car la Navbar est fixe ── */}
      <div className="pt-[110px] md:pt-[72px]">
        {/* ── Filtres Catégories ── */}
        <div className="bg-[#F8F5EE]/95 border-b border-[#d9cdb8]/30 sticky top-[110px] md:top-[72px] z-40 backdrop-blur-md supports-[backdrop-filter]:bg-[#F8F5EE]/80 transition-all">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <CategoryFilter onCategorySelect={setSelectedCategoryId} />
          </div>
        </div>

        {/* ── Contenu principal ── */}
        <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6">
          {searchQuery.trim() && filteredProducts ? (
            <FilteredProductGrid
              searchQuery={searchQuery}
              products={filteredProducts}
              onProductClick={setSelectedProductId}
            />
          ) : (
            <ProductGrid
              categoryId={selectedCategoryId}
              onProductClick={setSelectedProductId}
            />
          )}
        </main>
      </div>

      {/* Chat toujours monté pour la connexion WebSocket */}
      <ChatSidebar />

      {/* ── Popup détail produit global ── */}
      {selectedProductId && (
        <ProductDetail
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
        />
      )}
    </div>
  );
}

// ─── Grille filtrée par recherche ────────────────────────────────────────────

function FilteredProductGrid({
  searchQuery,
  products,
  onProductClick,
}: {
  searchQuery: string;
  products: Produit[];
  onProductClick?: (productId: number) => void;
}) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-[450px] flex-col items-center justify-center gap-6 py-12">
        <div className="h-20 w-20 rounded-3xl flex items-center justify-center bg-gradient-to-br from-amber-50 to-[#FFE0B2] shadow-sm">
          <PackageOpen size={32} className="text-[#F2700B]" />
        </div>
        <div className="text-center max-w-sm">
          <p className="text-xl font-bold text-zinc-950">
            Aucun résultat pour &ldquo;{searchQuery}&rdquo;
          </p>
          <p className="text-sm text-zinc-500 mt-2">
            Essayez un autre terme ou parcourez les catégories
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <p className="text-[13px] font-medium text-zinc-500">
          <span className="font-bold text-zinc-950">{products.length}</span>{" "}
          résultat{products.length > 1 ? "s" : ""} pour &ldquo;{searchQuery}
          &rdquo;
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.map((product, index) => (
          <div
            key={product.idProduit}
            className="animate-[fadeInUp_0.4s_ease-out_forwards] opacity-0"
            style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
          >
            <ProductCard
              product={product}
              onClick={() =>
                onProductClick && onProductClick(product.idProduit)
              }
            />
          </div>
        ))}
      </div>
    </>
  );
}
