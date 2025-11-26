package com.ong.backend.dto.lote;

import com.ong.backend.models.LoteItem;
import java.time.LocalDate;

public record LoteItemResponseDTO(
    Long id,
    Long produtoId,
    String produtoNome,
    Integer quantidade,
    LocalDate dataValidade,
    String tamanho,
    String voltagem
) {
    public LoteItemResponseDTO(LoteItem item) {
        this(
            item.getId(),
            item.getProduto().getId(),
            item.getProduto().getNome(),
            item.getQuantidade(),
            item.getDataValidade(),
            item.getTamanho(),
            item.getVoltagem()
        );
    }
}
