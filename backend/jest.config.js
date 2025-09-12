// backend/jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Padrão para encontrar os arquivos de teste
  testMatch: ['**/__tests__/**/*.test.ts'],
  // Limpa os mocks entre cada teste para garantir isolamento
  clearMocks: true,
  // Indica ao Jest onde está nosso código-fonte
  roots: ['<rootDir>/src'],
};