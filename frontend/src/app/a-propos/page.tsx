import React from "react";
import Link from "next/link";
import { ArrowLeft, Store, ShieldCheck, HeartHandshake } from "lucide-react";

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EE] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* En-tête avec bouton retour */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-[#F2700B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
        </div>

        {/* Contenu principal */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-[#d9cdb8]/30">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 mb-4">
              À propos d'<span className="text-[#F2700B]">Assigamé</span>
            </h1>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              La première marketplace étudiante dédiée à la communauté de
              l'ESGIS pour acheter, vendre et échanger en toute simplicité.
            </p>
          </div>

          <div className="space-y-12">
            <section className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#F0E9D9] text-[#F2700B] rounded-full flex items-center justify-center">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">
                  Notre Mission
                </h3>
                <p className="text-zinc-600 leading-relaxed">
                  Assigamé a été conçue pour faciliter la vie des étudiants en
                  leur offrant une plateforme sécurisée et intuitive pour vendre
                  les objets dont ils n'ont plus besoin ou acheter des articles
                  à moindre coût. Que ce soit des livres, de l'électronique ou
                  des accessoires, tout se passe entre étudiants.
                </p>
              </div>
            </section>

            <section className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#F0E9D9] text-[#F2700B] rounded-full flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">
                  Confiance & Sécurité
                </h3>
                <p className="text-zinc-600 leading-relaxed">
                  Parce que la plateforme est pensée pour une communauté fermée,
                  les échanges sont plus sûrs. Vous pouvez discuter directement
                  avec les vendeurs via notre messagerie intégrée pour convenir
                  d'un lieu de remise en main propre sur le campus.
                </p>
              </div>
            </section>

            <section className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#F0E9D9] text-[#F2700B] rounded-full flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">
                  Économie Circulaire
                </h3>
                <p className="text-zinc-600 leading-relaxed">
                  En utilisant Assigamé, vous participez activement à
                  l'économie circulaire de l'école. Donner une seconde vie aux
                  objets permet non seulement de faire des économies, mais aussi
                  de faire un geste concret pour l'environnement.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-16 text-center pt-8 border-t border-zinc-100">
            <p className="text-zinc-500 text-sm">
              © {new Date().getFullYear()} Assigamé. Projet développé par les
              étudiants de l'ESGIS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
