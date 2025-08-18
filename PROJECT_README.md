# 🛒 E-commerce Cart - Sistema Completo

Sistema completo de carrinho de compras para e-commerce, desenvolvido com tecnologias modernas e arquitetura full-stack.

## 🏗️ Arquitetura

```
📁 Projeto
├── 📁 backend/          # API REST com Node.js + Express + MongoDB
├── 📁 frontend/         # Interface React + TypeScript + Tailwind CSS
└── 📄 docker-compose.yml # Orquestração de containers
```

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** + **Express** - Servidor e API REST
- **TypeScript** - Tipagem estática
- **MongoDB** + **Mongoose** - Banco de dados NoSQL
- **JWT** - Autenticação e autorização
- **Bcrypt** - Hash de senhas
- **Zod** - Validação de schemas
- **Jest** - Testes automatizados

### Frontend
- **React 19** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **Context API** - Gerenciamento de estado
- **Fetch API** - Comunicação com backend

## ⚡ Início Rápido

### Opção 1: Setup Manual

#### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
# Configure o .env com suas credenciais MongoDB
npm run dev
```

#### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

### Opção 2: Docker (Recomendado)
```bash
docker-compose up -d
```

### Opção 3: Scripts Automatizados

#### Windows:
```bash
cd backend
setup.bat
```

#### Linux/Mac:
```bash
cd backend
chmod +x setup.sh
./setup.sh
```

## 🔧 Configuração Detalhada

### Backend (.env)
```env
PORT=3001
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/ecommerce-cart
JWT_SECRET=sua-chave-secreta-super-segura
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
NODE_ENV=development
```

## 📊 Banco de Dados

### Popular com Dados de Exemplo
```bash
cd backend
npm run seed
```

### Estrutura das Collections
- **users** - Usuários do sistema
- **products** - Catálogo de produtos
- **carts** - Carrinhos de compras

## 🌐 Endpoints da API

### Autenticação
```http
POST /api/users/register    # Criar conta
POST /api/users/login       # Fazer login
GET  /api/users/me          # Dados do usuário (auth)
```

### Produtos
```http
GET /api/products           # Listar produtos
GET /api/products/:id       # Produto específico
```

### Carrinho (Autenticado)
```http
GET /api/cart               # Carrinho do usuário
POST /api/cart/items        # Adicionar item
PUT /api/cart/items/:id     # Atualizar quantidade
```

### Health Check
```http
GET /health                 # Status do servidor
```

## 🎯 Funcionalidades

### ✅ Implementadas
- [x] **Autenticação completa** (registro, login, logout)
- [x] **Catálogo de produtos** com filtros e busca
- [x] **Carrinho sincronizado** em tempo real
- [x] **Interface responsiva** para todos os dispositivos
- [x] **Validação de dados** no frontend e backend
- [x] **Tratamento de erros** robusto
- [x] **Estados de loading** e feedback visual
- [x] **Persistência de sessão** com JWT
- [x] **CORS configurado** para comunicação segura

### 🔄 Em Desenvolvimento
- [ ] **Checkout e pagamento**
- [ ] **Histórico de pedidos**
- [ ] **Perfil do usuário**
- [ ] **Avaliações de produtos**
- [ ] **Sistema de cupons**
- [ ] **Notificações push**

## 🧪 Testes

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## 📱 Como Usar

### 1. Acesse a Aplicação
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

### 2. Crie uma Conta
- Clique em "Criar Conta"
- Preencha nome, email e senha
- Faça login automaticamente

### 3. Navegue pelos Produtos
- Use filtros por categoria
- Busque por nome ou descrição
- Ordene por preço, nome ou estoque

### 4. Gerencie seu Carrinho
- Adicione produtos ao carrinho
- Ajuste quantidades
- Visualize total em tempo real
- Remova itens indesejados

## 🔒 Segurança

### Medidas Implementadas
- **Senhas hasheadas** com bcrypt
- **JWT tokens** com expiração
- **Validação de entrada** com Zod
- **CORS configurado** adequadamente
- **Middleware de autenticação** em rotas protegidas
- **Sanitização de dados** de entrada

## 🚀 Deploy

### Backend (Heroku/Railway/DigitalOcean)
```bash
npm run build
npm start
```

### Frontend (Vercel/Netlify)
```bash
npm run build
# Upload da pasta dist/
```

### Docker
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 📈 Performance

### Otimizações Implementadas
- **Lazy loading** de componentes
- **Debounce** em campos de busca
- **Cache** de requisições
- **Compressão** de assets
- **Minificação** de código

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de CORS**
   - Verifique `FRONTEND_URL` no backend
   - Confirme se cors está instalado

2. **MongoDB não conecta**
   - Verifique se MongoDB está rodando
   - Confirme `MONGO_URI` no .env

3. **JWT inválido**
   - Limpe localStorage do navegador
   - Faça login novamente

4. **Porta em uso**
   - Altere `PORT` no .env
   - Ou mate o processo: `lsof -ti:3001 | xargs kill`

### Logs de Debug
```bash
# Backend
npm run dev

# Frontend
npm run dev

# Docker
docker-compose logs -f
```

## 🤝 Contribuição

### Como Contribuir
1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

### Padrões de Código
- **ESLint** para JavaScript/TypeScript
- **Prettier** para formatação
- **Conventional Commits** para mensagens
- **Testes** obrigatórios para novas funcionalidades

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
