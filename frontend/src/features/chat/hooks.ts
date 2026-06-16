/**
 * @file hooks.ts
 * @feature chat
 * @role  Hooks React du chat. Orchestre REST + WebSocket STOMP.
 *        C'est le coeur de la feature chat.
 *
 * @hooks
 *  useConversations()
 *    - Pour vendeur connecté : charge les conversations via loadSellerConversations()
 *    - Pour guest : lit les conversations depuis localStorage (useLocalStorage)
 *    - Expose : { conversations, isLoading, selectConversation }
 *
 *  useMessages(conversationId)
 *    - Charge l'historique initial via loadMessageHistory()
 *    - S'abonne au canal STOMP /topic/conversation/{conversationId}
 *    - Sur réception : appelle store.appendMessage()
 *    - Gère la désinscription STOMP au démontage du composant (cleanup)
 *    - Expose : { messages, isLoading, loadMore, hasMore }
 *
 *  useStompConnection()
 *    - Initialise le client STOMP via lib/stomp.client.ts au montage
 *    - Synchronise wsStatus dans le store
 *    - Gère la reconnexion automatique
 *    - Expose : { wsStatus, publish }
 *
 *  useSendMessage(conversationId)
 *    - Publie un message STOMP vers /app/chat.send
 *    - Construit le payload StompSendPayload avec l'ID de l'expéditeur courant
 *    - Expose : { sendMessage, isSending }
 */

// Implémentation à venir
