import { Produit, Utilisateur } from '@/types/models.types';
import { userService } from '@/services/user.service';

function needsSellerEnrichment(product: Produit): boolean {
  const u = product.utilisateur;
  if (!u?.idUtilisateur) return false;
  return !u.nom?.trim() || !u.prenom?.trim();
}

/** Charge les profils vendeurs manquants (backend ne renvoie que idUtilisateur) */
export async function enrichProductsWithSellers(products: Produit[]): Promise<Produit[]> {
  const idsToFetch = new Set<number>();
  for (const p of products) {
    if (needsSellerEnrichment(p)) {
      idsToFetch.add(p.utilisateur.idUtilisateur);
    }
  }
  if (idsToFetch.size === 0) return products;

  const sellerMap = new Map<number, Utilisateur>();
  await Promise.all(
    [...idsToFetch].map(async (id) => {
      try {
        const user = await userService.getById(id);
        sellerMap.set(id, user);
      } catch {
        /* profil indisponible — on garde les données partielles */
      }
    })
  );

  return products.map((p) => {
    const seller = sellerMap.get(p.utilisateur.idUtilisateur);
    return seller ? { ...p, utilisateur: seller } : p;
  });
}

export function getSellerDisplayName(product: Produit): string {
  const { prenom, nom } = product.utilisateur ?? {};
  if (prenom?.trim() && nom?.trim()) return `${prenom.trim()} ${nom.trim()}`;
  if (prenom?.trim()) return prenom.trim();
  if (nom?.trim()) return nom.trim();
  return 'Vendeur';
}

export function getSellerInitials(product: Produit): string {
  const { prenom, nom } = product.utilisateur ?? {};
  const a = prenom?.[0]?.toUpperCase() ?? '';
  const b = nom?.[0]?.toUpperCase() ?? '';
  return a + b || 'V';
}
