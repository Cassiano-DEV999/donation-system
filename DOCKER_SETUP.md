# Sistema de Doações - Guia de Configuração Docker

## 🚀 Início Rápido

### 1. Configurar variáveis de ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Edite o `.env` e ajuste os valores conforme necessário (especialmente o `JWT_SECRET` em produção).

### 2. Subir os containers

```bash
docker-compose up -d
```

Isso irá:
- Criar o banco PostgreSQL
- Compilar e executar a API Spring Boot
- Configurar a rede entre os containers

### 3. Verificar logs

```bash
# Ver logs da API
docker-compose logs -f backend

# Ver logs do banco
docker-compose logs -f db
```

### 4. Parar os containers

```bash
docker-compose down
```

### 5. Reconstruir após mudanças no código

```bash
docker-compose down
docker-compose up --build -d
```

## 📝 Variáveis de Ambiente

### Banco de Dados
- `POSTGRES_USER` - Usuário do PostgreSQL
- `POSTGRES_PASSWORD` - Senha do PostgreSQL
- `POSTGRES_DB` - Nome do banco de dados
- `POSTGRES_PORT` - Porta exposta (padrão: 5432)

### API Spring Boot
- `SPRING_DATASOURCE_URL` - URL de conexão JDBC
- `SPRING_DATASOURCE_USERNAME` - Usuário do banco
- `SPRING_DATASOURCE_PASSWORD` - Senha do banco
- `JWT_SECRET` - Chave secreta para JWT (MUDE EM PRODUÇÃO!)
- `JWT_EXPIRATION` - Tempo de expiração do token em ms (padrão: 24h)
- `SERVER_PORT` - Porta da API (padrão: 8080)

## 🔧 Desenvolvimento Local (sem Docker)

Se preferir rodar localmente sem Docker:

1. Suba apenas o PostgreSQL:
```bash
docker-compose up db -d
```

2. Configure o `.env` do backend para usar `localhost`:
```bash
cd backend
cp .env.example .env
```

Edite o arquivo e mude:
```
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/ong_db
```

3. Execute a aplicação:
```bash
cd backend
./mvnw spring-boot:run
```

## 📡 Endpoints Disponíveis

Após subir os containers, a API estará disponível em:

- **API:** http://localhost:8080
- **PostgreSQL:** localhost:5432

### Teste se está funcionando:

```bash
curl http://localhost:8080/api/categorias
```

Deve retornar 401 (não autorizado) se estiver funcionando.

## 🔍 Troubleshooting

### Erro de conexão com banco

```bash
# Verifique se o banco está saudável
docker-compose ps

# Reinicie os containers
docker-compose restart
```

### Aplicação não inicia

```bash
# Veja os logs detalhados
docker-compose logs backend

# Verifique se as variáveis estão corretas
docker-compose config
```

### Recriar tudo do zero

```bash
docker-compose down -v
docker-compose up --build -d
```

O `-v` remove os volumes (dados do banco serão perdidos).

## 🔐 Segurança

⚠️ **IMPORTANTE:** Em produção:

1. Mude o `JWT_SECRET` para uma chave forte e única
2. Use senhas fortes para o PostgreSQL
3. Não commite o arquivo `.env` no git
4. Configure HTTPS/SSL
5. Use secrets managers (AWS Secrets, Azure Key Vault, etc)

## 📚 Estrutura dos Arquivos

```
donation-system/
├── .env                      # Variáveis de ambiente (não commitar)
├── .env.example              # Exemplo de configuração
├── docker-compose.yml        # Orquestração dos containers
├── backend/
│   ├── .env                  # Variáveis locais backend (não commitar)
│   ├── Dockerfile           # Build da aplicação Spring Boot
│   └── src/main/resources/
│       └── application.properties  # Lê variáveis do .env
```
