package com.esgis2026.assigame.repositories;

import com.esgis2026.assigame.entities.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByConversationIdConversationOrderByDateEnvoiAsc(Long idConversation);
    Page<Message> findByConversationIdConversationOrderByDateEnvoiDesc(Long idConversation, Pageable pageable);
}
