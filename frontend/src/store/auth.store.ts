import { create } from 'zustand';
import { Utilisateur } from '@/types/models.types';

interface AuthState {
  user: Utilisateur | null;
  guestId: string | null;
  isAuthenticated: boolean;
  setUser: (user: Utilisateur) => void;
  clearUser: () => void;
  initGuest: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  guestId: null,
  isAuthenticated: false,

  setUser: (user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_id', String(user.idUtilisateur));
      localStorage.setItem('user_profile', JSON.stringify(user));
    }
    set({ user, isAuthenticated: true });
  },

  clearUser: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_profile');
    }
    set({ user: null, isAuthenticated: false });
  },

  initGuest: () => {
    if (typeof window !== 'undefined') {
      let guestId = localStorage.getItem('guest_id');
      if (!guestId) {
        guestId = `guest-${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;
        localStorage.setItem('guest_id', guestId);
      }
      set({ guestId });
    }
  },

  initialize: () => {
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('user_id');
      const userProfileStr = localStorage.getItem('user_profile');
      let user: Utilisateur | null = null;
      if (userId && userProfileStr) {
        try {
          user = JSON.parse(userProfileStr);
        } catch {
          // ignore
        }
      }
      const guestId = localStorage.getItem('guest_id');
      set({
        user,
        isAuthenticated: !!user,
        guestId,
      });
    }
  }
}));
