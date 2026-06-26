/**
 * @file layout.tsx
 * @route  /dashboard/* (toutes les sous-routes du dashboard)
 * @role   Layout protégé du dashboard vendeur — charte graphique Assigamé.
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
    <aside
      className="flex h-full w-64 shrink-0 flex-col border-r border-[#d9cdb8]"
      style={{ backgroundColor: "#F0E9D9" }}
    >
      <div className="flex h-24 items-center justify-center border-b border-[#d9cdb8] p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Logo Assigamé"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="px-3 pt-4 pb-2">
        <Link
          href="/dashboard/articles/nouveau"
          onClick={onNavigate}
          className="flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:shadow-md"
          style={{ backgroundColor: "#F2700B" }}
        >
          <Plus size={16} />
          Nouveau produit
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
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
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors"
              style={{
                backgroundColor: isActive ? "#FFF3E0" : "transparent",
                color: isActive ? "#111111" : "#444444",
                borderLeft: isActive
                  ? "4px solid #F2700B"
                  : "4px solid transparent",
                fontWeight: isActive ? "700" : "500",
              }}
            >
              <Icon
                size={18}
                style={{ color: isActive ? "#F2700B" : "#666666" }}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#d9cdb8] p-4">
        <div className="mb-2 flex items-center gap-3 px-2 py-2">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: "#F2700B" }}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-col">
            <span className="block truncate text-sm font-bold text-[#111111]">
              {profile ? `${profile.prenom} ${profile.nom}` : "Vendeur"}
            </span>
            <span className="text-xs text-[#666666]">Vendeur</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
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

      if (role === "ADMIN") {
        router.replace("/admin");
        return;
      }

      if (role !== "VENDEUR") {
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
      <div className="flex h-screen flex-col" style={{ backgroundColor: "#F8F5EE" }}>
        <div
          className="flex h-16 items-center border-b border-[#d9cdb8] px-6"
          style={{ backgroundColor: "#F0E9D9" }}
        >
          <Skeleton className="h-6 w-32 bg-[#EDE8DC]" />
        </div>
        <div className="flex flex-1 gap-6 p-6">
          <Skeleton className="hidden h-full w-64 shrink-0 rounded-xl bg-[#EDE8DC] md:block" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-48 bg-[#EDE8DC]" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-28 rounded-xl bg-[#EDE8DC]" />
              ))}
            </div>
            <Skeleton className="h-72 rounded-xl bg-[#EDE8DC]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: "#F8F5EE" }}
    >
      <div className="hidden md:flex">
        <SellerSidebar profile={profile} />
      </div>

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
        <header
          className="flex h-16 shrink-0 items-center justify-between border-b border-[#d9cdb8] px-4 sm:px-8"
          style={{ backgroundColor: "#F0E9D9" }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg p-2 text-[#666666] transition-colors hover:bg-[#EDE8DC] md:hidden"
              aria-label="Ouvrir le menu"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-bold text-[#111111]">
              Espace Vendeur — Assigamé
            </h1>
          </div>
          {mobileMenuOpen && (
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2 text-[#666666] md:hidden"
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
