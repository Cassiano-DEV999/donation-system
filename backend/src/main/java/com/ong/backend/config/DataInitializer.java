package com.ong.backend.config;

import com.ong.backend.models.Categoria;
import com.ong.backend.models.PerfilUsuario;
import com.ong.backend.models.Usuario;
import com.ong.backend.repositories.CategoriaRepository;
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
    private final CategoriaRepository categoriaRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        initializeAdminUsers();
        initializeCategories();
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
    }

    private void initializeCategories() {
        criarCategoriaSeNaoExistir("Roupas Infantil", "Vestuário para crianças", "👶");
        criarCategoriaSeNaoExistir("Roupas Adulto", "Vestuário para adultos", "👔");
        criarCategoriaSeNaoExistir("Calçados", "Sapatos, tênis, sandálias", "👟");
        criarCategoriaSeNaoExistir("Alimentos Não-Perecíveis", "Arroz, feijão, macarrão, enlatados", "🍚");
        criarCategoriaSeNaoExistir("Produtos de Higiene", "Sabonete, pasta de dente, xampu", "🧼");
        criarCategoriaSeNaoExistir("Produtos de Limpeza", "Detergente, sabão em pó, desinfetante", "🧽");
        criarCategoriaSeNaoExistir("Material Escolar", "Cadernos, lápis, canetas, mochilas", "📚");
        criarCategoriaSeNaoExistir("Brinquedos", "Brinquedos educativos e recreativos", "🧸");
        criarCategoriaSeNaoExistir("Livros", "Livros infantis, didáticos e diversos", "📖");
        criarCategoriaSeNaoExistir("Eletrônicos", "Computadores, celulares, tablets", "💻");
        criarCategoriaSeNaoExistir("Móveis", "Mesas, cadeiras, camas, armários", "🪑");
        criarCategoriaSeNaoExistir("Eletrodomésticos", "Fogão, geladeira, liquidificador", "🏠");
        criarCategoriaSeNaoExistir("Cobertores e Lençóis", "Roupas de cama", "🛏️");
        criarCategoriaSeNaoExistir("Fraldas", "Fraldas descartáveis e reutilizáveis", "🍼");
        criarCategoriaSeNaoExistir("Medicamentos", "Medicamentos e suplementos", "💊");
        
        log.info("✅ Categorias práticas inicializadas!");
        log.info("🚀 Inicialização de dados concluída!");
    }

    private void criarCategoriaSeNaoExistir(String nome, String descricao, String icone) {
        if (!categoriaRepository.existsByNome(nome)) {
            Categoria categoria = new Categoria();
            categoria.setNome(nome);
            categoria.setDescricao(descricao);
            categoria.setIcone(icone);
            categoriaRepository.save(categoria);
            log.info("✅ Categoria criada: {} {}", icone, nome);
        }
    }
}
