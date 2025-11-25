package com.ong.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "movimentacoes")
public class Movimentacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "lote_id", nullable = false)
    private Lote lote;

    @ManyToOne(optional = false) // Sempre tem que ter um responsável
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoMovimentacao tipo; // ENTRADA ou SAIDA

    @Column(nullable = false)
    private Integer quantidade;

    @Column(nullable = false)
    private LocalDateTime dataHora;

    // Construtor utilitário para facilitar a criação no código
    public Movimentacao(Lote lote, Usuario usuario, TipoMovimentacao tipo, Integer quantidade) {
        this.lote = lote;
        this.usuario = usuario;
        this.tipo = tipo;
        this.quantidade = quantidade;
        this.dataHora = LocalDateTime.now();
    }
}