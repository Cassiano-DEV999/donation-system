package com.ong.backend.repositories;

import com.ong.backend.models.Lote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoteRepository extends JpaRepository<Lote, Long> {
    
    List<Lote> findByQuantidadeAtualGreaterThan(Integer quantidade);
}
