# ShopSmart

Aplicação de e-commerce com front-end em Next.js e API em Node.js, Express e MongoDB. O projeto demonstra fluxos de catálogo e gerenciamento de carrinho, incluindo inclusão, alteração de quantidade e remoção de produtos.

## Funcionalidades do carrinho

- Adicionar produtos a partir da listagem ou da página de detalhes.
- Atualizar a quantidade respeitando o estoque disponível.
- Calcular subtotais e total do carrinho.
- Remover produtos e atualizar a interface.
- Sincronizar o carrinho com a API para usuários autenticados.

## Organização técnica

- **Front-end:** Next.js, React Context API, TypeScript e Tailwind CSS.
- **Back-end:** Node.js, Express, TypeScript e Mongoose.
- **Banco de dados:** MongoDB.
- **Autenticação:** JWT.

O contexto do carrinho gerencia o estado compartilhado da interface. Os serviços do front-end comunicam-se com as rotas da API, onde controllers e services processam as operações.

## Executar localmente

Requisitos: Node.js, npm e MongoDB.

### Back-end

```bash
cd backend
npm install
```

Configure o ambiente com base em `.env.example`. Quando disponível, carregue os dados de exemplo e inicie o servidor:

```bash
npm run seed
npm run dev
```

### Front-end

```bash
cd frontend
npm install
```

Configure a URL da API em `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Inicie o front-end:

```bash
npm run dev
```

A interface fica disponível em `http://localhost:3000`.
