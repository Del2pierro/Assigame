import { create } from 'zustand';
import { AuthFormState } from './types';

export const useAuthFormStore = create<AuthFormState>((set) => ({
  isSubmitting: false,
  formError: null,
  successMessage: null,

  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  setFormError: (formError) => set({ formError }),
  setSuccessMessage: (successMessage) => set({ successMessage }),
  clearFormState: () => set({ isSubmitting: false, formError: null, successMessage: null }),
}));
