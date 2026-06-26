import { Client, IMessage, StompSubscription } from '@stomp/stompjs';

// Configuration de base pour l'URL WebSocket
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080/ws';

class StompClientService {
  private client: Client | null = null;
  private subscriptions: Map<string, StompSubscription> = new Map();

  connect(userId: string, onConnect?: () => void, onError?: (err: any) => void) {
    if (this.client && this.client.active) {
      return;
    }

    this.client = new Client({
      brokerURL: WS_URL,
      connectHeaders: {
        'X-User-Id': userId, // Selon la spec backend
      },
      debug: function (str) {
        if (process.env.NODE_ENV !== 'production') {
          console.log('[STOMP]', str);
        }
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.client.onConnect = () => {
      console.log('[STOMP] Connected');
      if (onConnect) onConnect();
    };

    this.client.onStompError = (frame) => {
      console.error('[STOMP] Broker reported error: ' + frame.headers['message']);
      console.error('[STOMP] Additional details: ' + frame.body);
      if (onError) onError(frame);
    };

    this.client.onWebSocketError = (event) => {
      console.error('[STOMP] WebSocket error: ', event);
      if (onError) onError(event);
    };

    this.client.activate();
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
      this.subscriptions.clear();
      console.log('[STOMP] Disconnected');
    }
  }

  subscribe(topic: string, callback: (message: IMessage) => void) {
    if (!this.client || !this.client.connected) {
      console.error('[STOMP] Client not connected, cannot subscribe to ' + topic);
      return;
    }
    
    if (this.subscriptions.has(topic)) {
      return; // Déjà abonné
    }

    const subscription = this.client.subscribe(topic, callback);
    this.subscriptions.set(topic, subscription);
  }

  unsubscribe(topic: string) {
    const subscription = this.subscriptions.get(topic);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(topic);
    }
  }

  publish(destination: string, body: any) {
    if (!this.client || !this.client.connected) {
      console.error('[STOMP] Client not connected, cannot publish to ' + destination);
      return;
    }

    this.client.publish({
      destination,
      body: JSON.stringify(body)
    });
  }
}

export const stompClient = new StompClientService();
