# 🔐 Política de Segurança

🌎 Idiomas: [Português (Brasil)](SECURITY.pt-BR.md) | [English](SECURITY.md)

## Relato de Vulnerabilidades

Se você encontrar uma vulnerabilidade, envie um email para **cassianomeloprofissional@gmail.com** em vez de usar o issue tracker.

Inclua, se possível:
- Descrição do problema
- Passos para reproduzir
- Impacto potencial
- Sugestões de correção

Levamos segurança a sério e responderemos rapidamente.

## Boas Práticas de Segurança

### Configuração do JWT
- **CRÍTICO**: altere a variável `jwt.secret` em produção
- A chave padrão é apenas para desenvolvimento
- Use uma chave forte e aleatória (mínimo recomendado: 256 bits)

### Variáveis de Ambiente (produção)
```bash
JWT_SECRET=sua-chave-forte-aqui
JWT_ACCESS_TOKEN_EXPIRATION=1800000
JWT_REFRESH_TOKEN_EXPIRATION=604800000
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/ong_db
SPRING_DATASOURCE_USERNAME=usuario_seguro
SPRING_DATASOURCE_PASSWORD=senha_forte
LOG_LEVEL=INFO
SPRING_JPA_DDL_AUTO=validate
```

### Segurança do Banco
- Nunca faça commit de credenciais
- Use PostgreSQL com senhas fortes
- Habilite SSL para conexões
- Mantenha backups criptografados

### Segurança da API
- Todas as rotas exigem JWT (exceto `/auth/login` e `/auth/signup`)
- Revise a lista de origens permitidas (CORS)
- Recomende limitar requisições (rate limiting) em produção
- Use apenas HTTPS em produção

### Segurança do Código
- Mantenha dependências atualizadas
- Use SonarQube/ferramentas similares para análise
- Valide todas as entradas com Spring Validation
- Prevenção de SQL injection via JPA com parâmetros

## Segurança de Dependências

Para verificar vulnerabilidades conhecidas:
```bash
./mvnw org.owasp:dependency-check-maven:check
```

## Versões Suportadas

- **Versão Atual**: 1.0.0
- **Java Mínimo**: 21 LTS
- **Spring Boot**: 3.5.9+

## Avisos de Segurança

Confira este arquivo regularmente para atualizações e avisos.

Última atualização: 2025-12-18
