'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated, user, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.typeUtilisateur?.libelle === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, user, router]);

  if (isAuthenticated) return null;

  return <RegisterForm />;
}
