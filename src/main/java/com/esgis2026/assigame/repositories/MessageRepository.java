package com.esgis2026.assigame.repositories;

import com.esgis2026.assigame.entities.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for message data access.
 * <p>
 * Provides methods for querying message data including retrieving messages
 * for a conversation in chronological or reverse chronological order.
 * </p>
 * 
 * @author Assigame Team
 * @version 1.0
 * @since 2026
 */
@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    
    /**
     * Finds all messages for a conversation in chronological order (oldest first).
     * 
     * @param idConversation The conversation ID
     * @return List of messages in chronological order
     */
    List<Message> findByConversationIdConversationOrderByDateEnvoiAsc(Long idConversation);
    
    /**
     * Finds messages for a conversation in reverse chronological order (newest first).
     * Supports pagination for efficient loading of message history.
     * 
     * @param idConversation The conversation ID
     * @param pageable The pagination parameters
     * @return Page of messages in reverse chronological order
     */
    Page<Message> findByConversationIdConversationOrderByDateEnvoiDesc(Long idConversation, Pageable pageable);
}
