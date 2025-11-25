# Sistema de Gestão de Doações - ONG

Sistema completo para gerenciamento de doações de ONGs, desenvolvido com Spring Boot e React.

## 🚀 Tecnologias

### Backend
- **Spring Boot 3.5.8** - Framework Java
- **PostgreSQL 15** - Banco de dados
- **JWT** - Autenticação e autorização
- **ZXing** - Geração de códigos de barras EAN-13
- **Swagger/OpenAPI** - Documentação da API
- **Docker** - Containerização

### Frontend
- **React 19.2.0** - Framework JavaScript
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Tailwind CSS** - Estilização
- **shadcn/ui** - Biblioteca de componentes
- **React Router** - Roteamento
- **Axios** - Cliente HTTP

## 📋 Funcionalidades

### Autenticação
- Login com email/senha
- Registro de novos usuários
- JWT com informações do usuário (id, nome, perfil)
- Controle de acesso baseado em perfis (ADMIN/VOLUNTARIO)

### Dashboard
- Estatísticas em tempo real:
  - Total de categorias
  - Total de produtos
  - Total de lotes
  - Movimentações do dia
  - Produtos com estoque baixo
  - Lotes próximos ao vencimento

### Gestão de Categorias
- Listar todas as categorias
- Criar nova categoria
- Editar categoria existente
- Excluir categoria

### Gestão de Produtos
- Listar todos os produtos
- Criar novo produto (com categoria)
- Editar produto existente
- Excluir produto
- Código de barras do fabricante (opcional)

### Gestão de Lotes
- Listar todos os lotes
- Criar novo lote com:
  - Produto associado
  - Quantidade inicial
  - Data de entrada
  - Data de validade (opcional - alimentos)
  - Tamanho (opcional - roupas)
  - Voltagem (opcional - eletrônicos)
  - Observações
- Editar lote (incluindo quantidade atual)
- Excluir lote
- Código de barras EAN-13 gerado automaticamente

### Gestão de Movimentações
- Listar movimentações
- Registrar nova movimentação:
  - ENTRADA - Entrada de produtos
  - SAÍDA - Saída de produtos
  - AJUSTE_PERDA - Ajuste por perda
  - AJUSTE_GANHO - Ajuste por ganho
- Filtros por:
  - Período (data início/fim)
  - Tipo de movimentação
  - Lote específico
- Atualização automática da quantidade do lote

### Etiquetas
- Visualizar etiqueta de lote com código de barras
- Selecionar lote por produto
- Imprimir etiqueta

### Gestão de Usuários (ADMIN)
- Listar todos os usuários
- Criar novo usuário
- Editar usuário (incluindo troca de perfil)
- Excluir usuário
- Perfis: ADMIN e VOLUNTARIO

## 🔧 Configuração

### Requisitos
- Java 17+
- Docker e Docker Compose
- Node.js 18+
- npm ou yarn

### Banco de Dados

O sistema utiliza PostgreSQL via Docker. Configure as credenciais no `docker-compose.yml`:

```yaml
environment:
  POSTGRES_DB: ong_db
  POSTGRES_USER: ong_user
  POSTGRES_PASSWORD: ong_password
```

### Backend

1. Configure o arquivo `backend/src/main/resources/application.properties`:

```properties
spring.application.name=backend

# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/ong_db
spring.datasource.username=ong_user
spring.datasource.password=ong_password

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true

# JWT Secret
jwt.secret=your-secret-key-here-make-it-long-and-secure
jwt.expiration=86400000

# Swagger
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
```

2. O DataInitializer criará automaticamente 2 usuários admin:
   - **Email:** admin@ong.com | **Senha:** admin123
   - **Email:** admin2@ong.com | **Senha:** admin123

### Frontend

1. Configure o arquivo `frontend/.env`:

```env
VITE_API_URL=http://localhost:8080
```

## 🚀 Executando o Projeto

### Com Docker (Recomendado)

1. **Inicie o banco de dados e o backend:**

```bash
docker-compose up -d
```

2. **Inicie o frontend (em outro terminal):**

```bash
cd frontend
npm install
npm run dev
```

3. **Acesse:**
   - Frontend: http://localhost:5173
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
#   d o n a t i o n - s y s t e m  
 