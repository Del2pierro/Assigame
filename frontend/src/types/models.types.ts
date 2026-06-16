/**
 * @file models.types.ts
 * @layer Types — Entités métier globales
 * @role  Interfaces TypeScript représentant les entités du domaine métier
 *        telles que renvoyées par le backend. Ces types sont la source
 *        de vérité pour toute l'application.
 *
 * @exports
 *  - Utilisateur    : { idUtilisateur, nom, prenom, email, login, telephone, adresse, dateInscription }
 *  - Produit        : { idProduit, nom, description, prix, statut, imageBase64, datePublication, utilisateur, categorie }
 *  - Categorie      : { idCategorie, nom }
 *  - Conversation   : { idConversation, produit, buyer (id+type), seller (id), dateCreation }
 *  - Message        : { idMessage, contenu, dateEnvoi, senderType, senderId, conversation }
 *  - ProductStatus  : Enum { DISPONIBLE, RESERVE, VENDU }
 *  - SenderType     : Enum { BUYER, SELLER }
 */

// Implémentation à venir
