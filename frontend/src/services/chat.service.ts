/**
 * @file chat.service.ts
 * @layer Service — Domaine Chat (REST uniquement)
 * @role  Couche HTTP pour les conversations et l'historique des messages.
 *        La connexion WebSocket STOMP est gérée séparément dans lib/stomp.client.ts.
 *        Utilise l'instance api depuis api.client.ts.
 *
 * @endpoints
 *  - createConversation()       → POST /api/conversations
 *                                 Payload : { buyerId, sellerId, productId }
 *                                 Retourne la conversation (nouvelle ou existante)
 *
 *  - getSellerConversations()   → GET  /api/conversations/seller/{sellerId}
 *                                 Header : X-User-Id (requis)
 *                                 Retourne toutes les conversations du vendeur
 *
 *  - getMessages()              → GET  /api/messages/{conversationId}?page=X&size=20
 *                                 Header : X-User-Id ou X-Guest-Id (requis)
 *                                 Retourne l'historique paginé des messages
 *
 * ⚠️ Ce fichier ne gère PAS la connexion WebSocket.
 *    Voir lib/stomp.client.ts pour la gestion du temps réel.
 */

// Implémentation à venir
