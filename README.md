# ShopSmart - E-commerce com Carrinho de Compras

![ShopSmart Logo](https://via.placeholder.com/150x50?text=ShopSmart)

## Sobre o Projeto

ShopSmart é uma aplicação de e-commerce completa construída com uma arquitetura moderna de frontend e backend separados. O frontend é desenvolvido com Next.js e o backend com Node.js, Express e MongoDB.

Este projeto implementa as principais funcionalidades de uma loja online, com foco especial no sistema de carrinho de compras, que permite aos usuários adicionar, atualizar e remover produtos de forma dinâmica.

## Funcionalidades do Carrinho de Compras

O sistema de carrinho de compras do ShopSmart foi projetado para oferecer uma experiência de usuário fluida e responsiva, com as seguintes funcionalidades:

### 1. Adicionar Produtos ao Carrinho

- Os usuários podem adicionar produtos ao carrinho a partir da página de detalhes do produto ou da listagem de produtos
- É possível especificar a quantidade desejada (limitada pelo estoque disponível)
- Produtos já existentes no carrinho têm sua quantidade incrementada

### 2. Visualizar Carrinho

- Interface intuitiva que exibe todos os itens adicionados ao carrinho
- Informações detalhadas de cada produto (nome, imagem, preço unitário)
- Cálculo automático de subtotais por item e total geral
- Indicação da quantidade de itens no ícone do carrinho no cabeçalho

### 3. Atualizar Quantidade

- Controles de incremento/decremento para ajustar a quantidade de cada item
- Validação em tempo real para não exceder o estoque disponível
- Atualização automática dos subtotais e total geral

### 4. Remover Produtos

- Botão dedicado para remover completamente um item do carrinho
- Feedback visual durante o processo de remoção
- Atualização instantânea do estado do carrinho após a remoção

### 5. Persistência de Dados

- O carrinho é vinculado à conta do usuário e persiste entre sessões
- Sincronização automática entre dispositivos quando o usuário está logado
- Proteção contra perda de dados em caso de falhas de conexão

## Arquitetura do Carrinho

O sistema de carrinho foi implementado seguindo uma arquitetura de três camadas:

### Frontend (Next.js)

- **Contexto do Carrinho (`CartContext`)**: Gerencia o estado global do carrinho e fornece métodos para manipulá-lo
- **Componentes de UI**: Exibem os itens do carrinho e permitem interação do usuário
- **Serviços de API**: Comunicam-se com o backend para sincronizar o estado do carrinho

### Backend (Node.js + Express)

- **Controladores**: Processam as requisições relacionadas ao carrinho
- **Serviços**: Implementam a lógica de negócio para manipulação do carrinho
- **Rotas**: Definem os endpoints da API para operações do carrinho

### Banco de Dados (MongoDB)

- **Modelo de Carrinho**: Define a estrutura de dados para armazenar os carrinhos dos usuários
- **Relacionamentos**: Vincula o carrinho ao usuário e os itens aos produtos

## Fluxo de Dados do Carrinho

1. **Adição de Item**:
   - Usuário clica em "Adicionar ao Carrinho"
   - Frontend envia requisição POST para `/api/cart/items`
   - Backend valida o produto e atualiza o carrinho no banco de dados
   - Frontend atualiza o estado do carrinho com a resposta

2. **Atualização de Quantidade**:
   - Usuário ajusta a quantidade com os controles +/-
   - Frontend envia requisição PUT para `/api/cart/items/:productId`
   - Backend atualiza a quantidade no banco de dados
   - Frontend atualiza o estado do carrinho com a resposta

3. **Remoção de Item**:
   - Usuário clica em "Remover"
   - Frontend envia requisição DELETE para `/api/cart/items/:productId`
   - Backend remove o item do carrinho no banco de dados
   - Frontend atualiza o estado do carrinho removendo o item

## Tecnologias Utilizadas

### Frontend
- Next.js
- React Context API
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express
- TypeScript
- MongoDB com Mongoose

### Autenticação
- JWT (JSON Web Tokens)

## Como Executar o Projeto

### Pré-requisitos
- Node.js (v14 ou superior)
- MongoDB
- npm ou yarn

### Configuração do Backend
1. Navegue até a pasta do backend:
   ```
   cd backend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure as variáveis de ambiente criando um arquivo `.env` baseado no `.env.example`

4. Popule o banco de dados com produtos de exemplo:
   ```
   npm run seed
   ```

5. Inicie o servidor:
   ```
   npm run dev
   ```

### Configuração do Frontend
1. Navegue até a pasta do frontend:
   ```
   cd frontend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure as variáveis de ambiente criando um arquivo `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```

5. Acesse a aplicação em `http://localhost:3000`

## Considerações sobre Segurança e Desempenho

- Todas as operações do carrinho requerem autenticação
- Validações no frontend e backend para garantir integridade dos dados
- Otimização de desempenho com atualizações otimistas na UI
- Tratamento adequado de erros e feedback visual para o usuário