package com.ong.backend.dto.auth;

import com.ong.backend.models.PerfilUsuario;

public record LoginResponseDTO(
    String token,
    String tipo,
    Long usuarioId,
    String nome,
    String email,
    PerfilUsuario perfil
) {
    public LoginResponseDTO(String token, Long usuarioId, String nome, String email, PerfilUsuario perfil) {
        this(token, "Bearer", usuarioId, nome, email, perfil);
    }
}
