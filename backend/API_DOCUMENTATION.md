# Sistema de Doações - Backend API

Sistema completo de gerenciamento de doações para ONGs com controle de estoque, rastreabilidade e geração de etiquetas com código de barras.

## 🚀 Tecnologias

- Java 17
- Spring Boot 3.5.8
- Spring Security + JWT
- PostgreSQL
- JPA/Hibernate
- ZXing (Geração de códigos de barras)
- Lombok

## 📋 Pré-requisitos

- Java 17+
- Maven 3.8+
- PostgreSQL 15+
- Docker (opcional)

## ⚙️ Configuração

### 1. Banco de Dados

Execute o PostgreSQL via Docker:

```bash
cd ..
docker-compose up -d
```

Ou configure manualmente no `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ong_db
spring.datasource.username=admin
spring.datasource.password=admin
```

### 2. Compilar e Executar

```bash
mvn clean install
mvn spring-boot:run
```

A API estará disponível em `http://localhost:8080`

## 🔐 Autenticação

O sistema usa JWT (JSON Web Token) para autenticação.

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@ong.com",
  "senha": "senha123"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tipo": "Bearer",
  "usuarioId": 1,
  "nome": "Admin",
  "email": "admin@ong.com",
  "perfil": "ADMIN"
}
```

### Usar Token

Inclua o token no header de todas as requisições:

```
Authorization: Bearer {seu-token-aqui}
```

## 📚 Endpoints da API

### 🔑 Autenticação

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/api/auth/login` | Login do usuário | Não |

### 👥 Usuários

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/api/usuarios` | Listar todos | ADMIN |
| GET | `/api/usuarios/simples` | Listar (versão simples) | ADMIN |
| GET | `/api/usuarios/{id}` | Buscar por ID | ADMIN |
| GET | `/api/usuarios/email/{email}` | Buscar por email | ADMIN |
| POST | `/api/usuarios` | Criar usuário | Público |
| PUT | `/api/usuarios/{id}` | Atualizar | ADMIN |
| DELETE | `/api/usuarios/{id}` | Deletar | ADMIN |

### 📦 Categorias

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/api/categorias` | Listar todas | ADMIN/VOLUNTARIO |
| GET | `/api/categorias/simples` | Listar (versão simples) | ADMIN/VOLUNTARIO |
| GET | `/api/categorias/{id}` | Buscar por ID | ADMIN/VOLUNTARIO |
| POST | `/api/categorias` | Criar categoria | ADMIN/VOLUNTARIO |
| PUT | `/api/categorias/{id}` | Atualizar | ADMIN/VOLUNTARIO |
| DELETE | `/api/categorias/{id}` | Deletar | ADMIN |

### 🛍️ Produtos

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/api/produtos` | Listar todos | ADMIN/VOLUNTARIO |
| GET | `/api/produtos/simples` | Listar (versão simples) | ADMIN/VOLUNTARIO |
| GET | `/api/produtos/{id}` | Buscar por ID | ADMIN/VOLUNTARIO |
| GET | `/api/produtos/{id}/detalhes` | Detalhes + estoque total | ADMIN/VOLUNTARIO |
| GET | `/api/produtos/categoria/{id}` | Buscar por categoria | ADMIN/VOLUNTARIO |
| GET | `/api/produtos/buscar?nome={nome}` | Buscar por nome | ADMIN/VOLUNTARIO |
| POST | `/api/produtos` | Criar produto | ADMIN/VOLUNTARIO |
| PUT | `/api/produtos/{id}` | Atualizar | ADMIN/VOLUNTARIO |
| DELETE | `/api/produtos/{id}` | Deletar | ADMIN |

### 📊 Lotes

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/api/lotes` | Listar todos | ADMIN/VOLUNTARIO |
| GET | `/api/lotes/simples` | Listar (versão simples) | ADMIN/VOLUNTARIO |
| GET | `/api/lotes/{id}` | Buscar por ID | ADMIN/VOLUNTARIO |
| GET | `/api/lotes/{id}/detalhes` | Detalhes + movimentações | ADMIN/VOLUNTARIO |
| GET | `/api/lotes/produto/{id}` | Buscar por produto | ADMIN/VOLUNTARIO |
| GET | `/api/lotes/vencimento?dias={dias}` | Próximos ao vencimento | ADMIN/VOLUNTARIO |
| GET | `/api/lotes/estoque` | Lotes com estoque | ADMIN/VOLUNTARIO |
| POST | `/api/lotes` | Criar lote | ADMIN/VOLUNTARIO |
| PUT | `/api/lotes/{id}` | Atualizar | ADMIN/VOLUNTARIO |
| DELETE | `/api/lotes/{id}` | Deletar | ADMIN |

### 🔄 Movimentações

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/api/movimentacoes` | Listar todas | ADMIN/VOLUNTARIO |
| GET | `/api/movimentacoes/simples` | Listar (versão simples) | ADMIN/VOLUNTARIO |
| GET | `/api/movimentacoes/{id}` | Buscar por ID | ADMIN/VOLUNTARIO |
| GET | `/api/movimentacoes/{id}/detalhes` | Detalhes + quantidades | ADMIN/VOLUNTARIO |
| GET | `/api/movimentacoes/lote/{id}` | Buscar por lote | ADMIN/VOLUNTARIO |
| GET | `/api/movimentacoes/usuario/{id}` | Buscar por usuário | ADMIN/VOLUNTARIO |
| GET | `/api/movimentacoes/tipo/{tipo}` | Buscar por tipo | ADMIN/VOLUNTARIO |
| GET | `/api/movimentacoes/periodo?inicio={}&fim={}` | Buscar por período | ADMIN/VOLUNTARIO |
| POST | `/api/movimentacoes` | Registrar movimentação | ADMIN/VOLUNTARIO |
| DELETE | `/api/movimentacoes/{id}` | Deletar | ADMIN |

### 🏷️ Etiquetas

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/api/etiquetas/lote/{id}` | Gerar etiqueta PNG | ADMIN/VOLUNTARIO |

## 📝 Exemplos de Uso

### 1. Criar Categoria

```http
POST /api/categorias
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Alimentos",
  "descricao": "Produtos alimentícios"
}
```

### 2. Criar Produto

```http
POST /api/produtos
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Arroz Tipo 1",
  "descricao": "Arroz branco 1kg",
  "codigoBarrasFabricante": "7891234567890",
  "categoriaId": 1
}
```

### 3. Criar Lote (Entrada de Doação)

```http
POST /api/lotes
Authorization: Bearer {token}
Content-Type: application/json

{
  "produtoId": 1,
  "quantidadeInicial": 50,
  "dataEntrada": "2024-11-24",
  "dataValidade": "2025-11-24",
  "observacoes": "Doação da Empresa X"
}
```

### 4. Registrar Saída

```http
POST /api/movimentacoes
Authorization: Bearer {token}
Content-Type: application/json

{
  "loteId": 1,
  "usuarioId": 1,
  "tipo": "SAIDA",
  "quantidade": 10
}
```

### 5. Gerar Etiqueta

```http
GET /api/etiquetas/lote/1
Authorization: Bearer {token}
```

Retorna uma imagem PNG para impressão.

## 🔒 Tipos de Movimentação

- `ENTRADA` - Entrada de doações
- `SAIDA` - Saída/distribuição
- `AJUSTE_GANHO` - Ajuste positivo de estoque
- `AJUSTE_PERDA` - Ajuste negativo (perdas, vencimento)

## 👤 Perfis de Usuário

- `ADMIN` - Acesso total (CRUD completo)
- `VOLUNTARIO` - Pode criar/editar, mas não deletar

## 🏗️ Estrutura do Código

```
backend/
├── src/main/java/com/ong/backend/
│   ├── config/          # Configurações (Security, CORS)
│   ├── controllers/     # REST Controllers
│   ├── dto/            # Data Transfer Objects
│   ├── exceptions/     # Exception Handling
│   ├── models/         # Entidades JPA
│   ├── repositories/   # Repositories JPA
│   ├── security/       # JWT e Security
│   └── services/       # Lógica de negócio
└── src/main/resources/
    └── application.properties
```

## 🔍 Validações Automáticas

- Email único para usuários
- Nome único para categorias
- Validação de estoque nas saídas
- Código de barras EAN-13 gerado automaticamente para lotes
- Hash de senha com BCrypt
- Validação de campos obrigatórios via Bean Validation

## 🐛 Tratamento de Erros

Todas as respostas de erro seguem o formato:

```json
{
  "status": 404,
  "message": "Produto não encontrado com id: 999",
  "timestamp": "2024-11-24T10:30:00"
}
```

Erros de validação:

```json
{
  "status": 400,
  "message": "Erro de validação",
  "timestamp": "2024-11-24T10:30:00",
  "errors": {
    "nome": "Nome é obrigatório",
    "email": "Email deve ser válido"
  }
}
```

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.
