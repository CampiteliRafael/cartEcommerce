import request from 'supertest';
import app from '../../app';
import * as UserService from '../../services/UserService';
import { signJwt } from '../../utils/jwt.utils';

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

// NOVO BLOCO DE TESTES PARA O LOGIN
describe('POST /api/users/login', () => {

  describe('Dado um e-mail e senha válidos', () => {
    it('deve retornar um token de acesso (JWT) e status 200', async () => {
      const loginInput = {
        email: 'usuario.existente@example.com',
        password: 'SenhaCorreta123!',
      };
      
      const mockAccessToken = 'mock-jwt-token-string';

      // Mockamos o serviço de login para simular um login bem-sucedido
      const loginServiceMock = jest
        .spyOn(UserService, 'loginUserService')
        // Quando o serviço for chamado com os dados corretos, ele deve resolver com um token
        .mockResolvedValue(mockAccessToken);

      const response = await request(app)
        .post('/api/users/login')
        .send(loginInput);
      
      // Esperamos uma resposta de sucesso
      expect(response.status).toBe(200);
      // O corpo da resposta deve conter o token de acesso
      expect(response.body).toEqual({ accessToken: mockAccessToken });
      // Verificamos se o serviço foi chamado corretamente
      expect(loginServiceMock).toHaveBeenCalledWith(loginInput);
    });
  });

  describe('Dado um e-mail ou senha inválidos', () => {
    it('deve retornar status 401 Unauthorized', async () => {
      const loginInput = {
        email: 'usuario.nao.existe@example.com',
        password: 'senha-errada',
      };

      // Mockamos o serviço para simular um erro de "credenciais inválidas"
      const loginServiceMock = jest
        .spyOn(UserService, 'loginUserService')
        .mockRejectedValue(new Error('Invalid email or password'));

      const response = await request(app)
        .post('/api/users/login')
        .send(loginInput);
      
      // Por segurança, NUNCA dizemos se foi o e-mail ou a senha que errou.
      // Apenas retornamos um erro genérico de "Não Autorizado".
      expect(response.status).toBe(401);
    });
  });

  describe('Quando falta um campo (e-mail or senha)', () => {
    it('deve retornar status 400 Bad Request', async () => {
        const response = await request(app)
          .post('/api/users/login')
          .send({ email: 'usuario.valido@example.com' }); // Enviando sem a senha

        // Este erro deve ser pego pela nossa validação do Zod, antes de chegar ao serviço
        expect(response.status).toBe(400);
    });
  });

  describe('GET /api/users/me', () => {

  describe('Dado que o usuário não está logado (não fornece token)', () => {
    it('deve retornar um erro 401 Unauthorized', async () => {
      const response = await request(app).get('/api/users/me');

      expect(response.status).toBe(401);
    });
  });

  describe('Dado que o usuário está logado (fornece um token válido)', () => {
    it('deve retornar os dados do usuário e um status 200', async () => {
      const userPayload = {
        userId: 'mock-user-id',
        name: 'John Doe',
        email: 'john.doe@example.com',
      };
      
      // Criamos um token válido para nosso teste usando nossa função utilitária
      const token = signJwt(userPayload);

      const response = await request(app)
        .get('/api/users/me')
        // Adicionamos o cabeçalho de autorização com o token
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      // O corpo da resposta deve conter os dados do usuário que estavam no token
      expect(response.body).toEqual(expect.objectContaining(userPayload));
    });
  });

  describe('Dado que o usuário fornece um token inválido ou malformado', () => {
    it('deve retornar um erro 401 Unauthorized', async () => {
        const invalidToken = 'this-is-not-a-valid-token';
        
        const response = await request(app)
          .get('/api/users/me')
          .set('Authorization', `Bearer ${invalidToken}`);

        expect(response.status).toBe(401);
    });
  });

});

});