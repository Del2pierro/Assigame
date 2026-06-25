'use client';

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useProfile } from '../hooks';
import { User, Mail, Phone, MapPin, Save, AlertCircle, CheckCircle2 } from 'lucide-react';

export const ProfileForm = () => {
  const { user } = useAuthStore();
  const { isSubmitting, error, success, handleUpdateProfile, clearMessages } = useProfile();

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');

  // Initialisation des valeurs du formulaire avec les données de l'utilisateur connecté
  useEffect(() => {
    if (user) {
      setNom(user.nom || '');
      setPrenom(user.prenom || '');
      setEmail(user.email || '');
      setTelephone(user.telephone || '');
      setAdresse(user.adresse || '');
    }
  }, [user]);

  // Nettoyage des messages lors du démontage
  useEffect(() => {
    return () => clearMessages();
  }, [clearMessages]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleUpdateProfile({
      nom,
      prenom,
      email,
      telephone,
      adresse,
    });
  };

  if (!user) {
    return <div>Chargement du profil...</div>;
  }

  return (
    <div className="bg-white rounded-3xl border border-[#d9cdb8]/60 shadow-sm overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-[#d9cdb8]/30 bg-gradient-to-br from-white to-[#F8F5EE]/50">
        <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
          <User className="text-[#F2700B]" size={24} />
          Informations Personnelles
        </h2>
        <p className="text-sm text-zinc-500 mt-1">
          Mettez à jour les informations de votre compte vendeur
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl bg-green-50 border border-green-200 p-4 text-sm text-green-700">
            <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Prénom */}
            <div>
              <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
                Prénom
              </label>
              <input
                type="text"
                required
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="w-full rounded-xl bg-white border border-[#d9cdb8]/60 py-2.5 px-4 text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-[#F2700B]/10 focus:border-[#F2700B] transition-all duration-200"
              />
            </div>

            {/* Nom */}
            <div>
              <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
                Nom
              </label>
              <input
                type="text"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full rounded-xl bg-white border border-[#d9cdb8]/60 py-2.5 px-4 text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-[#F2700B]/10 focus:border-[#F2700B] transition-all duration-200"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
              Adresse Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Mail size={16} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-white border border-[#d9cdb8]/60 py-2.5 pl-10 pr-4 text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-[#F2700B]/10 focus:border-[#F2700B] transition-all duration-200"
              />
            </div>
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
              Numéro de téléphone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Phone size={16} />
              </div>
              <input
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                placeholder="+33 6 00 00 00 00"
                className="w-full rounded-xl bg-white border border-[#d9cdb8]/60 py-2.5 pl-10 pr-4 text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-[#F2700B]/10 focus:border-[#F2700B] transition-all duration-200"
              />
            </div>
          </div>

          {/* Adresse */}
          <div>
            <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
              Adresse postale
            </label>
            <div className="relative">
              <div className="absolute top-3 left-0 pl-3.5 pointer-events-none text-zinc-400">
                <MapPin size={16} />
              </div>
              <textarea
                rows={3}
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                className="w-full rounded-xl bg-white border border-[#d9cdb8]/60 py-2.5 pl-10 pr-4 text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-[#F2700B]/10 focus:border-[#F2700B] transition-all duration-200 resize-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#d9cdb8]/30 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#F2700B] to-[#e05a00] px-6 py-2.5 text-[14px] font-bold text-white shadow-lg shadow-orange-500/10 hover:shadow-orange-500/25 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
