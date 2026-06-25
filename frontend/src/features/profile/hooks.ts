import { useState } from 'react';
import { updateProfile } from './api';
import { ProfileUpdatePayload } from './types';
import { useAuthStore } from '@/store/auth.store';
import { AxiosError } from 'axios';

export const useProfile = () => {
  const { user, setUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleUpdateProfile = async (payload: ProfileUpdatePayload) => {
    if (!user) return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const updatedUser = await updateProfile(user.idUtilisateur, payload, user.login);
      setUser(updatedUser);
      setSuccess('Profil mis à jour avec succès.');
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erreur lors de la mise à jour du profil.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return {
    isSubmitting,
    error,
    success,
    handleUpdateProfile,
    clearMessages,
  };
};
