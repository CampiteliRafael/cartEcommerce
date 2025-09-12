# Backend Setup - E-commerce Cart

Este é o backend do projeto de carrinho de e-commerce, desenvolvido com Node.js, Express, MongoDB e TypeScript.

## 🚀 Configuração Inicial

### 1. Instalar Dependências

```bash
cd backend
npm install
```

### 2. Instalar Dependência CORS (se necessário)

```bash
npm install cors
npm install --save-dev @types/cors
```

### 3. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Configuração do Servidor
PORT=3001
NODE_ENV=development

# Configuração do Banco de Dados MongoDB
MONGO_URI=mongodb://localhost:27017/ecommerce-cart

# Configuração JWT
JWT_SECRET=minha-chave-secreta-super-segura-para-jwt-tokens-2024
JWT_EXPIRES_IN=7d

# Configuração CORS
FRONTEND_URL=http://localhost:5173

# Configuração de Logs
LOG_LEVEL=info
```

### 4. Configurar MongoDB

#### Opção A: MongoDB Local
1. Instale o MongoDB Community Edition
2. Inicie o serviço MongoDB
3. Use a URI: `mongodb://localhost:27017/ecommerce-cart`

#### Opção B: MongoDB Atlas (Cloud)
1. Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crie um cluster gratuito
3. Obtenha a string de conexão
4. Substitua no `.env`: `MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce-cart`

#### Opção C: Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 5. Executar o Servidor

#### Desenvolvimento:
```bash
npm run dev
```

#### Produção:
```bash
npm run build
npm start
```

## 📊 Verificar se está Funcionando

### 1. Health Check
```bash
curl http://localhost:3001/health
```

Resposta esperada:
```json
{
  "status": "OK",
  "message": "Servidor funcionando corretamente",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

### 2. Testar Endpoints

#### Listar Produtos:
```bash
curl http://localhost:3001/api/products
```

#### Criar Usuário:
```bash
curl -X POST http://localhost:3001/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste User",
    "email": "teste@email.com",
    "password": "123456"
  }'
```

## 🗄️ Estrutura do Banco de Dados

### Collections Criadas Automaticamente:

1. **users** - Usuários do sistema
2. **products** - Catálogo de produtos
3. **carts** - Carrinhos de compras

### Dados Iniciais (Opcional)

Para popular o banco com produtos de exemplo, você pode usar o MongoDB Compass ou criar um script de seed.

## 🔧 Scripts Disponíveis

```json
{
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "test": "jest"
}
```

## 🌐 Endpoints da API

### Autenticação
- `POST /api/users/register` - Criar conta
- `POST /api/users/login` - Fazer login
- `GET /api/users/me` - Dados do usuário (autenticado)

### Produtos
- `GET /api/products` - Listar produtos
- `GET /api/products/:id` - Produto específico

### Carrinho (Requer Autenticação)
- `GET /api/cart` - Carrinho do usuário
- `POST /api/cart/items` - Adicionar item
- `PUT /api/cart/items/:productId` - Atualizar quantidade

## 🔒 Segurança

### JWT Configuration
- Tokens expiram em 7 dias (configurável)
- Chave secreta deve ser alterada em produção
- Tokens são validados em rotas protegidas

### CORS
- Configurado para aceitar requisições do frontend
- Credenciais habilitadas para cookies/auth

## 🐛 Troubleshooting

### Problemas Comuns:

1. **Erro de conexão MongoDB**:
   ```
   ERRO: MONGO_URI não definida no arquivo .env
   ```
   - Verifique se o arquivo `.env` existe
   - Confirme se `MONGO_URI` está definida

2. **Erro CORS**:
   ```
   Access to fetch blocked by CORS policy
   ```
   - Verifique se `FRONTEND_URL` está correto no `.env`
   - Confirme se o cors está instalado: `npm install cors`

3. **JWT Secret não definido**:
   ```
   JWT_SECRET is required
   ```
   - Adicione `JWT_SECRET` no arquivo `.env`

4. **Porta já em uso**:
   ```
   Error: listen EADDRINUSE: address already in use :::3001
   ```
   - Altere a `PORT` no `.env` ou mate o processo na porta 3001

### Logs de Debug:

```bash
# Ver logs em tempo real
npm run dev

# Verificar se MongoDB está conectado
# Deve aparecer: "MongoDB conectado com sucesso!"

# Verificar se servidor iniciou
# Deve aparecer: "Servidor rodando na porta 3001"
```

## 📝 Variáveis de Ambiente Explicadas

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `PORT` | Porta do servidor | `3001` |
| `NODE_ENV` | Ambiente de execução | `development` |
| `MONGO_URI` | String de conexão MongoDB | `mongodb://localhost:27017/ecommerce-cart` |
| `JWT_SECRET` | Chave secreta para JWT | `minha-chave-super-secreta` |
| `JWT_EXPIRES_IN` | Tempo de expiração do token | `7d` |
| `FRONTEND_URL` | URL do frontend para CORS | `http://localhost:5173` |
| `LOG_LEVEL` | Nível de logs | `info` |
