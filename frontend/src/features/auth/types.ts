import { Utilisateur } from '@/types/models.types';

export interface LoginPayload {
  login: string;
  motDePasse: string;
}

export interface RegisterPayload {
  nom: string;
  prenom: string;
  email: string;
  login: string;
  motDePasse: string;
  telephone?: string;
  adresse?: string;
}

export interface AuthResponse {
  token: string;
  user: Utilisateur;
}

export interface AuthFormState {
  isSubmitting: boolean;
  formError: string | null;
  successMessage: string | null;

  setSubmitting: (submitting: boolean) => void;
  setFormError: (error: string | null) => void;
  setSuccessMessage: (message: string | null) => void;
  clearFormState: () => void;
}
