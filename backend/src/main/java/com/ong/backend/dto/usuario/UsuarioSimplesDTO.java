package com.ong.backend.dto.usuario;

import com.ong.backend.models.Usuario;

public record UsuarioSimplesDTO(
    Long id,
    String nome
) {
    public UsuarioSimplesDTO(Usuario usuario) {
        this(
            usuario.getId(),
            usuario.getNome()
        );
    }
}
