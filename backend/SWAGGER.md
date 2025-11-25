# Sistema de Doações - Swagger UI

## 📚 **Swagger Adicionado com Sucesso!**

### 🚀 **Acessar Documentação Interativa:**

Após iniciar a aplicação, acesse:

- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **OpenAPI JSON:** http://localhost:8080/api-docs

### 🔐 **Como Usar:**

1. **Fazer Login:**
   - Use o endpoint `/api/auth/login` no Swagger
   - Copie o `token` da resposta

2. **Autorizar no Swagger:**
   - Clique no botão **"Authorize"** (cadeado) no topo
   - Cole o token no campo (sem prefixo "Bearer")
   - Clique em **"Authorize"**

3. **Testar Endpoints:**
   - Todos os endpoints agora estarão autenticados
   - Use "Try it out" para testar diretamente

### 📋 **Recursos do Swagger:**

✅ **Documentação automática** de todos os endpoints  
✅ **Teste interativo** direto no navegador  
✅ **Autenticação JWT** integrada  
✅ **Validações** de request/response  
✅ **Exemplos** de payloads  
✅ **Schemas** dos DTOs  

### ⚙️ **Configurações:**

No `application.properties`:

```properties
# Swagger/OpenAPI
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html
springdoc.swagger-ui.operationsSorter=method
springdoc.swagger-ui.tagsSorter=alpha
springdoc.swagger-ui.tryItOutEnabled=true
```

### 🔧 **Personalizações Feitas:**

- ✅ JWT configurado automaticamente
- ✅ Endpoints do Swagger liberados no Security
- ✅ Ordenação por método e tags
- ✅ Informações da API (título, versão, contato)

### 📝 **Exemplo de Uso:**

1. Acesse http://localhost:8080/swagger-ui.html
2. Vá até **auth-controller** → `/api/auth/login`
3. Clique em **"Try it out"**
4. Cole o JSON:
   ```json
   {
     "email": "admin@ong.com",
     "senha": "senha123"
   }
   ```
5. Clique em **"Execute"**
6. Copie o `token` da resposta
7. Clique no botão **"Authorize"** no topo
8. Cole o token e autorize
9. Agora teste qualquer endpoint protegido!

### 🎨 **Interface Swagger:**

O Swagger UI mostra:
- **Controllers** agrupados por funcionalidade
- **Métodos HTTP** com cores (GET=azul, POST=verde, DELETE=vermelho)
- **Schemas** de todos os DTOs
- **Validações** dos campos
- **Exemplos** de requisições

Agora sua API está totalmente documentada e testável! 🎉
