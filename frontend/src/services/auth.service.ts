import api from './api.client';
import { LoginPayload, RegisterPayload, AuthResponse } from '@/features/auth/types';

export const authService = {
  /**
   * Effectue la connexion d'un utilisateur.
   * En cas de succès, retourne les informations du profil utilisateur connecté.
   */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', {
      login: payload.login,
      password: payload.motDePasse,
    });
    return response.data;
  },

  /**
   * Enregistre un nouvel utilisateur.
   * idTypeUtilisateur: 2 par défaut (VENDEUR).
   */
  async register(payload: RegisterPayload, idTypeUtilisateur: number = 2): Promise<void> {
    await api.post(`/utilisateurs/register/${idTypeUtilisateur}`, {
      nom: payload.nom,
      prenom: payload.prenom,
      email: payload.email,
      login: payload.login,
      motDePasse: payload.motDePasse,
      telephone: payload.telephone || undefined,
      adresse: payload.adresse || undefined,
    });
  },
};
