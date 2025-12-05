# 🎁 Sistema de Gestão de Doações

Sistema completo para organizações não governamentais gerenciarem doações, controlarem estoque, rastrearem lotes e emitirem etiquetas com código de barras.  
Feito para simplificar a operação diária de ONGs e garantir organização, agilidade e rastreabilidade.

## ✨ Funcionalidades

### 📊 Dashboard e Métricas

- **Dashboard Interativo** com métricas em tempo real
- **Alertas Críticos**: lotes vencendo, estoque baixo, produtos sem estoque
- **Evolução de Estoque**: gráfico dos últimos 30 dias
- **Top 5 Produtos Mais Distribuídos**

### 🏷️ Gestão de Produtos

- **Categorias**: classificação de produtos por tipo (com ícones)
- **Produtos**: cadastro individual ou kits compostos
- **Filtros Avançados**: por nome, categoria, tipo (produto/kit)
- **Sistema de Kits**: monte kits automaticamente consumindo componentes do estoque

### 📦 Controle de Estoque

- **Lotes**: controle de quantidade, validade, tamanho, voltagem e observações
- **Movimentações**: entradas, saídas, perdas e ajustes de estoque
- **Entrada Rápida de Doações**: registre múltiplos itens de uma só vez
- **Etiquetas**: geração automática de códigos de barras EAN-13 (PNG e PDF em massa)
- **Rastreabilidade Completa**: histórico de todas movimentações

### 🔐 Segurança e Usuários

- **Autenticação JWT** com perfis ADMIN e VOLUNTARIO
- **Gerenciamento de Usuários**: criação, edição, exclusão (apenas ADMIN)
- **Controle de Acesso**: rotas protegidas por perfil

### 🛠️ Infraestrutura

- **Documentação da API** via Swagger/OpenAPI
- Totalmente **containerizado com Docker**
- **Responsivo**: funciona perfeitamente em desktop, tablet e mobile

## 🧱 Tecnologias

### Backend

- **Spring Boot 3**
- **PostgreSQL**
- **Spring Security + JWT**
- **ZXing** (EAN-13)
- **OpenAPI/Swagger**
- **Docker**

### Frontend

- **React 19** com TypeScript
- **Vite** para build otimizado
- **TanStack React Query** para gerenciamento de estado do servidor
- **React Router** v7 para roteamento
- **Tailwind CSS** + **shadcn/ui** para UI components
- **Recharts** para visualização de dados
- **Tabler Icons** para ícones
- **Sonner** para notificações toast
- **Feature-Sliced Design** (arquitetura modular)

## 🚀 Como Rodar o Projeto

### 1) Pré-requisitos

- Docker + Docker Compose
- Node.js 18+
- Java 17+
- Git

### 2) Configuração do .env (IMPORTANTE)

No backend:

```bash
cd backend
cp .env.example .env
```

Configure:

- `JWT_SECRET`
- Credenciais do banco (caso altere)

### 3) Rodando com Docker (recomendado)

#### Backend

```bash
cd backend
docker compose up --build -d
```

Backend disponível em: **http://localhost:8080**

**Usuários padrão:**

- `admin@ong.com` / `admin123`
- `admin2@ong.com` / `admin123`

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: **http://localhost:5173**

### 4) Rodando sem Docker

#### Backend

```bash
cd backend
cp .env.example .env
./mvnw spring-boot:run
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📚 Documentação da API

**Swagger UI:**

👉 **http://localhost:8080/swagger-ui/index.html**

## 🏗️ Estrutura do Projeto

### Backend

```
backend/
├── src/main/java/com/ong/backend/
│   ├── config/           # Security, CORS, OpenAPI, DataInitializer
│   ├── controllers/      # REST Controllers
│   ├── dto/              # Request/Response DTOs
│   ├── exceptions/       # Global Exception Handler
│   ├── models/           # Entidades JPA
│   ├── repositories/     # JPA Repositories
│   ├── security/         # JWT Authentication & Authorization
│   ├── services/         # Regras de negócio
│   └── specifications/   # JPA Specifications para filtros
└── resources/
    └── application.properties
```

### Frontend (Feature-Sliced Design)

```
frontend/
└── src/
    ├── features/              # Features isoladas
    │   ├── auth/              # Autenticação
    │   │   ├── api/           # Hooks react-query
    │   │   ├── components/    # Componentes específicos
    │   │   ├── hooks/         # Hooks customizados
    │   │   └── types/         # TypeScript types
    │   ├── categorias/
    │   ├── doacoes/
    │   ├── lotes/
    │   ├── movimentacoes/
    │   ├── produtos/
    │   └── usuarios/
    ├── shared/                # Recursos compartilhados
    │   ├── api/               # API client configurado
    │   ├── components/        # Componentes reutilizáveis
    │   │   ├── data-display/  # Pagination, LoadingSpinner, EmptyState
    │   │   ├── forms/         # SearchInput
    │   │   └── layout/        # AppLayout, PageCard
    │   ├── hooks/             # usePagination, useDebounce, useFilters
    │   ├── lib/               # Utilitários (formatters)
    │   └── types/             # Types globais
    ├── pages/                 # Páginas da aplicação
    ├── components/            # Componentes UI (shadcn/ui)
    └── services/              # Serviços auxiliares
```

## 📱 Fluxo de Uso

1. **Login** — Acesse `/login` com `admin@ong.com` / `admin123`
2. **Dashboard** — Visualize métricas e alertas críticos
3. **Criar Categoria** — Nome, descrição e ícone
4. **Cadastrar Produto** — Produto individual ou kit composto
5. **Registrar Doação** — Use "Entrada Rápida" para múltiplos itens
6. **Gerar Etiquetas** — Código EAN-13 automático (PNG ou PDF em massa)
7. **Movimentar Estoque** — Entradas, saídas, perdas e ajustes
8. **Montar Kits** — Monte kits consumindo componentes automaticamente
9. **Gerenciar Usuários (ADMIN)** — Criar, editar e remover usuários

## 🔒 Perfis e Permissões

### ADMIN

- ✅ Acesso total ao sistema
- ✅ CRUD completo de todas entidades
- ✅ Gerenciamento de usuários
- ✅ Visualização de métricas e relatórios

### VOLUNTARIO

- ✅ Acesso ao dashboard e métricas
- ✅ CRUD de categorias, produtos, lotes
- ✅ Registro de doações e movimentações
- ✅ Geração de etiquetas
- ✅ Montagem de kits
- ❌ **Não** gerencia usuários

## 🤝 Contribuindo

1. Faça um **fork**
2. Crie uma branch:
   ```bash
   git checkout -b feature/minha-feature
   ```
3. Commit:
   ```bash
   git commit -m "feat: minha melhoria"
   ```
4. Push e **Pull Request**

## 🐛 Reporte Problemas

Abra uma [issue](https://github.com/Cassiano-DEV999/donation-system/issues) com:

- Descrição clara
- Como reproduzir
- Resultado esperado
- Print(s) se possível

## 📄 Licença

MIT — veja o arquivo `LICENSE`.

## 👨‍💻 Autor

**Cassiano Melo**

- GitHub: [Cassiano-DEV999](https://github.com/Cassiano-DEV999)
- Email: cassianomeloprofissional@gmail.com

---

⭐ **Se este projeto foi útil, considere dar uma estrela no repositório!**
