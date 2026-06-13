# Assigame Backend - Documentation Complète

Bienvenue dans la documentation technique du backend d'**Assigame**, une marketplace d'échange/vente avec un système de messagerie instantanée en temps réel.

---

## 🚀 Technologies Utilisées

- **Framework principal** : Java Spring Boot (v3+)
- **Base de données** : PostgreSQL
- **Persistance** : Spring Data JPA / Hibernate
- **Messagerie Temps Réel** : Spring WebSocket (STOMP Protocol)
- **Sécurisation des Mots de Passe** : BCrypt Password Encoder
- **Utilitaires** : Lombok (annotations de getters/setters explicites)

---

## 🏗️ Architecture Globale & Flux de Données

Le projet respecte une architecture en couches propre (Clean Architecture) favorisant le découplage et la testabilité :

```
[Client (Web/Mobile)] 
       │ 
       ▼ (Request DTO)
[Controllers (REST / WebSocket)] 
       │ 
       ▼ (Mapping via Mappers Spring)
[Service Layer] (Logique Métier & Sécurité)
       │ 
       ▼ (Entities)
[Repositories (JPA / Hibernate)] 
       │ 
       ▼
[Database (PostgreSQL)]
```

### Principes Clés de l'Architecture
1. **Séparation Request/Response DTOs** : Les objets d'entrée (Request) et de sortie (Response) des APIs sont strictement isolés des entités JPA pour éviter les failles de sécurité (mass-assignment) et les dépendances circulaires.
2. **Couplage Faible via Mappers** : Aucun code statique de transformation dans les DTOs. Les conversions sont effectuées par des composants Spring `@Component` injectés (ex. `UtilisateurMapper`, `MessageMapper`).
3. **Bannissement de `@Data`** : Les DTOs et entités utilisent `@Getter`, `@Setter`, `@NoArgsConstructor` et `@AllArgsConstructor` explicitement pour un meilleur contrôle sur `hashCode` and `equals`.

---

## 🗄️ Modèle de Données (Entités)

Le système tourne autour de 6 entités principales :

1. **Utilisateur (User)** : Un vendeur enregistré sur la plateforme.
2. **TypeUtilisateur (Role)** : Le rôle/type de l'utilisateur (ex. Vendeur, Administrateur).
3. **CategorieProduit** : La catégorie associée aux produits (ex. Jeux, Consoles).
4. **Produit** : Un article mis en vente par un utilisateur.
5. **Conversation** : Un salon de discussion unique entre un acheteur anonyme (`buyerId`) et un vendeur (`Utilisateur`) pour un `Produit` spécifique.
6. **Message** : Un message textuel échangé dans une conversation, avec précision de l'expéditeur (`BUYER` ou `SELLER`).

---

## 🔌 Contrat d'API (Endpoints)

### 1. Authentification (`/api/auth`)
- **`POST /api/auth/login`** : Permet à un vendeur de s'authentifier.
  - **Request** : `LoginRequest` (login/email + password)
  - **Response** : `UtilisateurResponse` (sans le mot de passe) ou `401 Unauthorized` si incorrect.

### 2. Gestion des Utilisateurs (`/api/utilisateurs`)
- **`POST /api/utilisateurs/register/{idTypeUtilisateur}`** : Créer un nouvel utilisateur.
- **`GET /api/utilisateurs/{id}`** : Récupérer un utilisateur par son ID.
- **`GET /api/utilisateurs/email/{email}`** : Récupérer un utilisateur par email.
- **`GET /api/utilisateurs`** : Récupérer la liste des utilisateurs.
- **`PUT /api/utilisateurs/{id}`** : Mettre à jour un utilisateur.
- **`PATCH /api/utilisateurs/{id}/toggle-actif`** : Activer/Désactiver un utilisateur.
- **`DELETE /api/utilisateurs/{id}`** : Supprimer un utilisateur.

### 3. Gestion des Produits (`/api/produits`)
- **`POST /api/produits/utilisateur/{idUtilisateur}/categorie/{idCategorie}`** : Publier un produit.
- **`GET /api/produits/{id}`** : Récupérer les détails d'un produit.
- **`GET /api/produits`** : Lister tous les produits.
- **`GET /api/produits/utilisateur/{idUtilisateur}`** : Lister les produits d'un utilisateur.
- **`GET /api/produits/categorie/{idCategorie}`** : Lister les produits par catégorie.
- **`GET /api/produits/statut/{statut}`** : Filtrer les produits par statut.
- **`PUT /api/produits/{id}`** : Mettre à jour un produit.
- **`PATCH /api/produits/{id}/statut/{nouveauStatut}`** : Changer le statut d'un produit.
- **`DELETE /api/produits/{id}`** : Supprimer un produit.

### 4. Catégories & Types d'Utilisateurs (`/api/categories` et `/api/types-utilisateurs`)
- Permettent la création, modification, lecture et suppression (CRUD classique) des catégories et rôles.

### 5. Système de Messagerie

#### Conversations (`/api/conversations`)
- **`POST /api/conversations`** : Récupère la conversation existante ou la crée si elle n'existe pas encore.
  - **Request** : `{"buyerId": "...", "sellerId": 1, "productId": 10}`
  - **Response** : `ConversationResponse`
- **`GET /api/conversations/seller/{sellerId}`** : Récupère toutes les conversations d'un vendeur.
  - **Sécurité** : Nécessite le header HTTP `X-User-Id` correspondant à `{sellerId}` sous peine de `403 Forbidden`.

#### Messages (`/api/messages`)
- **`POST /api/messages`** : Envoie un message via HTTP REST.
  - **Request** : `MessageRequest` (conversationId, senderType, senderId, content)
  - **Broadcast** : Le message est automatiquement diffusé sur WebSocket à destination de `/topic/conversation/{id}`.
- **`GET /api/messages/{conversationId}`** : Récupère l'historique des messages d'une conversation (ordonné par date d'envoi croissante).
  - **Pagination** : Supporte les query parameters `page` et `size` pour charger par morceaux (ex. `?page=0&size=20`).
  - **Sécurité** : Nécessite le header `X-Guest-Id` (pour l'acheteur) ou `X-User-Id` (pour le vendeur) pour s'assurer que le demandeur est membre de la conversation (`403 Forbidden` sinon).

---

## 💬 Messagerie Temps Réel (WebSockets STOMP)

L'application expose un serveur WebSocket STOMP pour les notifications et messages en direct.

- **Point de connexion (Endpoint)** : `ws://localhost:8080/ws`
- **Canal de réception (Subscription)** : `/topic/conversation/{conversationId}`
- **Destination d'envoi (Message Mapping)** : `/app/chat.send`
  - Le payload envoyé sur cette destination doit être un format `MessageRequest` :
    ```json
    {
      "conversationId": 100,
      "senderType": "BUYER",
      "senderId": "guest-buyer-123",
      "content": "Est-il disponible ?"
    }
    ```

---

## 🛠️ Installation & Lancement en Local

### 1. Configuration Database
Modifiez les paramètres de base de données dans [application.properties](file:///c:/Projet_conception_si/assigame/src/main/resources/application.properties) si nécessaire :
```properties
spring.datasource.url=jdbc:postgresql://127.0.0.1:5432/db_assigame
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 2. Compilation et Lancement
Pour builder et lancer l'application Spring Boot :
```bash
# Compilation et validation des tests
mvn clean test

# Lancer l'application
mvn spring-boot:run
```
