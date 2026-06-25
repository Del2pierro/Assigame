/**
 * @file layout.tsx
 * @route  /admin/* (toutes les sous-routes de l'espace admin)
 * @role   Layout protégé de l'espace administrateur système.
 *         Inclut la sidebar de navigation admin avec le logo Assigamé,
 *         les liens vers les sections, et le profil de l'admin connecté.
 *
 * ⚠️ Ce layout protège l'accès : seul un utilisateur avec le rôle ADMIN
 *    peut accéder aux pages enfants. Les autres sont redirigés vers /login.
 */

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import {
  LayoutDashboard,
  Users,
  Package,
  Tag,
  LogOut,
} from 'lucide-react';

// ─── Liens de navigation de la sidebar ──────────────────────────────────────
const NAV_LINKS = [
  { href: '/admin',             label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/admin/utilisateurs',label: 'Utilisateurs',    icon: Users           },
  { href: '/admin/produits',    label: 'Produits',        icon: Package         },
  { href: '/admin/categories',  label: 'Catégories',      icon: Tag             },
];

// ─── Composant Sidebar ───────────────────────────────────────────────────────
function AdminSidebar() {
  const pathname = usePathname();
  const router   = useRouter();

  /** Déconnexion : efface le store et le localStorage et redirige vers /login */
  const handleLogout = () => {
    useAuthStore.getState().clearUser();
    router.push('/login');
  };

  return (
    <aside
      className="flex flex-col w-64 h-screen shrink-0 border-r border-[#d9cdb8]"
      style={{ backgroundColor: '#F0E9D9' }}
    >
      {/* ── Logo ── */}
      <div className="flex items-center justify-center h-24 border-b border-[#d9cdb8] p-4">
        {/* Le fichier logo.png doit être placé dans frontend/public/logo.png */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Logo Assigamé"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          // Un lien est actif si l'URL courante correspond exactement ou commence par href
          const isActive =
            href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: isActive ? '#FFF3E0' : 'transparent',
                color:           isActive ? '#111111' : '#444444',
                borderLeft:      isActive ? '4px solid #F2700B' : '4px solid transparent',
                fontWeight:      isActive ? '700' : '500',
              }}
            >
              <Icon
                size={18}
                style={{ color: isActive ? '#F2700B' : '#666666' }}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* ── Profil admin + déconnexion ── */}
      <div className="border-t border-[#d9cdb8] p-4">
        {/* Avatar et nom de l'admin connecté */}
        <div className="flex items-center gap-3 px-2 py-2 mb-2">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ backgroundColor: '#F2700B' }}
          >
            A
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-[#111111] truncate">Admin</span>
            <span className="text-xs text-[#666666]">Administrateur</span>
          </div>
        </div>

        {/* Bouton de déconnexion */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}

// ─── Layout principal ────────────────────────────────────────────────────────
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router  = useRouter();

  /**
   * isChecking : true pendant la vérification du rôle.
   * Empêche l'affichage du contenu admin avant que la vérification soit terminée.
   * Évite le "flash" (page qui s'affiche une fraction de seconde puis disparaît).
   */
  const [isChecking, setIsChecking] = useState(true);

  /**
   * Protection de la route : vérifie que l'utilisateur est connecté
   * et qu'il a le rôle ADMIN avant d'afficher les pages enfants.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const profileRaw = localStorage.getItem('user_profile');

    // Si aucun profil en localStorage → non connecté → redirection login
    if (!profileRaw) {
      router.replace('/login');
      return; // on ne débloque pas l'affichage
    }

    try {
      const profile = JSON.parse(profileRaw);
      const role = profile?.typeUtilisateur?.libelle;

      // Vérifie que le rôle est bien ADMIN sans créer de boucle avec l'espace vendeur.
      if (role === 'VENDEUR') {
        router.replace('/dashboard');
        return;
      }

      if (role !== 'ADMIN') {
        localStorage.removeItem('user_profile');
        localStorage.removeItem('user_id');
        router.replace('/login');
        return;
      }

      // ✅ Rôle ADMIN confirmé → synchroniser Zustand et autoriser l'affichage
      useAuthStore.getState().setUser(profile);
      setIsChecking(false);
    } catch {
      // JSON invalide → on efface et on redirige
      localStorage.removeItem('user_profile');
      localStorage.removeItem('user_id');
      router.replace('/login');
    }
  }, [router]);

  // ── Écran de vérification : affiché pendant le contrôle du rôle ──────────
  // Remplace le flash par un fond beige neutre, invisible pour l'utilisateur
  if (isChecking) {
    return (
      <div
        className="flex h-screen items-center justify-center"
        style={{ backgroundColor: '#F8F5EE' }}
      >
        <p className="text-sm text-[#F2700B] animate-pulse">Vérification en cours…</p>
      </div>
    );
  }

  return (
    // Conteneur plein écran : sidebar à gauche, contenu à droite
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#F8F5EE' }}>

      {/* Sidebar fixe à gauche */}
      <AdminSidebar />

      {/* Zone de contenu principale */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* En-tête de la zone admin */}
        <header
          className="h-16 border-b border-[#d9cdb8] flex items-center px-8 shrink-0"
          style={{ backgroundColor: '#F0E9D9' }}
        >
          <h1 className="text-lg font-bold text-[#111111]">
            Espace Administration — Assigamé
          </h1>
        </header>

        {/* Contenu scrollable de la page courante */}
        <div className="flex-1 overflow-auto p-8" style={{ backgroundColor: '#F8F5EE' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
