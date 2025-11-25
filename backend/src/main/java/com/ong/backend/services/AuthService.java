package com.ong.backend.services;

import com.ong.backend.dto.auth.LoginRequestDTO;
import com.ong.backend.dto.auth.LoginResponseDTO;
import com.ong.backend.exceptions.BusinessException;
import com.ong.backend.models.Usuario;
import com.ong.backend.repositories.UsuarioRepository;
import com.ong.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UsuarioRepository usuarioRepository;

    public LoginResponseDTO login(LoginRequestDTO dto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(dto.email(), dto.senha())
            );

            Usuario usuario = usuarioRepository.findByEmail(dto.email())
                    .orElseThrow(() -> new BusinessException("Usuário não encontrado"));

            String token = jwtUtil.generateToken(
                    usuario.getEmail(),
                    usuario.getId(),
                    usuario.getNome(),
                    usuario.getPerfil().name()
            );

            return new LoginResponseDTO(
                    token,
                    usuario.getId(),
                    usuario.getNome(),
                    usuario.getEmail(),
                    usuario.getPerfil()
            );

        } catch (BadCredentialsException e) {
            throw new BusinessException("Email ou senha inválidos");
        }
    }
}
