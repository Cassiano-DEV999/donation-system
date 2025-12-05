package com.ong.backend.controllers;

import com.ong.backend.dto.doacao.EntradaDoacaoDTO;
import com.ong.backend.dto.lote.LoteResponseDTO;
import com.ong.backend.services.DoacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doacoes")
@RequiredArgsConstructor
public class DoacaoController {

    private final DoacaoService doacaoService;

    @PostMapping("/entrada-rapida")
    public ResponseEntity<List<Long>> receberDoacao(
            @Valid @RequestBody EntradaDoacaoDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {

        List<LoteResponseDTO> lotesCriados = doacaoService.processarEntradaMista(dto, userDetails.getUsername());

        
        List<Long> idsGerados = lotesCriados.stream()
                .map(LoteResponseDTO::id)
                .toList();

        return ResponseEntity.status(HttpStatus.CREATED).body(idsGerados);
    }
}