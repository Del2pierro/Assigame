'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { LoginForm } from '@/features/auth/components/LoginForm';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, user, initialize } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initialize();
    setIsInitialized(true);
  }, [initialize]);

  useEffect(() => {
    // Ne rediriger que si l'initialisation est terminée et l'utilisateur est authentifié
    if (isInitialized && isAuthenticated && user) {
      if (user.typeUtilisateur?.libelle === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  }, [isInitialized, isAuthenticated, user, router]);

  // Afficher un état de chargement pendant l'initialisation
  if (!isInitialized) {
    return (
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: '#F8F5EE' }}>
        <p className="text-sm text-[#F2700B] animate-pulse">Chargement...</p>
      </div>
    );
  }

  if (isAuthenticated) return null;

  return <LoginForm />;
}
