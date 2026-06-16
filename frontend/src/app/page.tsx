/**
 * @file page.tsx
 * @route  / (Accueil — Catalogue public)
 * @role   Page d'accueil et vitrine publique d'Assigame.
 *         Accessible à tous les visiteurs sans connexion.
 *         Assemble : Navbar + CategoryFilter + ProductGrid.
 *         Ne contient aucune logique métier.
 *
 * @seo
 *  title       : "Assigame — Marketplace de jeux d'occasion"
 *  description : "Découvrez et achetez des jeux vidéo et accessoires d'occasion
 *                 directement auprès de vendeurs particuliers."
 */

export const metadata = {
  title: "Assigame — Marketplace de jeux d'occasion",
  description:
    "Découvrez et achetez des jeux vidéo et accessoires d'occasion directement auprès de vendeurs particuliers.",
};

export default function HomePage() {
  return null; // À implémenter — assembler CategoryFilter + ProductGrid
}
