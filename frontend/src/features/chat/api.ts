/**
 * @file api.ts
 * @feature chat
 * @role  Pont entre la feature chat et chat.service.ts (REST uniquement).
 *        La communication WebSocket temps réel est gérée dans hooks.ts via stomp.client.ts.
 *
 * @functions
 *  - initiateConversation(payload: CreateConversationPayload) → Conversation
 *    Crée ou récupère une conversation existante pour un produit donné.
 *
 *  - loadSellerConversations(sellerId)    → Conversation[]
 *    Charge toutes les conversations d'un vendeur connecté.
 *
 *  - loadMessageHistory(conversationId, page?, size?) → PaginatedResponse<Message>
 *    Charge l'historique paginé des messages d'une conversation.
 */

// Implémentation à venir
