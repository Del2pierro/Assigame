/**
 * @file layout.tsx
 * @route  /dashboard/* (toutes les sous-routes du dashboard)
 * @role   Layout protégé du dashboard vendeur. Enveloppe toutes les routes
 *         /dashboard avec une vérification d'authentification (rôle VENDEUR).
 *         Inclut une sidebar de navigation avec le logo, les liens,
 *         et le profil du vendeur connecté.
 */

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  LogOut,
  Plus,
  User,
  Menu,
  X,
} from "lucide-react";
import { Utilisateur } from "@/types/models.types";
import { Skeleton } from "@/components/ui/Skeleton";

const NAV_LINKS = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/dashboard/articles", label: "Mes articles", icon: Package },
  { href: "/dashboard/messagerie", label: "Messagerie", icon: MessageSquare },
  { href: "/dashboard/profil", label: "Mon Profil", icon: User },
];

function SellerSidebar({
  profile,
  onNavigate,
}: {
  profile: Utilisateur | null;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    useAuthStore.getState().clearUser();
    router.push("/login");
  };

  const initials = profile
    ? `${profile.prenom?.[0] || ""}${profile.nom?.[0] || ""}`.toUpperCase()
    : "V";

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-neutral-200/80 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-neutral-100 px-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Logo Assigamé"
          className="h-8 w-auto object-contain"
        />
      </div>

      {/* CTA nouveau produit */}
      <div className="px-3 pt-4 pb-2">
        <Link
          href="/dashboard/articles/nouveau"
          onClick={onNavigate}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#F2700B] py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#e0650a] hover:shadow-md active:scale-[0.98]"
        >
          <Plus size={16} />
          Nouveau produit
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150 ${
                isActive
                  ? "bg-neutral-100 font-medium text-neutral-900"
                  : "font-normal text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
              }`}
            >
              <Icon
                size={18}
                className={isActive ? "text-[#F2700B]" : "text-neutral-400"}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Profil + déconnexion */}
      <div className="border-t border-neutral-100 p-3">
        <div className="mb-2 flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#F2700B] to-[#e0650a] text-sm font-semibold text-white">
            {initials}
          </div>
          <div className="min-w-0 flex-col">
            <span className="block truncate text-sm font-medium text-neutral-900">
              {profile ? `${profile.prenom} ${profile.nom}` : "Vendeur"}
            </span>
            <span className="text-xs text-neutral-400">Vendeur</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-neutral-500 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [profile, setProfile] = useState<Utilisateur | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const profileRaw = localStorage.getItem("user_profile");

    if (!profileRaw) {
      router.replace("/login");
      return;
    }

    try {
      const parsed = JSON.parse(profileRaw) as Utilisateur;
      const role = parsed?.typeUtilisateur?.libelle;

      if (role === "admin") {
        router.replace("/admin");
        return;
      }

      if (role !== "vendeur") {
        localStorage.removeItem("user_profile");
        localStorage.removeItem("user_id");
        router.replace("/login");
        return;
      }

      useAuthStore.getState().setUser(parsed);
      setProfile(parsed);
      setIsChecking(false);
    } catch {
      localStorage.removeItem("user_profile");
      localStorage.removeItem("user_id");
      router.replace("/login");
    }
  }, [router]);

  if (isChecking) {
    return (
      <div className="flex h-screen flex-col bg-neutral-50">
        <div className="flex h-16 items-center border-b border-neutral-200/80 bg-white px-6">
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex flex-1 gap-6 p-6">
          <Skeleton className="hidden h-full w-64 shrink-0 rounded-xl md:block" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-28 rounded-xl" />
              ))}
            </div>
            <Skeleton className="h-72 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50">
      {/* Sidebar desktop */}
      <div className="hidden md:flex">
        <SellerSidebar profile={profile} />
      </div>

      {/* Sidebar mobile overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 z-50 shadow-xl">
            <SellerSidebar
              profile={profile}
              onNavigate={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200/80 bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100 md:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-sm font-semibold text-neutral-900 sm:text-base">
              Espace Vendeur
            </h1>
          </div>
          {mobileMenuOpen && (
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2 text-neutral-600 md:hidden"
              aria-label="Fermer le menu"
            >
              <X size={20} />
            </button>
          )}
        </header>

        <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
