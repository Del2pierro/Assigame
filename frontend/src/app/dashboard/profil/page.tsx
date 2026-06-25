import React from 'react';
import { ProfileForm } from '@/features/profile/components/ProfileForm';

export const metadata = {
  title: 'Mon Profil | Assigamé',
  description: 'Gérer vos informations personnelles sur Assigamé',
};

export default function ProfilPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Mon Profil</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Gérez vos informations personnelles et vos paramètres de contact.
        </p>
      </div>

      <ProfileForm />
    </div>
  );
}
