'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLogin } from '../hooks';
import { LogIn, Lock, Mail, AlertCircle } from 'lucide-react';

export const LoginForm: React.FC = () => {
  const { handleLogin, formError, isSubmitting, clearFormState } = useLogin();
  const [login, setLogin] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  // Clear form errors when component unmounts
  useEffect(() => {
    return () => clearFormState();
  }, [clearFormState]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin({ login, motDePasse });
  };

  return (
    <div className="w-full max-w-md p-8 rounded-3xl border border-[#d9cdb8]/60 bg-white/80 backdrop-blur-xl shadow-xl shadow-stone-100">
      <div className="flex flex-col items-center mb-8">
        <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-gradient-to-r from-[#F2700B] to-[#e05a00] text-white shadow-lg shadow-orange-500/20 mb-4">
          <LogIn size={22} />
        </div>
        <h2 className="text-2xl font-black text-zinc-900 tracking-tight text-center">
          Connexion Vendeur
        </h2>
        <p className="text-sm text-zinc-500 mt-1 text-center">
          Accédez à votre espace pour gérer vos annonces
        </p>
      </div>

      {formError && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl bg-red-50 border border-red-200/60 p-4 text-sm text-red-700 animate-fadeIn">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <span>{formError}</span>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
            Identifiant ou Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
              <Mail size={16} />
            </div>
            <input
              type="text"
              required
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="votre_pseudo ou email@adresse.com"
              className="w-full rounded-xl bg-white border border-[#d9cdb8]/60 py-3 pl-10 pr-4 text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-[#F2700B]/10 focus:border-[#F2700B] transition-all duration-200"
            />
          </div>
        </div>

        <div>
          <label className="block text-[13px] font-semibold text-zinc-700 mb-2">
            Mot de passe
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
              <Lock size={16} />
            </div>
            <input
              type="password"
              required
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl bg-white border border-[#d9cdb8]/60 py-3 pl-10 pr-4 text-[14px] text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-[#F2700B]/10 focus:border-[#F2700B] transition-all duration-200"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F2700B] to-[#e05a00] py-3.5 text-[14px] font-bold text-white shadow-lg shadow-orange-500/10 hover:shadow-orange-500/25 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
        >
          {isSubmitting ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'Se connecter'
          )}
        </button>
      </form>

      <div className="mt-8 text-center border-t border-[#d9cdb8]/30 pt-6">
        <p className="text-[13px] text-zinc-500">
          Nouveau sur Assigamé ?{' '}
          <Link href="/register" className="font-bold text-[#F2700B] hover:underline">
            Créer un compte vendeur
          </Link>
        </p>
      </div>
    </div>
  );
};
