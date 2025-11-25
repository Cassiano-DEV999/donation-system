# Guia de Teste - Correções Implementadas

## ✅ Problemas Corrigidos

### 1. Sidebar não navegava para as páginas
**Solução:** Adicionado `Link` do React Router no componente `nav-main.tsx`

### 2. Reload da página voltava para o login mesmo com token
**Solução:** 
- Token JWT agora é decodificado automaticamente no `AuthContext`
- Informações do usuário (id, nome, email, perfil) são extraídas do token
- Não precisa mais armazenar objeto `user` no localStorage

### 3. Remover 'user' do localStorage
**Solução:**
- Removida chave `user` do localStorage
- Apenas o `token` é armazenado
- Dados do usuário são extraídos do token JWT quando necessário

## 🧪 Como Testar

### Teste 1: Navegação da Sidebar
1. Faça login: `admin@ong.com` / `admin123`
2. Clique em cada item do menu lateral:
   - Dashboard
   - Categorias
   - Produtos
   - Lotes
   - Movimentações
   - Etiquetas
   - Usuários (só aparece para ADMIN)
3. ✅ Deve navegar para cada página sem problemas

### Teste 2: Persistência após Reload
1. Faça login: `admin@ong.com` / `admin123`
2. Navegue para qualquer página (ex: Categorias)
3. Pressione F5 ou Ctrl+R para recarregar a página
4. ✅ Deve permanecer logado e na mesma página

### Teste 3: Verificar localStorage
1. Faça login
2. Abra o DevTools (F12)
3. Vá em "Application" > "Local Storage" > "http://localhost:5173"
4. ✅ Deve ver apenas a chave `token` (não deve ter `user`)

### Teste 4: Decodificação do Token
1. Com o navegador aberto e logado, abra o Console (F12)
2. Execute:
```javascript
// Visualizar o token
localStorage.getItem('token')

// Decodificar manualmente
const token = localStorage.getItem('token');
const payload = token.split('.')[1];
JSON.parse(atob(payload))
```
3. ✅ Deve mostrar: `userId`, `nome`, `sub` (email), `perfil`

### Teste 5: Logout e Limpeza
1. Faça login
2. Clique no avatar no canto inferior da sidebar
3. Clique em "Sair"
4. Verifique o localStorage (F12 > Application)
5. ✅ Não deve ter `token` nem `user`
6. ✅ Deve redirecionar para `/login`

## 📋 Checklist de Funcionalidades

- [x] Sidebar navega entre páginas
- [x] Reload mantém usuário logado
- [x] Token JWT é decodificado automaticamente
- [x] localStorage contém apenas `token`
- [x] Usuário é reconstruído do token no reload
- [x] Logout limpa o token
- [x] Links do menu lateral funcionam com React Router
- [x] Menu "Usuários" só aparece para ADMIN
- [x] ProtectedRoute verifica autenticação corretamente

## 🔍 Estrutura do Token JWT

O token agora contém:
```json
{
  "sub": "admin@ong.com",      // email do usuário
  "userId": 1,                  // ID do usuário
  "nome": "Admin",              // Nome do usuário
  "perfil": "ADMIN",            // Perfil (ADMIN ou VOLUNTARIO)
  "iat": 1234567890,            // Issued at
  "exp": 1234654290             // Expiration
}
```

## ⚠️ Observações

1. **Segurança**: O token JWT está em localStorage (não é o mais seguro, mas é funcional)
2. **Expiração**: Token expira em 24h (configurado no backend)
3. **Refresh**: Não há refresh token - usuário precisa fazer login novamente após 24h
4. **CORS**: Certifique-se de que o backend está rodando e configurado para aceitar requests do frontend

## 🚀 Testando Tudo de uma Vez

Execute este script no Console do navegador (F12) após fazer login:

```javascript
console.clear();
console.log('=== TESTE DE AUTENTICAÇÃO ===\n');

// 1. Verificar token no localStorage
const token = localStorage.getItem('token');
console.log('1. Token existe:', !!token ? '✅ SIM' : '❌ NÃO');

// 2. Verificar que 'user' NÃO existe
const user = localStorage.getItem('user');
console.log('2. Chave "user" removida:', !user ? '✅ SIM' : '❌ NÃO (ainda existe)');

// 3. Decodificar token
if (token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('3. Token decodificado:', '✅ SUCESSO');
    console.log('   - Email:', payload.sub);
    console.log('   - ID:', payload.userId);
    console.log('   - Nome:', payload.nome);
    console.log('   - Perfil:', payload.perfil);
  } catch (e) {
    console.log('3. Token decodificado:', '❌ ERRO');
  }
}

console.log('\n=== FIM DO TESTE ===');
```

Resultado esperado:
```
=== TESTE DE AUTENTICAÇÃO ===

1. Token existe: ✅ SIM
2. Chave "user" removida: ✅ SIM
3. Token decodificado: ✅ SUCESSO
   - Email: admin@ong.com
   - ID: 1
   - Nome: Admin
   - Perfil: ADMIN

=== FIM DO TESTE ===
```

## 🐛 Problemas Conhecidos

Se encontrar algum problema:

1. **Erro 401 ao fazer requests**: Faça logout e login novamente
2. **Sidebar não atualiza perfil ADMIN**: Limpe o localStorage e faça login novamente
3. **Página branca**: Verifique o console do navegador para erros

## 📞 Próximos Passos

Agora que a navegação está funcionando, você pode:
1. Criar categorias
2. Cadastrar produtos
3. Registrar lotes
4. Visualizar etiquetas
5. Fazer movimentações
6. Gerenciar usuários (se for ADMIN)
