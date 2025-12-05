package com.ong.backend.config;

import com.ong.backend.models.*;
import com.ong.backend.repositories.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final CategoriaRepository categoriaRepository;
    private final ProdutoRepository produtoRepository;
    private final LoteRepository loteRepository;
    private final MovimentacaoRepository movimentacaoRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        log.info("🚀 Iniciando criação de dados de teste...");

        initializeAdminUsers();
        initializeVolunteers();
        initializeCategories();
        initializeProducts();
        initializeLotes();
        initializeMovimentacoes();

        log.info("✅ Inicialização de dados concluída!");
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

    private void initializeVolunteers() {
        if (usuarioRepository.findByEmail("voluntario@ong.com").isEmpty()) {
            Usuario voluntario1 = new Usuario();
            voluntario1.setNome("Maria Silva");
            voluntario1.setEmail("voluntario@ong.com");
            voluntario1.setSenha(passwordEncoder.encode("voluntario123"));
            voluntario1.setPerfil(PerfilUsuario.VOLUNTARIO);
            usuarioRepository.save(voluntario1);
            log.info("✅ Voluntário criado: voluntario@ong.com / voluntario123");
        }

        if (usuarioRepository.findByEmail("joao@ong.com").isEmpty()) {
            Usuario voluntario2 = new Usuario();
            voluntario2.setNome("João Santos");
            voluntario2.setEmail("joao@ong.com");
            voluntario2.setSenha(passwordEncoder.encode("joao123"));
            voluntario2.setPerfil(PerfilUsuario.VOLUNTARIO);
            usuarioRepository.save(voluntario2);
            log.info("✅ Voluntário criado: joao@ong.com / joao123");
        }
    }

    private void initializeProducts() {
        if (produtoRepository.count() > 0) {
            log.info("⏭️  Produtos já existem, pulando...");
            return;
        }

        Categoria alimentosCategoria = categoriaRepository.findByNome("Alimentos Não-Perecíveis").orElse(null);
        Categoria higieneCategoria = categoriaRepository.findByNome("Produtos de Higiene").orElse(null);
        Categoria roupasInfantilCategoria = categoriaRepository.findByNome("Roupas Infantil").orElse(null);
        Categoria roupasAdultoCategoria = categoriaRepository.findByNome("Roupas Adulto").orElse(null);
        Categoria brinquedosCategoria = categoriaRepository.findByNome("Brinquedos").orElse(null);
        Categoria materialEscolarCategoria = categoriaRepository.findByNome("Material Escolar").orElse(null);

        List<Produto> produtos = new ArrayList<>();

        // Alimentos
        if (alimentosCategoria != null) {
            produtos.add(criarProduto("Arroz Branco 1kg", "Arroz tipo 1", alimentosCategoria));
            produtos.add(criarProduto("Feijão Preto 1kg", "Feijão tipo 1", alimentosCategoria));
            produtos.add(criarProduto("Macarrão 500g", "Macarrão espaguete", alimentosCategoria));
            produtos.add(criarProduto("Óleo de Soja 900ml", "Óleo comestível", alimentosCategoria));
            produtos.add(criarProduto("Açúcar Cristal 1kg", "Açúcar refinado", alimentosCategoria));
            produtos.add(criarProduto("Café em Pó 500g", "Café torrado e moído", alimentosCategoria));
            produtos.add(criarProduto("Leite em Pó 400g", "Leite integral", alimentosCategoria));
            produtos.add(criarProduto("Farinha de Trigo 1kg", "Farinha especial", alimentosCategoria));
        }

        // Higiene
        if (higieneCategoria != null) {
            produtos.add(criarProduto("Sabonete 90g", "Sabonete em barra", higieneCategoria));
            produtos.add(criarProduto("Pasta de Dente 90g", "Creme dental", higieneCategoria));
            produtos.add(criarProduto("Shampoo 350ml", "Shampoo anticaspa", higieneCategoria));
            produtos.add(criarProduto("Condicionador 350ml", "Condicionador hidratante", higieneCategoria));
            produtos.add(criarProduto("Sabonete Líquido 250ml", "Sabonete líquido hidratante", higieneCategoria));
            produtos.add(criarProduto("Papel Higiênico 4 rolos", "Papel higiênico folha dupla", higieneCategoria));
        }

        // Roupas Infantil
        if (roupasInfantilCategoria != null) {
            produtos.add(criarProduto("Camiseta Infantil P", "Camiseta algodão", roupasInfantilCategoria));
            produtos.add(criarProduto("Camiseta Infantil M", "Camiseta algodão", roupasInfantilCategoria));
            produtos.add(criarProduto("Calça Infantil P", "Calça jeans", roupasInfantilCategoria));
            produtos.add(criarProduto("Calça Infantil M", "Calça jeans", roupasInfantilCategoria));
        }

        // Roupas Adulto
        if (roupasAdultoCategoria != null) {
            produtos.add(criarProduto("Camiseta Adulto M", "Camiseta algodão", roupasAdultoCategoria));
            produtos.add(criarProduto("Camiseta Adulto G", "Camiseta algodão", roupasAdultoCategoria));
            produtos.add(criarProduto("Calça Jeans 40", "Calça jeans masculina", roupasAdultoCategoria));
            produtos.add(criarProduto("Calça Jeans 42", "Calça jeans feminina", roupasAdultoCategoria));
        }

        // Brinquedos
        if (brinquedosCategoria != null) {
            produtos.add(criarProduto("Boneca", "Boneca de pano", brinquedosCategoria));
            produtos.add(criarProduto("Carrinho", "Carrinho de plástico", brinquedosCategoria));
            produtos.add(criarProduto("Jogo de Tabuleiro", "Jogo educativo", brinquedosCategoria));
            produtos.add(criarProduto("Quebra-Cabeça", "Quebra-cabeça 100 peças", brinquedosCategoria));
        }

        // Material Escolar
        if (materialEscolarCategoria != null) {
            produtos.add(criarProduto("Caderno 96 folhas", "Caderno brochura", materialEscolarCategoria));
            produtos.add(criarProduto("Lápis HB", "Lápis grafite", materialEscolarCategoria));
            produtos.add(criarProduto("Caneta Azul", "Caneta esferográfica", materialEscolarCategoria));
            produtos.add(criarProduto("Borracha Branca", "Borracha escolar", materialEscolarCategoria));
            produtos.add(criarProduto("Mochila Escolar", "Mochila infantil", materialEscolarCategoria));
        }

        produtoRepository.saveAll(produtos);
        log.info("✅ {} produtos criados!", produtos.size());
    }

    private Produto criarProduto(String nome, String descricao, Categoria categoria) {
        Produto produto = new Produto();
        produto.setNome(nome);
        produto.setDescricao(descricao);
        produto.setCategoria(categoria);
        return produto;
    }

    private void initializeLotes() {
        if (loteRepository.count() > 0) {
            log.info("⏭️  Lotes já existem, pulando...");
            return;
        }

        List<Produto> produtos = produtoRepository.findAll();
        if (produtos.isEmpty()) {
            log.warn("⚠️  Nenhum produto encontrado para criar lotes");
            return;
        }

        Random random = new Random();
        List<Lote> lotes = new ArrayList<>();

        for (Produto produto : produtos) {
            // Criar 2-4 lotes por produto
            int numLotes = 2 + random.nextInt(3);

            for (int i = 0; i < numLotes; i++) {
                Lote lote = new Lote();
                lote.setDataEntrada(LocalDate.now().minusDays(random.nextInt(90)));

                int quantidadeInicial = 10 + random.nextInt(91); // 10 a 100
                lote.setQuantidadeInicial(quantidadeInicial);
                lote.setQuantidadeAtual(quantidadeInicial - random.nextInt(quantidadeInicial / 2)); // Consome até 50%

                lote.setUnidadeMedida(UnidadeMedida.UNIDADE);

                // Observações aleatórias
                String[] observacoes = {
                        "Doação de empresa parceira",
                        "Doação de campanha solidária",
                        "Recebido em bom estado",
                        "Necessita distribuição urgente",
                        null
                };
                lote.setObservacoes(observacoes[random.nextInt(observacoes.length)]);

                // Criar item do lote
                LoteItem item = new LoteItem();
                item.setProduto(produto);
                item.setLote(lote);
                item.setQuantidade(lote.getQuantidadeAtual());

                // Alguns produtos têm validade
                if (random.nextBoolean() && produto.getCategoria().getNome().contains("Alimentos")) {
                    item.setDataValidade(LocalDate.now().plusMonths(3 + random.nextInt(9))); // 3 a 12 meses
                }

                List<LoteItem> itens = new ArrayList<>();
                itens.add(item);
                lote.setItens(itens);

                lotes.add(lote);
            }
        }

        loteRepository.saveAll(lotes);
        log.info("✅ {} lotes criados!", lotes.size());
    }

    private void initializeMovimentacoes() {
        if (movimentacaoRepository.count() > 0) {
            log.info("⏭️  Movimentações já existem, pulando...");
            return;
        }

        List<Lote> lotes = loteRepository.findAll();
        if (lotes.isEmpty()) {
            log.warn("⚠️  Nenhum lote encontrado para criar movimentações");
            return;
        }

        Usuario admin = usuarioRepository.findByEmail("admin@ong.com").orElse(null);
        Usuario voluntario = usuarioRepository.findByEmail("voluntario@ong.com").orElse(null);

        if (admin == null) {
            log.warn("⚠️  Usuário admin não encontrado");
            return;
        }

        Random random = new Random();
        List<Movimentacao> movimentacoes = new ArrayList<>();

        // Criar movimentações para alguns lotes
        for (Lote lote : lotes) {
            if (lote.getQuantidadeAtual() < lote.getQuantidadeInicial()) {
                // Calcular quanto foi consumido
                int consumido = lote.getQuantidadeInicial() - lote.getQuantidadeAtual();

                // Criar 1-3 movimentações de saída
                int numSaidas = 1 + random.nextInt(Math.min(3, consumido));
                int restante = consumido;

                for (int i = 0; i < numSaidas && restante > 0; i++) {
                    int quantidade = i == numSaidas - 1 ? restante : 1 + random.nextInt(restante);
                    restante -= quantidade;

                    Movimentacao movimentacao = new Movimentacao();
                    movimentacao.setLote(lote);
                    movimentacao.setTipo(TipoMovimentacao.SAIDA);
                    movimentacao.setQuantidade(quantidade);
                    movimentacao.setDataHora(LocalDateTime.now().minusDays(random.nextInt(60)));
                    movimentacao.setUsuario(random.nextBoolean() && voluntario != null ? voluntario : admin);

                    movimentacoes.add(movimentacao);
                }
            }

            // Algumas movimentações de ajuste
            if (random.nextInt(10) < 2) { // 20% de chance
                Movimentacao ajuste = new Movimentacao();
                ajuste.setLote(lote);
                ajuste.setTipo(random.nextBoolean() ? TipoMovimentacao.AJUSTE_PERDA : TipoMovimentacao.AJUSTE_GANHO);
                ajuste.setQuantidade(1 + random.nextInt(5));
                ajuste.setDataHora(LocalDateTime.now().minusDays(random.nextInt(30)));
                ajuste.setUsuario(admin);

                movimentacoes.add(ajuste);
            }
        }

        movimentacaoRepository.saveAll(movimentacoes);
        log.info("✅ {} movimentações criadas!", movimentacoes.size());
    }
}
