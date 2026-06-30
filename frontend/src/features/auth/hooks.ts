import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useAuthFormStore } from './store';
import { loginUser, registerUser } from './api';
import { loginSchema, registerSchema } from '@/lib/validators';
import { LoginPayload, RegisterPayload } from './types';
import { ZodError } from 'zod';

/**
 * Hook pour gérer le flux de connexion.
 */
export const useLogin = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const { isSubmitting, formError, setSubmitting, setFormError, clearFormState } = useAuthFormStore();

  const handleLogin = useCallback(async (payload: LoginPayload) => {
    setSubmitting(true);
    setFormError(null);

    try {
      // Validation Zod
      loginSchema.parse(payload);

      // Appel API
      const response = await loginUser(payload);
      const { token, user } = response;

      // Sauvegarde du token JWT
      if (typeof window !== 'undefined') {
        localStorage.setItem('jwt_token', token);
      }

      // Enregistrement global de la session
      setUser(user);

      // Nettoyage de l'état du formulaire
      clearFormState();

      // Redirection selon le rôle
      const role = user.typeUtilisateur?.libelle?.toUpperCase();
      if (role === 'ADMIN') {
        router.push('/admin');
      } else if (role === 'VENDEUR') {
        router.push('/dashboard');
      } else {
        // Fallback pour les autres rôles
        router.push('/dashboard');
      }
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        setFormError(err.issues[0]?.message || 'Données invalides');
      } else if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError('Une erreur est survenue lors de la connexion.');
      }
    } finally {
      setSubmitting(false);
    }
  }, [setUser, setSubmitting, setFormError, clearFormState, router]);

  return {
    isSubmitting,
    formError,
    handleLogin,
    clearFormState,
  };
};

/**
 * Hook pour gérer le flux d'inscription d'un vendeur.
 */
export const useRegister = () => {
  const router = useRouter();
  const { isSubmitting, formError, successMessage, setSubmitting, setFormError, setSuccessMessage, clearFormState } = useAuthFormStore();

  const handleRegister = useCallback(async (payload: RegisterPayload) => {
    setSubmitting(true);
    setFormError(null);
    setSuccessMessage(null);

    try {
      // Validation Zod
      registerSchema.parse(payload);

      // Appel API d'inscription
      await registerUser(payload);

      // Message de succès
      setSuccessMessage('Inscription réussie ! Vous pouvez maintenant vous connecter.');

      // Redirection vers la page de connexion après 2 secondes
      setTimeout(() => {
        router.push('/login');
        clearFormState();
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        setFormError(err.issues[0]?.message || 'Données de formulaire invalides');
      } else if (err instanceof Error) {
        setFormError(err.message);
      } else {
        setFormError("Une erreur est survenue lors de l'inscription.");
      }
    } finally {
      setSubmitting(false);
    }
  }, [setSubmitting, setFormError, setSuccessMessage, router, clearFormState]);

  return {
    isSubmitting,
    formError,
    successMessage,
    handleRegister,
    clearFormState,
  };
};

/**
 * Garde d'authentification pour protéger les pages vendeurs (ex: dashboard).
 */
export const useAuthGuard = () => {
  const router = useRouter();
  const { user, isAuthenticated, initialize } = useAuthStore();

  const checkAuth = useCallback(() => {
    // Si pas encore initialisé, on initialise la session depuis le localStorage
    if (!isAuthenticated) {
      initialize();
    }

    // Ré-évaluation après initialisation
    const currentAuth = useAuthStore.getState().isAuthenticated;
    if (!currentAuth) {
      router.push('/login');
    }
  }, [isAuthenticated, initialize, router]);

  return {
    user,
    isAuthenticated,
    checkAuth,
  };
};
