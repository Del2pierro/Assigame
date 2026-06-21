/**
 * @file page.tsx
 * @route  /demo
 * @role   Page de démonstration — Connexion automatique en mode Admin.
 *
 * Cette page est UNIQUEMENT pour les tests et la revue de code.
 * Elle simule une connexion admin sans avoir besoin du backend.
 *
 * ⚠️ À SUPPRIMER avant la mise en production.
 *    Elle ne doit exister que pendant la phase de développement.
 *
 * Utilisation : aller sur http://localhost:3000/demo
 * → Connexion automatique → Redirection vers /admin
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DemoPage() {
  const router  = useRouter();
  const [status, setStatus] = useState<'idle' | 'connecting' | 'done'>('idle');

  /**
   * Connexion automatique au chargement de la page.
   * Simule un profil administrateur dans le localStorage
   * puis redirige vers le dashboard admin.
   */
  useEffect(() => {
    setStatus('connecting');

    // Profil admin de démonstration
    const demoProfile = {
      idUtilisateur: 1,
      nom: 'Demo',
      prenom: 'Admin',
      email: 'admin@assigame.com',
      login: 'admin',
      actif: true,
      typeUtilisateur: {
        idTypeUtilisateur: 1,
        libelle: 'ADMIN', // ← Ce champ donne accès au dashboard admin
      },
      dateInscription: '2024-01-01',
    };

    // Stockage du profil dans le localStorage (comme le ferait une vraie connexion)
    localStorage.setItem('user_id', String(demoProfile.idUtilisateur));
    localStorage.setItem('user_profile', JSON.stringify(demoProfile));

    setStatus('done');

    // Redirection automatique vers le dashboard admin après 1 seconde
    const timer = setTimeout(() => {
      router.replace('/admin');
    }, 1000);

    // Nettoyage du timer si le composant se démonte avant la redirection
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen gap-6"
      style={{ backgroundColor: '#F8F5EE' }}
    >
      {/* Logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Logo Assigamé"
        className="h-20 object-contain"
      />

      {/* Message de statut */}
      <div className="text-center space-y-2">
        {status === 'connecting' && (
          <p className="text-sm text-[#F2700B] font-medium animate-pulse">
            Connexion en mode démo…
          </p>
        )}
        {status === 'done' && (
          <>
            <p className="text-sm font-bold text-[#111111]">
              ✅ Connecté en tant qu'Admin
            </p>
            <p className="text-xs text-[#666666]">
              Redirection vers le dashboard…
            </p>
          </>
        )}
      </div>

      {/* Indicateur visuel de chargement */}
      <div
        className="w-48 h-1 rounded-full overflow-hidden"
        style={{ backgroundColor: '#EDE8DC' }}
      >
        <div
          className="h-full rounded-full animate-pulse"
          style={{ backgroundColor: '#F2700B', width: status === 'done' ? '100%' : '60%' }}
        />
      </div>

      {/* Avertissement développement */}
      <p className="text-xs text-[#aaa] mt-4">
        ⚠️ Page de démo — à supprimer avant la mise en production
      </p>
    </div>
  );
}
