package com.ong.backend.config;

import com.ong.backend.models.PerfilUsuario;
import com.ong.backend.models.Usuario;
import com.ong.backend.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        initializeAdminUsers();
    }

    private void initializeAdminUsers() {
        if (usuarioRepository.findByEmail("admin@ong.com").isEmpty()) {
            Usuario admin1 = new Usuario();
            admin1.setNome("Administrador Principal");
            admin1.setEmail("admin@ong.com");
            admin1.setSenha(passwordEncoder.encode("admin123"));
            admin1.setPerfil(PerfilUsuario.ADMIN);
            usuarioRepository.save(admin1);
            log.info("✅ Usuário admin criado: admin@ong.com / admin123");
        }

        if (usuarioRepository.findByEmail("admin2@ong.com").isEmpty()) {
            Usuario admin2 = new Usuario();
            admin2.setNome("Administrador Secundário");
            admin2.setEmail("admin2@ong.com");
            admin2.setSenha(passwordEncoder.encode("admin123"));
            admin2.setPerfil(PerfilUsuario.ADMIN);
            usuarioRepository.save(admin2);
            log.info("✅ Usuário admin criado: admin2@ong.com / admin123");
        }

        log.info("🚀 Inicialização de dados concluída!");
    }
}
