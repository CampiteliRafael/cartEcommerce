import bcrypt from 'bcryptjs';
import UserModel from '../models/User.model';
import { signJwt } from '../utils/jwt.utils';
import { CreateUserInput } from '../schemas/user.schema';
import { loginUserSchema } from '../schemas/user.schema';
import { z } from 'zod';

export async function createUserService(input: CreateUserInput) {
  const existingUser = await UserModel.findOne({ email: input.email }).lean();
  if (existingUser) {
    const error = new Error('E-mail já cadastrado.');
    (error as any).statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);

  try { 
    const newUser = await UserModel.create({ 
      name: input.name,
      email: input.email,
      password: hashedPassword,
    });
    
    const userObject = newUser.toObject();
    delete userObject.password;

    return {
      name: userObject.name,
      email: userObject.email,
      createdAt: userObject.createdAt,
      updatedAt: userObject.updatedAt,
    };
  } catch (dbError: any) {
    console.error("Erro ao criar usuário:", dbError);

    if (dbError.name === 'ValidationError') {
      const error = new Error('Dados de usuário inválidos.');
      (error as any).statusCode = 400;
      throw error;
    }
    
    if (dbError.code === 11000) {
      const error = new Error('E-mail já cadastrado.');
      (error as any).statusCode = 409;
      throw error;
    }
    
    const error = new Error('Erro ao criar usuário no banco de dados.');
    (error as any).statusCode = 500;
    throw error;
  }
}

type LoginInput = z.infer<typeof loginUserSchema>['body'];

export async function loginUserService(input: LoginInput) {
  const user = await UserModel.findOne({ email: input.email }).select('+password');
  
  if (!user) {
    const error = new Error('E-mail ou senha inválidos.');
    (error as any).statusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.password as string);
  if (!isPasswordValid) { 
    const error = new Error('E-mail ou senha inválidos.');
    (error as any).statusCode = 401;
    throw error;
  }

  const tokenPayload = {
    userId: user._id,
    name: user.name,
    email: user.email,
  }

  const accessToken = signJwt(tokenPayload);
  return accessToken;
}