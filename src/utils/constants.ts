/**
 * Constantes utilizadas na aplicação
 */

export const APP_NAME = 'ShopSmart';

// Mensagens de erro
export const ERROR_MESSAGES = {
  GENERIC: 'Ocorreu um erro. Por favor, tente novamente.',
  NETWORK: 'Erro de conexão. Verifique sua internet e tente novamente.',
  UNAUTHORIZED: 'Sessão expirada. Por favor, faça login novamente.',
  NOT_FOUND: 'O recurso solicitado não foi encontrado.',
  VALIDATION: 'Por favor, verifique os dados informados.',
  CART: {
    ADD_ITEM: 'Erro ao adicionar item ao carrinho.',
    UPDATE_ITEM: 'Erro ao atualizar quantidade do item.',
    REMOVE_ITEM: 'Erro ao remover item do carrinho.',
    EMPTY: 'Seu carrinho está vazio.',
  },
  AUTH: {
    LOGIN_FAILED: 'Email ou senha incorretos.',
    REGISTER_FAILED: 'Erro ao criar conta. Tente novamente.',
    REQUIRED: 'Você precisa estar logado para acessar esta página.',
  },
  PRODUCTS: {
    LOAD_FAILED: 'Erro ao carregar produtos.',
    NOT_FOUND: 'Produto não encontrado.',
  },
};

// Mensagens de sucesso
export const SUCCESS_MESSAGES = {
  CART: {
    ITEM_ADDED: 'Item adicionado ao carrinho!',
    ITEM_UPDATED: 'Quantidade atualizada!',
    ITEM_REMOVED: 'Item removido do carrinho!',
  },
  AUTH: {
    LOGIN_SUCCESS: 'Login realizado com sucesso!',
    REGISTER_SUCCESS: 'Conta criada com sucesso!',
    LOGOUT_SUCCESS: 'Logout realizado com sucesso!',
  },
};

// Rotas da aplicação
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  CART: '/cart',
  PRODUCT_DETAILS: (id: string) => `/product/${id}`,
  ACCOUNT: '/account',
  ORDERS: '/orders',
};

// Categorias de produtos
export const PRODUCT_CATEGORIES = [
  { id: 'todos', name: 'Todos os Produtos' },
  { id: 'eletronicos', name: 'Eletrônicos' },
  { id: 'moda', name: 'Moda' },
  { id: 'casa', name: 'Casa e Decoração' },
  { id: 'esportes', name: 'Esportes' },
  { id: 'beleza', name: 'Beleza' },
  { id: 'livros', name: 'Livros' },
];

// Opções de ordenação de produtos
export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Mais relevantes' },
  { value: 'price_asc', label: 'Menor preço' },
  { value: 'price_desc', label: 'Maior preço' },
  { value: 'newest', label: 'Mais recentes' },
  { value: 'bestseller', label: 'Mais vendidos' },
];

// Limites de paginação
export const PAGINATION = {
  ITEMS_PER_PAGE: 12,
  MAX_PAGES_SHOWN: 5,
};

// Configurações de armazenamento local
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user_data',
  CART: 'cart_data',
  THEME: 'user_theme',
  RECENTLY_VIEWED: 'recently_viewed',
};

// Configurações de API
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000, // 10 segundos
  RETRY_ATTEMPTS: 3,
};