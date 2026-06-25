import api from './api.client';
import { Utilisateur } from '@/types/models.types';

export const userService = {
  getById: async (id: number): Promise<Utilisateur> => {
    const response = await api.get<Utilisateur>(`/utilisateurs/${id}`);
    return response.data;
  },
};
