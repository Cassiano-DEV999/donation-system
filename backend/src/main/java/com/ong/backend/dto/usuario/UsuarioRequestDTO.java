package com.ong.backend.dto.usuario;

import com.ong.backend.models.PerfilUsuario;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record UsuarioRequestDTO(
    
    @NotBlank(message = "Nome é obrigatório")
    @Size(max = 200, message = "Nome deve ter no máximo 200 caracteres")
    String nome,
    
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ser válido")
    String email,
    
    @Size(min = 6, message = "Senha deve ter no mínimo 6 caracteres")
    String senha,
    
    @NotNull(message = "Perfil é obrigatório")
    PerfilUsuario perfil
) {}
