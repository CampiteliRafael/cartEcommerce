import request from 'supertest';
import app from '../../app';
import { signJwt } from '../../utils/jwt.utils';
import * as CartService from '../../services/cart.service';
import * as ProductService from '../../services/ProductService';

const userPayload = {
  userId: 'user-123',
  name: 'Test User',
  email: 'test@example.com',
};

const productPayload = {
  _id: 'product-abc',
  name: 'Produto Teste',
  price: 100,
  stock: 10,
};

const cartItemInput = {
  productId: 'product-abc',
  quantity: 2,
};

describe('Rotas do Carrinho', () => {

  describe('POST /api/cart/items', () => {
    
    it('deve retornar 401 Unauthorized se o usuário não estiver logado', async () => {
      const response = await request(app).post('/api/cart/items').send(cartItemInput);
      expect(response.status).toBe(401);
    });

    it('deve retornar 400 Bad Request se os dados do corpo forem inválidos', async () => {
      const token = signJwt(userPayload);
      const response = await request(app)
        .post('/api/cart/items')
        .set('Authorization', `Bearer ${token}`)
        .send({ productId: 'product-abc' });

      expect(response.status).toBe(400);
    });

    it('deve retornar 404 Not Found se o produto não existir', async () => {
      const token = signJwt(userPayload);
      jest.spyOn(ProductService, 'findProductByIdService').mockResolvedValue(null);

      const response = await request(app)
        .post('/api/cart/items')
        .set('Authorization', `Bearer ${token}`)
        .send({ productId: 'non-existent-product', quantity: 1 });
      
      expect(response.status).toBe(404);
    });
    
    it('deve adicionar um item ao carrinho e retornar 200 com o carrinho atualizado', async () => {
      const token = signJwt(userPayload);
      const mockCart = {
        _id: 'cart-xyz',
        user: userPayload.userId,
        items: [{ product: productPayload._id, quantity: 2, price: 100 }],
      };
      
      jest.spyOn(ProductService, 'findProductByIdService').mockResolvedValue(productPayload as any);
      const addItemToCartServiceMock = jest
        .spyOn(CartService, 'addItemToCartService')
        .mockResolvedValue(mockCart as any);

      const response = await request(app)
        .post('/api/cart/items')
        .set('Authorization', `Bearer ${token}`)
        .send(cartItemInput);

      expect(response.status).toBe(200);
      expect(response.body.items).toHaveLength(1);
      expect(response.body.items[0].quantity).toBe(2);
      expect(addItemToCartServiceMock).toHaveBeenCalledWith(userPayload.userId, cartItemInput.productId, cartItemInput.quantity);
    });
  });
});