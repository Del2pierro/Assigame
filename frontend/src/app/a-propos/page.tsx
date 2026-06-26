import React from "react";
import Link from "next/link";
import { ArrowLeft, Store, ShieldCheck, HeartHandshake, UserPlus, ShoppingBag, MessageCircle } from "lucide-react";

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EE] pb-16">
      {/* ── En-tête (Hero Section) ── */}
      <div className="bg-[#F0E9D9] pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#d9cdb8]/40">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-[#F2700B] transition-colors bg-white/60 px-4 py-2 rounded-full shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Link>
          </div>
          
          <div className="flex justify-center mb-8">
            <img 
              src="/logo.png" 
              alt="Logo Assigamé" 
              className="h-20 md:h-24 w-auto object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 mb-6 leading-tight">
            Bienvenue sur <span className="text-[#F2700B]">Assigamé</span>,<br />
            le grand marché du Togo.
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            La marketplace togolaise conçue pour faciliter vos achats et vos ventes au quotidien, 
            qu'il s'agisse de produits flambant neufs ou de bonnes affaires d'occasion.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-3xl shadow-sm border border-[#d9cdb8]/30 overflow-hidden">
          
          {/* ── Notre Histoire ── */}
          <div className="p-8 md:p-12 border-b border-zinc-100">
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">Notre Histoire</h2>
            <p className="text-zinc-600 leading-relaxed text-lg">
              Le projet <strong>Assigamé</strong> est né d'un constat simple : il manquait au Togo 
              une plateforme numérique moderne, rapide et ultra-sécurisée pour connecter directement 
              les vendeurs et les acheteurs locaux. Développée par une équipe de jeunes talents 
              passionnés par le web et les nouvelles technologies, l'application ambitionne de 
              devenir la référence nationale du e-commerce de proximité.
            </p>
          </div>

          {/* ── Comment ça marche ? ── */}
          <div className="p-8 md:p-12 bg-zinc-50/50 border-b border-zinc-100">
            <h2 className="text-2xl font-bold text-zinc-900 mb-8 text-center">Comment ça marche ?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white border border-[#d9cdb8]/50 text-[#F2700B] rounded-2xl flex items-center justify-center mb-4 shadow-sm rotate-3">
                  <UserPlus className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-zinc-900 mb-2">1. Créez un compte</h4>
                <p className="text-sm text-zinc-500">Inscrivez-vous gratuitement en quelques secondes pour rejoindre la communauté.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white border border-[#d9cdb8]/50 text-[#F2700B] rounded-2xl flex items-center justify-center mb-4 shadow-sm -rotate-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-zinc-900 mb-2">2. Publiez ou Cherchez</h4>
                <p className="text-sm text-zinc-500">Mettez vos articles en ligne avec de belles photos, ou parcourez notre catalogue.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white border border-[#d9cdb8]/50 text-[#F2700B] rounded-2xl flex items-center justify-center mb-4 shadow-sm rotate-3">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-zinc-900 mb-2">3. Discutez et Concluez</h4>
                <p className="text-sm text-zinc-500">Utilisez notre messagerie privée pour négocier et fixer un point de rendez-vous sécurisé.</p>
              </div>
            </div>
          </div>

          {/* ── Nos Valeurs ── */}
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-zinc-900 mb-8">Nos Engagements</h2>
            <div className="space-y-8">
              <section className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-[#F0E9D9] text-[#F2700B] rounded-full flex items-center justify-center mt-1">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-1">
                    Soutenir l'économie locale
                  </h3>
                  <p className="text-zinc-600 leading-relaxed">
                    Assigamé est un véritable tremplin pour l'économie togolaise. Nous offrons une 
                    vitrine digitale gratuite aux petits entrepreneurs et commerçants pour faire 
                    connaître leurs produits neufs, tout en favorisant l'économie circulaire avec 
                    la revente entre particuliers.
                  </p>
                </div>
              </section>

              <section className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-[#F0E9D9] text-[#F2700B] rounded-full flex items-center justify-center mt-1">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-1">
                    Confiance & Simplicité
                  </h3>
                  <p className="text-zinc-600 leading-relaxed">
                    Grâce à notre messagerie instantanée en temps réel et nos profils vérifiés, 
                    acheteurs et vendeurs communiquent sans intermédiaire. Vous gardez le contrôle 
                    total de vos transactions pour une remise en main propre en toute sérénité.
                  </p>
                </div>
              </section>
              
              <section className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-[#F0E9D9] text-[#F2700B] rounded-full flex items-center justify-center mt-1">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-1">
                    Une Technologie de Pointe
                  </h3>
                  <p className="text-zinc-600 leading-relaxed">
                    Derrière sa grande simplicité d'utilisation, Assigamé repose sur une architecture 
                    technique robuste et moderne, garantissant des recherches ultra-rapides et une 
                    expérience fluide sur mobile comme sur ordinateur.
                  </p>
                </div>
              </section>
            </div>
          </div>

          <div className="bg-zinc-900 text-center py-6">
            <p className="text-zinc-400 text-sm font-medium">
              © {new Date().getFullYear()} Assigamé. Fièrement développé au Togo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
