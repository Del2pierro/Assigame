import { authService } from '@/services/auth.service';
import { LoginPayload, RegisterPayload, AuthResponse } from './types';

/**
 * Connecteur API pour la connexion d'un vendeur.
 */
export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  return authService.login(payload);
}

/**
 * Connecteur API pour l'inscription d'un vendeur (idTypeUtilisateur = 2).
 */
export async function registerUser(payload: RegisterPayload): Promise<void> {
  return authService.register(payload, 2);
}
