/**
 * @file stomp.client.ts
 * @layer Lib — Infrastructure WebSocket
 * @role  Initialisation, connexion et gestion du cycle de vie du client STOMP.
 *        Encapsule la bibliothèque @stomp/stompjs pour fournir une interface
 *        simplifiée utilisée par features/chat/hooks.ts.
 *
 * @responsibilities
 *  - Créer et configurer le client STOMP (URL : ws://.../ws)
 *  - Gérer la connexion et la reconnexion automatique
 *  - Exposer des fonctions : connect(), disconnect(), subscribe(), publish()
 *  - Gérer les headers d'authentification STOMP (X-User-Id ou X-Guest-Id)
 *
 * @usage (depuis features/chat/hooks.ts uniquement)
 *  stompClient.connect()
 *  stompClient.subscribe('/topic/conversation/100', callback)
 *  stompClient.publish('/app/chat.send', payload)
 *
 * ⚠️ Ce fichier est le seul point d'entrée WebSocket de l'application.
 *    Aucun composant ne doit importer @stomp/stompjs directement.
 */

// Implémentation à venir
