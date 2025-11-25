# 🎁 Sistema de Gestão de Doações

Sistema completo para organizações não governamentais gerenciarem doações, controlarem estoque, rastrearem lotes e emitirem etiquetas com código de barras.  
Feito para simplificar a operação diária de ONGs e garantir organização, agilidade e rastreabilidade.

## ✨ Funcionalidades

- **Dashboard Interativo** com gráficos e métricas em tempo real
- **Categorias**: classificação de produtos por tipo
- **Produtos**: cadastro, edição e organização
- **Lotes**: controle de quantidade, validade, tamanho, voltagem e observações
- **Movimentações**: entradas, saídas, perdas e ajustes de estoque
- **Etiquetas**: geração automática de códigos de barras EAN-13 (PNG)
- **Autenticação JWT** com perfis ADMIN e VOLUNTARIO
- **Documentação da API** via Swagger/OpenAPI
- Totalmente **containerizado com Docker**

## 🧱 Tecnologias

### Backend
- **Spring Boot 3**
- **PostgreSQL**
- **Spring Security + JWT**
- **ZXing** (EAN-13)
- **OpenAPI/Swagger**
- **Docker**

### Frontend
- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **shadcn/ui**
- **Recharts**
- **React Router**
- **Axios**

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

```
donation-system/
├── backend/
│   ├── src/main/java/com/ong/backend/
│   │   ├── config/         # Security, CORS, OpenAPI
│   │   ├── controllers/    # REST Controllers
│   │   ├── dto/            # Request/Response
│   │   ├── exceptions/     # Exception Handler
│   │   ├── models/         # Entidades JPA
│   │   ├── repositories/   # JPA Repositories
│   │   ├── security/       # JWT Auth
│   │   └── services/       # Regras de negócio
│   └── resources/
│       └── application.properties
├── frontend/
│   └── src/
│       ├── components/
│       ├── contexts/
│       ├── pages/
│       ├── lib/
│       └── services/
└── docker-compose.yml
```

## 📱 Fluxo de Uso

1. **Login** — Acesse `/login` com `admin@ong.com` / `admin123`
2. **Criar Categoria** — Nome e descrição
3. **Cadastrar Produto** — Associado a uma categoria
4. **Registrar Lote** — Quantidade, validade, informações adicionais
5. **Gerar Etiqueta** — Código EAN-13 automático
6. **Movimentar Estoque** — Entradas, saídas, perdas e ajustes
7. **Gerenciar Usuários (ADMIN)** — Criar, editar e remover usuários

## 🔒 Perfis e Permissões

### ADMIN
- Acesso total
- CRUD completo
- Gerenciamento de usuários

### VOLUNTARIO
- Acesso ao sistema principal
- CRUD de categorias, produtos, lotes e movimentações
- Não gerencia usuários

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
