package com.ong.backend.repositories;

import com.ong.backend.models.LoteItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoteItemRepository extends JpaRepository<LoteItem, Long> {
}
