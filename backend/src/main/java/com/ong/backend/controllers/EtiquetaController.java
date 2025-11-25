package com.ong.backend.controllers;

import com.ong.backend.services.EtiquetaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/etiquetas")
@RequiredArgsConstructor
public class EtiquetaController {

    private final EtiquetaService etiquetaService;

    @GetMapping("/lote/{loteId}")
    public ResponseEntity<byte[]> gerarEtiqueta(
            @PathVariable Long loteId,
            @RequestParam(required = false, defaultValue = "MEDIO") String tamanho
    ) {
        try {
            byte[] etiqueta = etiquetaService.gerarEtiqueta(loteId, tamanho);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);
            headers.setContentDispositionFormData("attachment", "etiqueta-lote-" + loteId + ".png");
            
            return new ResponseEntity<>(etiqueta, headers, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
