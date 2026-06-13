# Guide de Développement Frontend — Pages et Fonctionnalités (Style Vinted)

Ce document décrit en détail les pages à implémenter, les fonctionnalités attendues sur chacune d'elles, l'expérience utilisateur (UX) et les connexions avec l'API backend d'**Assigame** pour le développement du frontend.

---

## 1. Architecture Globale des Pages (Sitemap)

Le site web doit être composé des pages principales suivantes :
1. **Accueil / Catalogue public (`/`)** : Exploration et recherche d'articles.
2. **Détail Produit (`/produits/:id`)** : Fiche technique et bouton de contact.
3. **Messagerie / Chat (`/chat`)** : Centre de discussion en temps réel (vendeurs & acheteurs invités).
4. **Connexion & Inscription (`/login` & `/register`)** : Authentification des vendeurs.
5. **Dashboard Vendeur (`/dashboard`)** : Gestion des annonces et des ventes.
6. **Formulaire Article (`/dashboard/articles/nouveau` ou `/dashboard/articles/edit/:id`)** : Publication et édition d'un article.
7. **Profil (`/profil`)** : Informations du compte du vendeur.

---

## 2. Descriptif Détaillé des Pages & Fonctionnalités

### 2.1. Page d'Accueil & Catalogue public (`/`)
*Cette page est la vitrine de l'application (type Vinted), ouverte à tous les visiteurs sans connexion.*

```
+--------------------------------------------------------------+
| [Logo Assigame]     [Rechercher un article...]    [Se connecter] |
+--------------------------------------------------------------+
| Catégories : [Tous] [Vêtements] [Chaussures] [Accessoires]   |
+--------------------------------------------------------------+
|                                                              |
|   +-------------------+  +-------------------+               |
|   | [Image]           |  | [Image]           |               |
|   | Robe vintage      |  | Basket de sport   |               |
|   | 15.00 €           |  | 45.00 €           |               |
|   | (Disponible)      |  | (Réservé)         |               |
|   +-------------------+  +-------------------+               |
|                                                              |
+--------------------------------------------------------------+
```

* **Fonctionnalités à implémenter :**
  1. **Barre de recherche** : Champ de saisie pour filtrer dynamiquement les articles par leur nom ou description (côté client, ou en appelant l'API).
  2. **Barre de catégories** : Récupérer la liste des catégories via `GET /api/categories` et les afficher sous forme de badges ou d'un menu horizontal. Cliquer sur une catégorie filtre la liste via `GET /api/produits/categorie/{idCategorie}`.
  3. **Grille d'articles** : Liste des articles actifs récupérés par `GET /api/produits`. Chaque carte affiche l'image (décodée du Base64), le nom, le prix, la catégorie et le statut (Disponible, Réservé, Vendu).
  4. **Tri** : Permettre à l'utilisateur de trier les articles par prix (croissant/décroissant) ou par date d'ajout.
* **Appels API Backend associés :**
  - Charger les catégories : `GET /api/categories`
  - Charger tous les articles : `GET /api/produits`
  - Charger les articles par catégorie : `GET /api/produits/categorie/{idCategorie}`

---

### 2.2. Page de Détail d'un Article (`/produits/:id`)
*Affiche les informations d'un article spécifique et permet d'entrer en contact avec le vendeur.*

* **Fonctionnalités à implémenter :**
  1. **Fiche d'informations** : Affichage en grand format de l'image de l'article, de son prix, de la date de publication, de sa description et de son statut actuel.
  2. **Bloc Vendeur** : Affichage des informations du vendeur (Prénom, Ville/Adresse, Téléphone s'il est renseigné).
  3. **Bouton d'action principal — "Acheter / Contacter le vendeur"** :
     - Si l'utilisateur clique sur ce bouton :
       - **Étape 1** : Si l'utilisateur n'est pas connecté, le frontend vérifie dans le `localStorage` s'il a déjà un `buyerId` (UUID). Si non, le frontend en génère un automatiquement (ex: `guest-xxxx-xxxx-xxxx`).
       - **Étape 2** : Envoyer une requête `POST /api/conversations` avec le payload contenant le `buyerId` (ou l'ID du vendeur s'il est connecté et veut négocier), le `sellerId` (ID du vendeur du produit) et le `productId` (ID du produit).
       - **Étape 3** : Le backend retourne l'objet de la conversation (nouvelle ou déjà existante). Le frontend redirige alors l'utilisateur vers la page `/chat?id={conversationId}`.
* **Appels API Backend associés :**
  - Détails du produit : `GET /api/produits/{id}`
  - Création/Récupération de la discussion : `POST /api/conversations`

---

### 2.3. Page de Messagerie / Chat (`/chat`)
*L'écran de négociation en temps réel. C'est l'élément central de l'application.*

```
+--------------------------------------------------------------+
| Conversations                | Chat : Robe vintage (15.00 €) |
+------------------------------+-------------------------------+
| [Acheteur 1] Robe vintage    | [Buyer] : Est-il dispo ?      |
| [Acheteur 2] Veste en cuir   | [Seller] : Oui, toujours !    |
|                              |                               |
|                              |                               |
|                              | +---------------------------+ |
|                              | |Écrire un message...   [>] | |
|                              | +---------------------------+ |
+------------------------------+-------------------------------+
```

* **Fonctionnalités à implémenter :**
  1. **Layout double-panneau (Split-screen)** :
     - **Panneau gauche (Liste des discussions)** :
       - *Pour le vendeur connecté* : Affiche toutes ses conversations récupérées par `GET /api/conversations/seller/{idUtilisateur}`. Chaque élément affiche le nom du produit concerné et l'identifiant de l'acheteur.
       - *Pour l'acheteur invité (Guest)* : Liste des conversations stockées dans un tableau au sein du `localStorage` (avec leur identifiant, le nom du produit et le vendeur), afin qu'il puisse reprendre ses discussions en cours.
     - **Panneau droit (Fenêtre de discussion active)** :
       - Affiche l'historique des messages de la conversation sélectionnée via `GET /api/messages/{conversationId}`.
       - Supporte le défilement vers le haut pour charger les anciens messages (pagination `?page=X&size=20`).
       - Bulle de messages distinctes pour l'expéditeur courant (à droite en bleu/violet) et le destinataire (à gauche en gris).
  2. **Connexion Temps Réel (WebSockets STOMP)** :
     - Lors de l'ouverture d'une conversation, s'abonner au canal `/topic/conversation/{conversationId}`.
     - Lors de la réception d'un nouveau message sur ce canal, l'ajouter instantanément à la liste des messages à l'écran (sans rafraîchir la page).
  3. **Saisie et Envoi de message** :
     - L'utilisateur saisit son texte et appuie sur Entrée ou clique sur le bouton d'envoi.
     - Le message est publié en STOMP vers `/app/chat.send` avec les informations d'identification de l'expéditeur (`senderType: BUYER|SELLER` et `senderId`).
* **Appels API Backend associés :**
  - Liste des conversations du vendeur : `GET /api/conversations/seller/{sellerId}` (avec header `X-User-Id`)
  - Historique des messages : `GET /api/messages/{conversationId}` (avec header `X-User-Id` ou `X-Guest-Id`)
  - WebSocket : Connexion à `/ws`, abonnement à `/topic/conversation/{conversationId}`, envoi sur `/app/chat.send`.

---

### 2.4. Pages de Connexion (`/login`) & Inscription (`/register`)
*Permet aux utilisateurs de créer un compte vendeur et de s'authentifier.*

* **Fonctionnalités à implémenter :**
  1. **Connexion** :
     - Formulaire avec champs `Login / Email` et `Mot de passe`.
     - Gestion des erreurs (ex. "Identifiants incorrects" ou "Compte désactivé").
     - En cas de succès, sauvegarder le profil vendeur retourné (notamment son `idUtilisateur`) dans un état global (React Context / Zustand) et rediriger vers le `/dashboard`.
  2. **Inscription** :
     - Formulaire complet : Nom, Prénom, Email, Login, Mot de passe, Téléphone, Adresse.
     - Sélection du type d'utilisateur (par défaut "Vendeur").
     - Soumission au backend et redirection vers la page de connexion avec un message de succès.
* **Appels API Backend associés :**
  - Connexion : `POST /api/auth/login`
  - Inscription : `POST /api/utilisateurs/register/{idTypeUtilisateur}`
  - Liste des types d'utilisateurs (facultatif) : `GET /api/types-utilisateurs`

---

### 2.5. Dashboard / Espace Vendeur (`/dashboard`)
*La page de gestion privée du vendeur connecté.*

* **Fonctionnalités à implémenter :**
  1. **Statistiques rapides** : Nombre d'articles en vente, nombre d'articles vendus.
  2. **Liste de ses articles** : Tableau ou grille affichant les articles du vendeur (`GET /api/produits/utilisateur/{idUtilisateur}`).
  3. **Contrôle rapide du statut (Vinted-like)** :
     - Un sélecteur ou toggle rapide pour changer le statut d'un article : basculer de **Disponible** à **Réservé** ou **Vendu**. Cela appelle l'API de modification de statut en arrière-plan.
  4. **Actions d'administration** :
     - Bouton "Modifier" : Redirige vers le formulaire d'édition de l'article.
     - Bouton "Supprimer" : Déclenche une boîte de dialogue de confirmation, puis supprime l'article via `DELETE /api/produits/{id}`.
  5. **Bouton "Vendre un article"** : Redirige vers la page d'ajout d'un nouvel article.
* **Appels API Backend associés :**
  - Liste des produits du vendeur : `GET /api/produits/utilisateur/{idUtilisateur}`
  - Mettre à jour le statut : `PATCH /api/produits/{id}/statut/{nouveauStatut}`
  - Supprimer l'article : `DELETE /api/produits/{id}`

---

### 2.6. Formulaire d'Ajout / Modification d'Article (`/dashboard/articles/nouveau`)
*Formulaire permettant de publier un nouvel article ou d'éditer une annonce existante.*

* **Fonctionnalités à implémenter :**
  1. **Champs du formulaire** : Nom de l'article, Prix de vente, Description textuelle, Catégorie (dropdown pré-rempli par `/api/categories`).
  2. **Upload d'image (Drag & Drop)** :
     - Zone interactive pour glisser-déposer ou sélectionner un fichier image local.
     - Prévisualisation instantanée de l'image sélectionnée à l'écran.
     - Conversion automatique du fichier en chaîne Base64 (sans préfixe MIME) lors de la validation du formulaire.
  3. **Soumission** :
     - Pour un nouvel article : Appeler `POST /api/produits/utilisateur/{idUtilisateur}/categorie/{idCategorie}`.
     - Pour une modification : Appeler `PUT /api/produits/{id}`.
     - Rediriger l'utilisateur vers le `/dashboard` après succès.
* **Appels API Backend associés :**
  - Charger les catégories : `GET /api/categories`
  - Création : `POST /api/produits/utilisateur/{idUtilisateur}/categorie/{idCategorie}`
  - Modification : `PUT /api/produits/{id}`

---

### 2.7. Page de Profil du Vendeur (`/profil`)
*Permet de consulter et mettre à jour les coordonnées personnelles.*

* **Fonctionnalités à implémenter :**
  1. Affichage des informations de l'utilisateur (nom, prénom, email, téléphone, adresse, date d'inscription).
  2. Formulaire d'édition pour modifier le téléphone, l'adresse, le nom et le prénom.
* **Appels API Backend associés :**
  - Récupérer les données utilisateur : `GET /api/utilisateurs/{id}`
  - Mettre à jour : `PUT /api/utilisateurs/{id}`

---

## 3. Guide Technique pour le Développeur Frontend

### 3.1. Gestion du Stockage (Session & LocalStorage)
Pour assurer le fonctionnement fluide des rôles sans système de jeton (JWT) lourd :

```javascript
// Stockage de la session vendeur après connexion réussie
localStorage.setItem('user_id', response.data.idUtilisateur);
localStorage.setItem('user_profile', JSON.stringify(response.data));

// Récupération automatique / Génération du Guest ID pour les acheteurs anonymes
let guestId = localStorage.getItem('guest_id');
if (!guestId) {
  guestId = `guest-${crypto.randomUUID()}`;
  localStorage.setItem('guest_id', guestId);
}
```

### 3.2. Configuration des En-têtes HTTP (Intercepteur Axios)
Pour que le backend accepte les appels de messagerie, configurez Axios comme suit :

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: '/api' // Redirigé par le proxy de dév Vite
});

api.interceptors.request.use((config) => {
  const userId = localStorage.getItem('user_id');
  const guestId = localStorage.getItem('guest_id');

  // Si l'utilisateur est un vendeur connecté, on passe son ID
  if (userId) {
    config.headers['X-User-Id'] = userId;
  }
  
  // Si l'utilisateur est un acheteur invité, on passe son identifiant Guest
  if (guestId) {
    config.headers['X-Guest-Id'] = guestId;
  }

  return config;
});

export default api;
```
