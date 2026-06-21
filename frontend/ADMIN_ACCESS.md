# 🔐 Guide d'accès au Dashboard Administrateur — Assigamé

> **À lire par toute l'équipe** — en particulier le développeur qui implémente la page de connexion (`/login`).

---

## 📋 Qu'est-ce que le Dashboard Admin ?

Le dashboard admin est une zone protégée de l'application accessible **uniquement aux utilisateurs ayant le rôle `ADMIN`**.

**URL d'entrée :** `http://localhost:3000/admin`

**Pages disponibles :**

| Route | Fonctionnalité |
|---|---|
| `/admin` | Tableau de bord — statistiques globales |
| `/admin/utilisateurs` | Gestion des comptes utilisateurs (activer/désactiver/supprimer) |
| `/admin/produits` | Catalogue de modération — retirer des annonces |
| `/admin/categories` | Gestion des catégories (créer/modifier/supprimer) |

---

## 🔑 Comment accéder au Dashboard Admin ?

### Étape 1 — Se connecter via la page `/login`

L'utilisateur se connecte avec ses identifiants (email + mot de passe).

Le backend répond avec le **profil complet** de l'utilisateur, incluant son rôle.

### Étape 2 — Stocker le profil dans le `localStorage`

⚠️ **C'est la partie CRITIQUE pour que l'accès admin fonctionne.**

Après une connexion réussie, le frontend (page `/login`) doit stocker **obligatoirement** deux clés dans le `localStorage` du navigateur :

```javascript
// Clé 1 : l'identifiant numérique de l'utilisateur
localStorage.setItem('user_id', String(response.idUtilisateur));

// Clé 2 : le profil complet en JSON (avec le rôle dedans)
localStorage.setItem('user_profile', JSON.stringify(response));
```

### Étape 3 — Redirection automatique selon le rôle

Après avoir stocké le profil, rediriger selon le rôle :

```typescript
const profile = response; // la réponse du backend

if (profile.typeUtilisateur.libelle === 'ADMIN') {
  router.push('/admin');       // → Espace administrateur
} else {
  router.push('/dashboard');   // → Espace vendeur normal
}
```

---

## 📦 Format exact du profil renvoyé par le backend

Le backend doit renvoyer un objet JSON dans ce format lors de la connexion :

```json
{
  "idUtilisateur": 1,
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "admin@assigame.com",
  "login": "admin",
  "telephone": "00228XXXXXXXX",
  "adresse": "Lomé, Togo",
  "actif": true,
  "dateInscription": "2024-01-01",
  "typeUtilisateur": {
    "idTypeUtilisateur": 1,
    "libelle": "ADMIN"
  }
}
```

> ⚠️ **Important :** Le champ `typeUtilisateur.libelle` doit valoir exactement `"ADMIN"` (en majuscules) pour que l'accès soit accordé.

---

## 🛡️ Comment fonctionne la protection des routes ?

Chaque fois qu'un utilisateur tente d'accéder à une page sous `/admin/*`, notre `AdminLayout` exécute automatiquement cette vérification :

```
Utilisateur visite /admin/*
         ↓
localStorage contient 'user_profile' ?
         ↓ NON → Redirection vers /login
         ↓ OUI
typeUtilisateur.libelle === 'ADMIN' ?
         ↓ NON → Redirection vers /dashboard (c'est un vendeur)
         ↓ OUI → ✅ Accès autorisé, page admin s'affiche
```

**Fichier concerné :** `frontend/src/app/admin/layout.tsx`

---

## 🧪 Tester l'accès sans backend (mode développement)

Si le backend n'est pas encore lancé, tu peux simuler une connexion admin directement dans la console du navigateur (F12) :

**1. Tape d'abord `allow pasting` dans la console si Chrome te le demande**

**2. Colle et exécute ce code :**

```javascript
localStorage.setItem('user_id', '1');
localStorage.setItem('user_profile', JSON.stringify({
  idUtilisateur: 1,
  nom: "Admin",
  prenom: "Super",
  email: "admin@assigame.com",
  login: "admin",
  actif: true,
  typeUtilisateur: {
    idTypeUtilisateur: 1,
    libelle: "ADMIN"
  },
  dateInscription: "2024-01-01"
}));
```

**3. Navigue vers `http://localhost:3000/admin`**

---

## 🚪 Déconnexion

Le bouton **Déconnexion** en bas de la sidebar supprime les clés du `localStorage` et redirige vers `/login` :

```javascript
localStorage.removeItem('user_id');
localStorage.removeItem('user_profile');
// puis redirection vers /login
```

---

## 📁 Structure des fichiers du Dashboard Admin

```
frontend/src/
├── app/admin/
│   ├── layout.tsx              ← Sidebar + protection de route ADMIN
│   ├── page.tsx                ← Tableau de bord (statistiques)
│   ├── utilisateurs/
│   │   └── page.tsx            ← Gestion des utilisateurs
│   ├── produits/
│   │   └── page.tsx            ← Catalogue modération produits
│   └── categories/
│       └── page.tsx            ← Gestion des catégories
│
├── features/admin/
│   ├── api.ts                  ← Tous les appels HTTP admin
│   ├── store.ts                ← État global (Zustand)
│   └── types.ts                ← Interfaces TypeScript admin
│
├── services/
│   └── api.client.ts           ← Instance Axios partagée
│
└── types/
    └── models.types.ts         ← Types des entités métier
```

---

## 🔗 Endpoints API utilisés par le Dashboard Admin

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/api/utilisateurs` | Liste tous les utilisateurs |
| `PATCH` | `/api/utilisateurs/{id}/toggle-actif` | Active/désactive un compte |
| `DELETE` | `/api/utilisateurs/{id}` | Supprime un compte |
| `GET` | `/api/produits` | Liste tous les produits |
| `DELETE` | `/api/produits/{id}` | Supprime une annonce |
| `GET` | `/api/categories` | Liste les catégories |
| `POST` | `/api/categories` | Crée une catégorie |
| `PUT` | `/api/categories/{id}` | Modifie une catégorie |
| `DELETE` | `/api/categories/{id}` | Supprime une catégorie |

---

*Rédigé par : Dev Admin Dashboard — Branche `feature/admin-dashboard`*
