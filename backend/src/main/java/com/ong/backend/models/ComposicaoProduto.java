package com.ong.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "composicao_produtos")
public class ComposicaoProduto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "produto_pai_id", nullable = false)
    private Produto produtoPai;

    @ManyToOne
    @JoinColumn(name = "produto_componente_id", nullable = false)
    private Produto componente;
    @Column(nullable = false)
    private Integer quantidade;
}