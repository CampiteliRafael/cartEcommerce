import request from 'supertest';
import app from '../../app';
import * as ProductService from '../../services/ProductService';

describe('Rotas de Produto', () => {

  describe('GET /api/products', () => {
    it('deve retornar uma lista de produtos e status 200', async () => {
      const mockProducts = [
        { _id: 'prod1', name: 'Laptop', price: 5000, stock: 10 },
        { _id: 'prod2', name: 'Mouse', price: 150, stock: 30 },
      ];

      const findAllProductsServiceMock = jest
        .spyOn(ProductService, 'findAllProductsService')
        .mockResolvedValue(mockProducts as any);

      const response = await request(app).get('/api/products');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBe(2);
      expect(response.body[0].name).toBe('Laptop');
      expect(findAllProductsServiceMock).toHaveBeenCalled();
    });
  });

  describe('GET /api/products/:id', () => {
    it('deve retornar um único produto se o ID for válido', async () => {
      const productId = 'valid-product-id';
      const mockProduct = { _id: productId, name: 'Teclado Mecânico', price: 400 };

      const findProductByIdServiceMock = jest
        .spyOn(ProductService, 'findProductByIdService')
        .mockResolvedValue(mockProduct as any);

      const response = await request(app).get(`/api/products/${productId}`);

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Teclado Mecânico');
      expect(findProductByIdServiceMock).toHaveBeenCalledWith(productId);
    });

    it('deve retornar 404 Not Found se o produto não existir', async () => {
      const invalidProductId = 'invalid-id';
      
      const findProductByIdServiceMock = jest
        .spyOn(ProductService, 'findProductByIdService')
        .mockResolvedValue(null);

      const response = await request(app).get(`/api/products/${invalidProductId}`);

      expect(response.status).toBe(404);
    });
  });
});