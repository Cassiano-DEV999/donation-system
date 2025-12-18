# 🤝 Guia de Contribuição

🌎 Idiomas: [Português (Brasil)](CONTRIBUTING.pt-BR.md) | [English](CONTRIBUTING.md)

Obrigado por querer contribuir com o Donation System! Todas as contribuições são bem-vindas.

## Como Contribuir

### 1. Fork e Clone
```bash
git clone https://github.com/SEU_USUARIO/donation-system.git
cd donation-system
```

### 2. Crie uma Branch
```bash
git checkout -b feature/sua-feature
# ou para correções
git checkout -b fix/descricao-bug
```

### 3. Faça suas Alterações

#### Estilo de Código
- Siga convenções Java e Google Java Style Guide
- Use nomes de variáveis significativos em português (consistentes com o código)
- Mantenha métodos focados e curtos (<30 linhas quando possível)
- Adicione Javadoc em métodos públicos

#### Exemplo
```java
/**
 * Recupera todos os produtos ativos filtrados por categoria.
 *
 * @param categoriaId identificador da categoria
 * @param pageable informações de paginação
 * @return página de produtos
 * @throws ResourceNotFoundException se a categoria não existir
 */
@GetMapping("/categoria/{id}")
public ResponseEntity<Page<ProdutoDTO>> getProdutosByCategoria(
    @PathVariable Long categoriaId,
    Pageable pageable) {
    // implementação
}
```

### 4. Testes
Inclua testes para suas mudanças:

```bash
# Todos os testes
./mvnw test

# Classe específica
./mvnw test -Dtest=ProdutoServiceTest

# Com cobertura
./mvnw jacoco:report
```

**Cobertura mínima**: 70% do novo código.

### 5. Mensagens de Commit
Use mensagens claras:
```
feat: add product search by category
fix: resolve null pointer in lote validation
docs: update API documentation for batch endpoints
test: add tests for payment processing
chore: update dependencies to latest versions
```
Formato: `<tipo>: <descrição>`
Tipos: `feat`, `fix`, `docs`, `test`, `chore`, `refactor`, `perf`

### 6. Push e Pull Request
```bash
git push origin feature/sua-feature
```
Depois, abra um PR com:
- Descrição clara das mudanças
- Issues relacionadas (se houver)
- Prints para mudanças de UI
- Informações de cobertura de testes

## Ambiente de Desenvolvimento

### Pré-requisitos
- Java 21 JDK
- Maven 3.8+
- Docker e Docker Compose
- PostgreSQL (ou use Docker)

### Setup Local
```bash
# Clonar
cd donation-system

# Backend
cd backend
./mvnw clean install
./mvnw spring-boot:run

# Frontend (novo terminal)
cd frontend
npm install
npm run dev
```

### Setup com Docker
```bash
cd backend
docker compose up -d
```
API: http://localhost:8080/api/swagger-ui.html

## Estrutura do Projeto
```
backend/
├── src/main/java/com/ong/backend/
│   ├── controllers/     # Endpoints REST
│   ├── services/        # Regras de negócio
│   ├── repositories/    # Acesso a dados
│   ├── models/          # Entidades JPA
│   ├── dto/             # DTOs
│   ├── security/        # Autenticação e autorização
│   ├── config/          # Configurações
│   └── exceptions/      # Exceções customizadas
├── src/test/            # Testes
├── pom.xml              # Dependências
└── docker-compose.yml   # Ambiente local

frontend/
├── src/
│   ├── components/      # Componentes reutilizáveis
│   ├── pages/           # Páginas
│   ├── features/        # Lógica por feature
│   ├── services/        # Serviços de API
│   └── hooks/           # Hooks React
├── package.json
└── Dockerfile
```

## Checklist de Code Review
Antes do PR, confirme:
- [ ] Código segue o style guide
- [ ] Todos os testes passam (`./mvnw test`)
- [ ] Sem erros/avisos no console
- [ ] Migrações de banco incluídas (se necessário)
- [ ] Documentação atualizada
- [ ] Nenhuma credencial no código
- [ ] Commits squash (se fizer sentido)
- [ ] Branch atualizada com main

## Convenções de API

### Resposta Padrão
```json
{
  "id": 1,
  "name": "Product Name",
  "createdAt": "2025-12-18T10:00:00Z",
  "updatedAt": "2025-12-18T10:00:00Z"
}
```

### Resposta de Erro
```json
{
  "status": 400,
  "message": "Validation error",
  "timestamp": "2025-12-18T10:00:00Z",
  "errors": {
    "field": "Field is required"
  }
}
```

### Paginação
```json
{
  "content": [...],
  "totalElements": 100,
  "totalPages": 10,
  "currentPage": 0,
  "pageSize": 10
}
```

## Reportar Problemas

### Bugs
Inclua:
- Descrição do bug
- Passos para reproduzir
- Comportamento esperado
- Comportamento atual
- Prints/logs (se houver)
- Ambiente (SO, versão do Java, etc.)

### Pedidos de Feature
Inclua:
- Descrição clara da feature
- Casos de uso e benefícios
- Possível implementação (opcional)
- Issues relacionadas (se houver)

## Ajuda

- 📖 [Documentação](README.md)
- 🔐 [Política de Segurança](SECURITY.md)
- 📝 [API Docs](http://localhost:8080/api/swagger-ui.html)
- 💬 [GitHub Issues](https://github.com/CassianoProenca/donation-system/issues)

## Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob MIT.

---

Obrigado por contribuir! 🎉
