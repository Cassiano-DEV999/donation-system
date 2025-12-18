# 📋 Changelog

🌎 Idiomas: [Português (Brasil)](CHANGELOG.pt-BR.md) | [English](CHANGELOG.md)

Todas as alterações relevantes deste projeto são documentadas aqui.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e usamos [Versionamento Semântico](https://semver.org/lang/pt-BR/spec/v2.0.0.html).

## [1.0.0] - 2025-12-18

### Adicionado
- Primeira versão pública do Donation System
- Sistema completo de gestão de doações para ONGs
- Dashboard com métricas e alertas em tempo real
- Gestão de produtos e lotes em estoque
- Controle avançado de estoque com acompanhamento de validade
- Autenticação e autorização com JWT
- Geração de códigos de barras (EAN-13) para etiquetas
- Exportação em PDF de etiquetas em lote
- Painel administrativo para gestão de usuários
- UI responsiva para desktop, tablet e mobile
- Containerização com Docker para deploy simples
- Documentação via OpenAPI/Swagger
- Banco PostgreSQL com Hibernate ORM
- Suíte de testes abrangente

### Funcionalidades
#### Backend
- **Segurança**: autenticação JWT com perfis ADMIN/VOLUNTARIO
- **APIs**: endpoints RESTful com paginação e filtros
- **Banco**: PostgreSQL com JPA/Hibernate
- **Documentação**: integração OpenAPI/Swagger
- **Cache**: cache simples para dados acessados com frequência
- **Validação**: validação de entrada com Spring Validation
- **Tratamento de Erros**: handler global com mensagens claras
- **Actuator**: health checks e métricas

#### Frontend
- **Dashboard**: métricas em tempo real, alertas e gráficos
- **Design Responsivo**: abordagem mobile-first com Tailwind CSS
- **Filtros Interativos**: filtros avançados e datas
- **Navegação**: filtros via URL acionados por alertas do dashboard
- **UI Components**: biblioteca shadcn/ui
- **Ícones**: Tabler Icons
- **Type Safety**: código totalmente em TypeScript

### Técnico
- **Java 21 LTS**
- **Spring Boot 3.5.9**
- **React 19**
- **TypeScript**
- **Docker**
- **Maven**

### Documentação
- README com lista de features
- SECURITY.md com diretrizes de segurança
- CONTRIBUTING.md com guia de contribuição
- CHANGELOG.md (este arquivo) para histórico
- API documentada via Swagger
- Javadoc no código

## Roteiro Futuro

### Versão 1.1.0 (Planejada)
- [ ] Autenticação em dois fatores (2FA)
- [ ] Emails para alertas críticos
- [ ] Relatórios e analytics avançados
- [ ] Suporte a multi-tenancy
- [ ] Exportar dados para Excel/CSV
- [ ] Webhooks para integrações
- [ ] Modo escuro no UI

### Versão 1.2.0 (Planejada)
- [ ] App mobile (React Native)
- [ ] Modo offline para campo
- [ ] Geração/leitura de QR Code
- [ ] Previsão de estoque (IA)
- [ ] Controle e analytics de orçamento
- [ ] Histórico de doações por item
- [ ] Gestão de API keys para integrações

### Backlog
- [ ] Internacionalização (i18n)
- [ ] Acessibilidade (WCAG 2.1 AA)
- [ ] Otimização de performance (CDN)
- [ ] Auditoria de logs para compliance
- [ ] RBAC detalhado
- [ ] Alternativa GraphQL
- [ ] Fila de mensagens (RabbitMQ)
- [ ] Camada de cache Redis

## Suporte

Para bugs e solicitações, use [GitHub Issues](https://github.com/CassianoProenca/donation-system/issues).

## Contribuidores

- Cassiano Proença ([@CassianoProenca](https://github.com/CassianoProenca)) - Criador e mantenedor

---

**Última atualização**: 2025-12-18
