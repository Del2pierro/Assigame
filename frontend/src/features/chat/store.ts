/**
 * @file store.ts
 * @feature chat
 * @role  Store Zustand du chat. Maintient l'état temps réel de la messagerie.
 *        C'est le store le plus critique en termes de performance car il
 *        reçoit des messages WebSocket en continu.
 *
 * @state
 *  - conversations        : Conversation[] — liste des discussions (panneau gauche)
 *  - activeConversationId : number | null  — conversation ouverte
 *  - messages             : Record<number, Message[]> — messages indexés par conversationId
 *  - wsStatus             : WsStatus — état de la connexion WebSocket
 *  - currentPage          : number — page de pagination des messages
 *  - hasMore              : boolean — s'il reste des messages à charger
 *
 * @actions
 *  - setConversations()
 *  - setActiveConversation()
 *  - appendMessage()        — ajoute un message reçu en temps réel
 *  - prependMessages()      — préfixe les anciens messages (pagination)
 *  - setWsStatus()
 *  - clearChat()            — réinitialise à la déconnexion
 */

// Implémentation à venir (Zustand)
