package com.ong.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@Table(name = "lotes")
public class Lote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "produto_id", nullable = false)
    private Produto produto;

    @Column(nullable = false)
    private Integer quantidadeInicial;

    @Column(nullable = false)
    private Integer quantidadeAtual;

    @Column(nullable = false)
    private LocalDate dataEntrada;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UnidadeMedida unidadeMedida;

    private LocalDate dataValidade;
    private String tamanho;
    private String voltagem;
    private String observacoes;

    @Transient
    public String getCodigoBarras() {
        if (this.id == null) return null;
        String prefixo = "2";
        String corpo = String.format("%011d", this.id);
        String codigoSemDigito = prefixo + corpo;
        
        int digito = calcularDigitoVerificador(codigoSemDigito);
        return codigoSemDigito + digito;
    }

    private int calcularDigitoVerificador(String codigo) {
        int soma = 0;
        for (int i = 0; i < codigo.length(); i++) {
            int n = Character.getNumericValue(codigo.charAt(i));
            soma += (i % 2 == 0) ? n : n * 3;
        }
        int resto = soma % 10;
        return (resto == 0) ? 0 : 10 - resto;
    }
}