import request from 'supertest';
import app from '../../app';
import * as UserService from '../../services/UserService';

describe('POST /api/users/register', () => {
  describe('Quando os dados são válidos', () => {
    it('deve chamar o serviço, criar o usuário e retornar 201 com os dados do usuário', async () => {
      const userInput = {
        name: 'Test User',
        email: 'valid-email@example.com',
        password: 'Password123!',
      };

      const serviceResponse = {
        _id: 'user-id-from-mock',
        name: 'Test User',
        email: 'valid-email@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const createUserServiceMock = jest
        .spyOn(UserService, 'createUserService')
        .mockResolvedValue(serviceResponse);

      const response = await request(app)
        .post('/api/users/register')
        .send(userInput);

      expect(response.status).toBe(201);
      expect(response.body._id).toBe(serviceResponse._id);

      expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
    });
  });


  describe('Quando os dados são inválidos', () => {
    it('deve retornar status 400 se o e-mail for inválido', async () => {
      const response = await request(app)
        .post('/api/users/register')
        .send({
          name: 'Test User',
          email: 'invalid-email',
          password: 'Password123!',
        });
      
      expect(response.status).toBe(400);
      expect(response.body[0].message).toEqual('Formato de e-mail inválido.');
    });

    const invalidPasswordCases = [
      { password: 'short', description: 'muito curta (mínimo 8 caracteres)' },
      { password: 'nouppercase1!', description: 'sem letra maiúscula' },
      { password: 'NOLOWERCASE1!', description: 'sem letra minúscula' },
      { password: 'NoNumber!', description: 'sem número' },
      { password: 'NoSpecial123', description: 'sem caractere especial' },
    ];

    test.each(invalidPasswordCases)(
      'deve retornar status 400 se a senha for $description',
      async ({ password }) => {
        const response = await request(app)
          .post('/api/users/register')
          .send({
            name: 'Test User',
            email: 'valid-email@example.com',
            password: password,
          });
        
        expect(response.status).toBe(400);
      }
    );

    it('deve retornar status 400 se algum campo obrigatório estiver faltando', async () => {
        const response = await request(app)
          .post('/api/users/register')
          .send({
            name: 'Test User',
            email: 'valid-email@example.com',
          });
        
        expect(response.status).toBe(400);
    });
  });
});