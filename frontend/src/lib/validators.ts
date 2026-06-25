import { z } from 'zod';

/**
 * Schema de validation pour le formulaire de connexion.
 * L'identifiant (login) peut être un pseudo ou un email.
 */
export const loginSchema = z.object({
  login: z.string().min(1, "L'identifiant ou email est obligatoire."),
  motDePasse: z.string().min(6, 'Le mot de passe doit faire au moins 6 caractères.'),
});

/**
 * Schema de validation pour le formulaire d'inscription vendeur.
 */
export const registerSchema = z.object({
  nom: z.string()
    .min(1, 'Le nom est obligatoire.')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères.'),
  prenom: z.string()
    .min(1, 'Le prénom est obligatoire.')
    .max(100, 'Le prénom ne peut pas dépasser 100 caractères.'),
  email: z.string()
    .min(1, "L'adresse email est obligatoire.")
    .email("L'adresse email doit être valide.")
    .max(150, "L'email ne peut pas dépasser 150 caractères."),
  login: z.string()
    .min(1, 'Le login est obligatoire.')
    .max(50, 'Le login ne peut pas dépasser 50 caractères.'),
  motDePasse: z.string()
    .min(6, 'Le mot de passe doit faire entre 6 et 100 caractères.')
    .max(100, 'Le mot de passe ne peut pas dépasser 100 caractères.'),
  telephone: z.string()
    .max(20, 'Le numéro de téléphone ne peut pas dépasser 20 caractères.')
    .optional()
    .or(z.literal('')),
  adresse: z.string()
    .max(255, "L'adresse ne peut pas dépasser 255 caractères.")
    .optional()
    .or(z.literal('')),
});

/**
 * Schema de validation pour la création/modification de produit.
 */
export const productSchema = z.object({
  nom: z.string()
    .min(1, 'Le nom du produit est obligatoire.')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères.'),
  prix: z.coerce.number().gt(0, 'Le prix doit être strictement supérieur à 0.'),
  description: z.string().min(1, 'La description est obligatoire.'),
  idCategorie: z.coerce.number().int().positive('La catégorie est obligatoire.'),
});

/**
 * Schema de validation pour la mise à jour du profil vendeur.
 */
export const profileUpdateSchema = z.object({
  nom: z.string().min(1, 'Le nom est obligatoire.').max(100).optional(),
  prenom: z.string().min(1, 'Le prénom est obligatoire.').max(100).optional(),
  telephone: z.string().max(20).optional().or(z.literal('')),
  adresse: z.string().max(255).optional().or(z.literal('')),
});
