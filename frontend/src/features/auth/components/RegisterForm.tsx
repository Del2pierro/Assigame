'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRegister } from '../hooks';
import { UserPlus, User, Mail, Lock, Phone, MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';

export const RegisterForm: React.FC = () => {
  const { handleRegister, formError, successMessage, isSubmitting, clearFormState } = useRegister();
  
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [telephone, setTelephone] = useState('');
  const [adresse, setAdresse] = useState('');

  // Nettoyage de l'état au démontage
  useEffect(() => {
    return () => clearFormState();
  }, [clearFormState]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister({
      nom,
      prenom,
      email,
      login,
      motDePasse,
      telephone: telephone || undefined,
      adresse: adresse || undefined,
    });
  };

  return (
    <div className="w-full max-w-lg p-8 rounded-3xl border border-[#d9cdb8]/60 bg-white/80 backdrop-blur-xl shadow-xl shadow-stone-100">
      <div className="flex flex-col items-center mb-8">
        <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-gradient-to-r from-[#F2700B] to-[#e05a00] text-white shadow-lg shadow-orange-500/20 mb-4">
          <UserPlus size={22} />
        </div>
        <h2 className="text-2xl font-black text-zinc-900 tracking-tight text-center">
          Devenir Vendeur
        </h2>
        <p className="text-sm text-zinc-500 mt-1 text-center">
          Inscrivez-vous pour commencer à vendre vos articles
        </p>
      </div>

      {successMessage && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl bg-green-50 border border-green-200/60 p-4 text-sm text-green-700 animate-fadeIn">
          <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
          <span>{successMessage}</span>
        </div>
      )}

      {formError && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl bg-red-50 border border-red-200/60 p-4 text-sm text-red-700 animate-fadeIn">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <span>{formError}</span>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Nom & Prénom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">
              Nom
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <User size={15} />
              </div>
              <input
                type="text"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="Ex: Kouamé"
                className="w-full rounded-xl bg-white border border-[#d9cdb8]/60 py-2.5 pl-10 pr-4 text-[13px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-[#F2700B]/10 focus:border-[#F2700B] transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">
              Prénom
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <User size={15} />
              </div>
              <input
                type="text"
                required
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                placeholder="Ex: Koffi"
                className="w-full rounded-xl bg-white border border-[#d9cdb8]/60 py-2.5 pl-10 pr-4 text-[13px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-[#F2700B]/10 focus:border-[#F2700B] transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">
            Adresse Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
              <Mail size={15} />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="adresse@exemple.com"
              className="w-full rounded-xl bg-white border border-[#d9cdb8]/60 py-2.5 pl-10 pr-4 text-[13px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-[#F2700B]/10 focus:border-[#F2700B] transition-all duration-200"
            />
          </div>
        </div>

        {/* Login & Mot de passe */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">
              Nom d&apos;utilisateur (Pseudo)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <User size={15} />
              </div>
              <input
                type="text"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Ex: koffi_seller"
                className="w-full rounded-xl bg-white border border-[#d9cdb8]/60 py-2.5 pl-10 pr-4 text-[13px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-[#F2700B]/10 focus:border-[#F2700B] transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Lock size={15} />
              </div>
              <input
                type="password"
                required
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                placeholder="Min 6 caractères"
                className="w-full rounded-xl bg-white border border-[#d9cdb8]/60 py-2.5 pl-10 pr-4 text-[13px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-[#F2700B]/10 focus:border-[#F2700B] transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Téléphone & Adresse */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">
              Téléphone <span className="text-zinc-400 font-normal">(Optionnel)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Phone size={15} />
              </div>
              <input
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                placeholder="+228 90 00 00 00"
                className="w-full rounded-xl bg-white border border-[#d9cdb8]/60 py-2.5 pl-10 pr-4 text-[13px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-[#F2700B]/10 focus:border-[#F2700B] transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">
              Adresse <span className="text-zinc-400 font-normal">(Optionnelle)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <MapPin size={15} />
              </div>
              <input
                type="text"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                placeholder="Ex: Quartier Deckon, Lomé"
                className="w-full rounded-xl bg-white border border-[#d9cdb8]/60 py-2.5 pl-10 pr-4 text-[13px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-[#F2700B]/10 focus:border-[#F2700B] transition-all duration-200"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F2700B] to-[#e05a00] py-3.5 text-[14px] font-bold text-white shadow-lg shadow-orange-500/10 hover:shadow-orange-500/25 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none mt-2"
        >
          {isSubmitting ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "S'inscrire"
          )}
        </button>
      </form>

      <div className="mt-8 text-center border-t border-[#d9cdb8]/30 pt-6">
        <p className="text-[13px] text-zinc-500">
          Déjà inscrit ?{' '}
          <Link href="/login" className="font-bold text-[#F2700B] hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};
