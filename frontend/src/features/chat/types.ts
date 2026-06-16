/**
 * @file types.ts
 * @feature chat
 * @role  Types TypeScript du domaine messagerie.
 *
 * @exports
 *  - Conversation         : Entité conversation (importée depuis types/models.types.ts)
 *  - Message              : Entité message (importée depuis types/models.types.ts)
 *  - SenderType           : Enum { BUYER = 'BUYER', SELLER = 'SELLER' }
 *  - StompSendPayload     : { conversationId, senderId, senderType, contenu }
 *                           Payload envoyé via STOMP vers /app/chat.send
 *  - CreateConversationPayload : { buyerId, sellerId, productId }
 *  - ChatState            : { activeConversationId, messages, conversations, wsStatus }
 *  - WsStatus             : 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED' | 'ERROR'
 */

// Implémentation à venir
