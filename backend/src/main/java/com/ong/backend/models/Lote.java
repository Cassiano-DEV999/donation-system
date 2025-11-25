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

    // --- Campos Dinâmicos (Podem ser nulos dependendo da Categoria) ---
    private LocalDate dataValidade; // Crítico para Alimentos
    private String tamanho;         // Para Roupas
    private String voltagem;        // Para Eletrônicos
    private String observacoes;     // "Amassado", "Sem fio"

    // --- Lógica do Código de Barras Interno (EAN-13) ---
    @Transient // Não salva no banco, calcula na hora
    public String getCodigoBarras() {
        if (this.id == null) return null;
        // Prefixo 2 (Uso interno) + ID formatado com 11 dígitos
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
            // Posições pares peso 3, impares peso 1 (Lógica EAN padrão)
            soma += (i % 2 == 0) ? n : n * 3;
        }
        int resto = soma % 10;
        return (resto == 0) ? 0 : 10 - resto;
    }
}