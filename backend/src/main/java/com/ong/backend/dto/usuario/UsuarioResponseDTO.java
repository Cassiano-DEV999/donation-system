package com.ong.backend.dto.usuario;

import com.ong.backend.models.PerfilUsuario;
import com.ong.backend.models.Usuario;

public record UsuarioResponseDTO(
    Long id,
    String nome,
    String email,
    PerfilUsuario perfil
) {
    public UsuarioResponseDTO(Usuario usuario) {
        this(
            usuario.getId(),
            usuario.getNome(),
            usuario.getEmail(),
            usuario.getPerfil()
        );
    }
}
