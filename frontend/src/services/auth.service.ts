/* eslint-disable no-console */
import api from './api.client';
import { LoginPayload, RegisterPayload, AuthResponse } from '@/features/auth/types';

export const authService = {
  /**
   * Effectue la connexion d'un utilisateur.
   * En cas de succès, retourne les informations du profil utilisateur connecté.
   */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    console.log('[Auth Service] Login attempt', { 
      login: payload.login,
      timestamp: new Date().toISOString()
    });
    
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        login: payload.login,
        password: payload.motDePasse,
      });
      
      console.log('[Auth Service] Login successful', {
        userId: response.data.idUtilisateur,
        login: response.data.login,
        timestamp: new Date().toISOString()
      });
      
      return response.data;
    } catch (error) {
      console.error('[Auth Service] Login failed', {
        login: payload.login,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  },

  /**
   * Enregistre un nouvel utilisateur.
   * idTypeUtilisateur: 2 par défaut (VENDEUR).
   */
  async register(payload: RegisterPayload, idTypeUtilisateur: number = 2): Promise<void> {
    console.log('[Auth Service] Registration attempt', { 
      login: payload.login,
      email: payload.email,
      idTypeUtilisateur,
      timestamp: new Date().toISOString()
    });
    
    try {
      await api.post(`/utilisateurs/register/${idTypeUtilisateur}`, {
        nom: payload.nom,
        prenom: payload.prenom,
        email: payload.email,
        login: payload.login,
        motDePasse: payload.motDePasse,
        telephone: payload.telephone || undefined,
        adresse: payload.adresse || undefined,
      });
      
      console.log('[Auth Service] Registration successful', {
        login: payload.login,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('[Auth Service] Registration failed', {
        login: payload.login,
        email: payload.email,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  },
};
