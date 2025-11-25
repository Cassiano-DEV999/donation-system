package com.ong.backend.repositories;

import com.ong.backend.models.Lote;
import com.ong.backend.models.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LoteRepository extends JpaRepository<Lote, Long> {
    
    List<Lote> findByProduto(Produto produto);
    
    List<Lote> findByProdutoId(Long produtoId);
    
    List<Lote> findByDataValidadeBefore(LocalDate data);
    
    List<Lote> findByQuantidadeAtualGreaterThan(Integer quantidade);
}
