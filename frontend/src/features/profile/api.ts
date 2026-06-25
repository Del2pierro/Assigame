import apiClient from '@/services/api.client';
import { Utilisateur } from '@/types/models.types';
import { ProfileUpdatePayload } from './types';

export const updateProfile = async (
  idUtilisateur: number,
  payload: ProfileUpdatePayload,
  currentLogin: string
): Promise<Utilisateur> => {
  // Le backend exige un login et un motDePasse pour passer la validation @Valid.
  // Cependant, UtilisateurService ignore le mot de passe s'il s'agit d'une simple mise à jour,
  // et le login n'est pas modifié par la méthode updateUtilisateur de base.
  // Nous passons donc le login actuel et un mot de passe factice pour satisfaire le validateur Spring.
  const apiPayload = {
    ...payload,
    login: currentLogin,
    motDePasse: 'dummy_password_123'
  };

  const response = await apiClient.put<Utilisateur>(`/utilisateurs/${idUtilisateur}`, apiPayload);
  return response.data;
};
