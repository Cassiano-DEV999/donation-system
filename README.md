# 🎁 Sistema de Gestão de Doações

Sistema completo para gerenciamento de doações de ONGs com controle de estoque, rastreabilidade e geração de etiquetas com código de barras.

## 📖 História do Projeto

Este sistema foi desenvolvido para auxiliar organizações não governamentais (ONGs) no gerenciamento eficiente de doações recebidas. O projeto surgiu da necessidade de ter um controle rigoroso de estoque, rastreabilidade de produtos e facilitar a distribuição de itens doados.

O sistema permite que voluntários e administradores façam o cadastro de produtos recebidos, organizem-nos por categorias (alimentos, vestuário, eletrônicos, higiene, etc.), controlem lotes com validade, gerem etiquetas com código de barras EAN-13 e acompanhem todas as movimentações de entrada e saída.

## ✨ Principais Funcionalidades

- **Dashboard Interativo** - Visão geral com estatísticas em tempo real e gráficos
- **Gestão de Categorias** - Organize doações por tipo (alimentos, vestuário, eletrônicos, higiene, outros)
- **Controle de Produtos** - Cadastre e gerencie todos os produtos recebidos
- **Sistema de Lotes** - Controle de quantidade, validade, tamanho, voltagem e observações
- **Movimentações** - Registre entradas, saídas, perdas e ganhos de estoque
- **Etiquetas com Código de Barras** - Gere e imprima etiquetas EAN-13 em diferentes tamanhos
- **Autenticação JWT** - Sistema seguro com perfis ADMIN e VOLUNTARIO
- **API RESTful Documentada** - Swagger/OpenAPI para integração

## 🚀 Tecnologias Utilizadas

### Backend
- **Spring Boot 3.5.8** - Framework Java para APIs REST
- **PostgreSQL 15** - Banco de dados relacional
- **Spring Security + JWT** - Autenticação e autorização
- **ZXing** - Geração de códigos de barras EAN-13
- **Springdoc OpenAPI 2.7.0** - Documentação automática da API
- **Docker** - Containerização e ambiente isolado

### Frontend
- **React 19.2.0** - Biblioteca JavaScript moderna
- **TypeScript** - Tipagem estática e segurança
- **Vite** - Build tool rápido
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI acessíveis e customizáveis
- **Recharts** - Gráficos e visualizações
- **React Router** - Navegação SPA
- **Axios** - Cliente HTTP

## 🛠️ Como Rodar o Projeto

### Pré-requisitos

- Docker e Docker Compose instalados
- Node.js 18+ (para desenvolvimento do frontend)
- Java 17+ (para desenvolvimento do backend)
- Git

### ⚠️ IMPORTANTE: Configuração do .env

**Antes de iniciar o projeto, você PRECISA configurar o arquivo `.env`:**

```bash
cd backend
cp .env.example .env
```

Edite o arquivo `.env` e configure suas variáveis de ambiente, especialmente:
- `JWT_SECRET` - Troque por uma chave secreta forte em produção
- Credenciais do banco de dados (se necessário)

### 1. Clone o Repositório

```bash
git clone https://github.com/Cassiano-DEV999/donation-system.git
cd donation-system
```

### 2. Rodando com Docker (Recomendado)

#### Backend

```bash
cd backend
cp .env.example .env  # Configure suas variáveis de ambiente
docker compose up --build -d
```

O backend estará disponível em `http://localhost:8080`

**Usuários padrão criados automaticamente:**
- `admin@ong.com` / `admin123`
- `admin2@ong.com` / `admin123`

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

### 3. Rodando sem Docker (Desenvolvimento)

#### Backend

```bash
cd backend
cp .env.example .env  # OBRIGATÓRIO: Configure suas variáveis
./mvnw spring-boot:run
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Acessando o Sistema

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **Swagger UI**: http://localhost:8080/swagger-ui/index.html
- **API Docs JSON**: http://localhost:8080/api-docs

## 📚 Documentação da API

Toda a documentação da API está disponível no Swagger UI:

**http://localhost:8080/swagger-ui/index.html**

Teste todos os endpoints interativamente. Para rotas protegidas, faça login em `/api/auth/login` e use o token no botão "Authorize".

## 🏗️ Estrutura do Projeto

```
donation-system/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/ong/backend/
│   │   │   │   ├── config/          # Configurações (Security, CORS, OpenAPI)
│   │   │   │   ├── controllers/     # Endpoints REST
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── exceptions/      # Tratamento de exceções
│   │   │   │   ├── models/          # Entidades JPA
│   │   │   │   ├── repositories/    # Repositórios JPA
│   │   │   │   ├── security/        # JWT e autenticação
│   │   │   │   └── services/        # Lógica de negócio
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── docker-compose.yml
│   ├── Dockerfile
│   └── pom.xml
└── frontend/
    ├── src/
    │   ├── components/      # Componentes reutilizáveis
    │   ├── contexts/        # Context API (AuthContext)
    │   ├── lib/            # Utilitários (axios, utils)
    │   ├── pages/          # Páginas da aplicação
    │   └── services/       # Serviços de API
    ├── package.json
    └── vite.config.ts
```

## 🤝 Como Contribuir

Contribuições são muito bem-vindas! Siga os passos abaixo:

### 1. Fork o Projeto

Clique no botão "Fork" no topo desta página.

### 2. Clone seu Fork

```bash
git clone https://github.com/SEU-USUARIO/donation-system.git
cd donation-system
```

### 3. Crie uma Branch

```bash
git checkout -b feature/minha-contribuicao
```

### 4. Faça suas Alterações

- Mantenha o código limpo e bem documentado
- Siga os padrões de código existentes
- Teste suas alterações localmente

### 5. Commit e Push

```bash
git add .
git commit -m "feat: adiciona nova funcionalidade X"
git push origin feature/minha-contribuicao
```

### 6. Abra um Pull Request

Vá até o repositório original e clique em "New Pull Request". Descreva suas alterações de forma clara e objetiva.

## 📝 Convenções de Commit

Utilizamos commits semânticos:

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Alterações na documentação
- `style:` - Formatação, ponto e vírgula, etc
- `refactor:` - Refatoração de código
- `test:` - Adição ou modificação de testes
- `chore:` - Tarefas de build, configurações, etc

## 🐛 Reportando Bugs

Encontrou um bug? Abra uma [issue](https://github.com/Cassiano-DEV999/donation-system/issues) com:

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)
- Ambiente (SO, versão do Node, Docker, etc)

## 💡 Sugestões de Melhorias

Tem uma ideia? Abra uma [issue](https://github.com/Cassiano-DEV999/donation-system/issues) com a tag `enhancement` descrevendo sua sugestão.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Cassiano Melo**

- GitHub: [@Cassiano-DEV999](https://github.com/Cassiano-DEV999)
- Email: cassianomeloprofissional@gmail.com

## 🙏 Agradecimentos

- Comunidade Spring Boot
- Comunidade React
- shadcn/ui pela excelente biblioteca de componentes
- Todas as ONGs que inspiraram este projeto

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!
   - Backend: http://localhost:8080
   - Swagger: http://localhost:8080/swagger-ui.html

### Sem Docker

1. **Inicie o PostgreSQL localmente** (porta 5432)

2. **Inicie o backend:**

```bash
cd backend
./mvnw spring-boot:run
```

3. **Inicie o frontend:**

```bash
cd frontend
npm install
npm run dev
```

## 📱 Fluxo de Uso

### 1. Login
- Acesse http://localhost:5173/login
- Use: admin@ong.com / admin123

### 2. Criar Categoria
- Navegue para "Categorias" no menu lateral
- Clique em "Nova Categoria"
- Preencha nome e descrição
- Salve

### 3. Cadastrar Produto
- Navegue para "Produtos"
- Clique em "Novo Produto"
- Preencha os dados e selecione uma categoria
- Salve

### 4. Registrar Lote
- Navegue para "Lotes"
- Clique em "Novo Lote"
- Selecione o produto
- Defina a quantidade inicial e data de entrada
- Preencha campos opcionais (validade, tamanho, voltagem)
- Salve - o código de barras será gerado automaticamente

### 5. Visualizar Etiqueta
- Navegue para "Etiquetas"
- Selecione o lote desejado
- Visualize a etiqueta com o código de barras
- Clique em "Imprimir Etiqueta" para imprimir

### 6. Registrar Movimentação
- Navegue para "Movimentações"
- Clique em "Nova Movimentação"
- Selecione o lote
- Escolha o tipo (ENTRADA/SAÍDA/AJUSTE_PERDA/AJUSTE_GANHO)
- Defina a quantidade
- Salve - a quantidade do lote será atualizada automaticamente

### 7. Gerenciar Usuários (ADMIN)
- Navegue para "Usuários" (visível apenas para ADMIN)
- Crie novos usuários definindo nome, email, senha e perfil
- Edite ou exclua usuários existentes

## 🔒 Controle de Acesso

### ADMIN
- Acesso total a todas as funcionalidades
- Gerenciamento de usuários
- Todas as operações CRUD

### VOLUNTARIO
- Acesso a Dashboard, Categorias, Produtos, Lotes, Movimentações e Etiquetas
- Sem acesso a gestão de usuários
- Todas as operações CRUD (exceto usuários)

## 📊 API Endpoints

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/usuarios` - Registro

### Categorias
- `GET /api/categorias` - Listar todas
- `POST /api/categorias` - Criar
- `PUT /api/categorias/{id}` - Atualizar
- `DELETE /api/categorias/{id}` - Deletar

### Produtos
- `GET /api/produtos` - Listar todos
- `GET /api/produtos/categoria/{id}` - Por categoria
- `POST /api/produtos` - Criar
- `PUT /api/produtos/{id}` - Atualizar
- `DELETE /api/produtos/{id}` - Deletar

### Lotes
- `GET /api/lotes` - Listar todos
- `GET /api/lotes/vencimento?dias={n}` - Próximos ao vencimento
- `POST /api/lotes` - Criar
- `PUT /api/lotes/{id}` - Atualizar
- `PATCH /api/lotes/{id}/quantidade` - Ajustar quantidade
- `DELETE /api/lotes/{id}` - Deletar

### Movimentações
- `GET /api/movimentacoes` - Listar todas
- `GET /api/movimentacoes/periodo?dataInicio=&dataFim=` - Por período
- `GET /api/movimentacoes/lote/{id}` - Por lote
- `POST /api/movimentacoes` - Criar
- `DELETE /api/movimentacoes/{id}` - Deletar

### Etiquetas
- `GET /api/etiquetas/lote/{id}` - Obter etiqueta PNG

### Usuários (ADMIN)
- `GET /api/usuarios` - Listar todos
- `GET /api/usuarios/{id}` - Por ID
- `PUT /api/usuarios/{id}` - Atualizar
- `DELETE /api/usuarios/{id}` - Deletar

## 📄 Documentação da API

A documentação completa está disponível no Swagger:

http://localhost:8080/swagger-ui.html

## 🛠️ Desenvolvimento

### Estrutura do Projeto

```
donation-system/
├── backend/
│   └── src/
│       └── main/
│           ├── java/com/ong/backend/
│           │   ├── config/         # Configurações (Security, DataInitializer)
│           │   ├── controllers/    # REST Controllers
│           │   ├── dto/            # DTOs (Request/Response)
│           │   ├── models/         # Entidades JPA
│           │   ├── repositories/   # Repositories
│           │   ├── security/       # JWT e segurança
│           │   └── services/       # Lógica de negócio
│           └── resources/
│               └── application.properties
├── frontend/
│   └── src/
│       ├── components/    # Componentes React
│       ├── contexts/      # Context API (Auth)
│       ├── pages/         # Páginas da aplicação
│       ├── services/      # Services para API
│       └── lib/           # Utils (axios, etc)
└── docker-compose.yml
```

## 🐛 Troubleshooting

### Erro de CORS
- Verifique se o backend está configurado com `cors()` no SecurityConfig
- Confirme que o frontend está usando `VITE_API_URL` correto

### Erro 401 (Unauthorized)
- Verifique se o token JWT está sendo enviado corretamente
- Faça login novamente
- Verifique se o token não expirou (24h)

### Banco de dados não conecta
- Verifique se o Docker está rodando: `docker ps`
- Reinicie os containers: `docker-compose restart`
- Verifique as credenciais no `application.properties`

### Etiqueta não carrega
- Certifique-se de que o lote tem um código de barras gerado
- Verifique se a API está respondendo: `GET /api/etiquetas/lote/{id}`
- Confira as permissões CORS

## 📝 Licença

Este projeto foi desenvolvido para fins educacionais e de gestão de ONGs.

## 👥 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.
#   d o n a t i o n - s y s t e m 
 
 