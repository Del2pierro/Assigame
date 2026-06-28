package com.esgis2026.assigame.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * WebSocket configuration for real-time messaging.
 * <p>
 * Configures STOMP (Simple Text Oriented Messaging Protocol) for WebSocket communication.
 * Enables a simple message broker for broadcasting messages to subscribed clients.
 * Supports both SockJS and raw WebSocket connections.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * Configures the message broker.
     * <p>
     * Enables a simple in-memory message broker for broadcasting messages
     * to clients subscribed to topics prefixed with "/topic".
     * Sets "/app" as the prefix for messages sent from clients to the server.
     * </p>
     * 
     * @param config The message broker registry to configure
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    /**
     * Registers STOMP endpoints for WebSocket connections.
     * <p>
     * Registers the "/ws" endpoint for WebSocket connections.
     * Supports both SockJS (for fallback support in older browsers)
     * and raw WebSocket connections.
     * Allows connections from any origin for development purposes.
     * </p>
     * 
     * @param registry The STOMP endpoint registry
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Support SockJS connections
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS();
        
        // Support raw WebSocket connections (very useful for CLI tools and simple clients)
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*");
    }
}
