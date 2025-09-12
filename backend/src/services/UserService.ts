import bcrypt from 'bcryptjs';
import UserModel from '../models/User.model';
import { signJwt } from '../utils/jwt.utils';
import { CreateUserInput } from '../schemas/user.schema';
import { loginUserSchema } from '../schemas/user.schema';
import { z } from 'zod';

export async function createUserService(input: CreateUserInput) {
  const existingUser = await UserModel.findOne ({ email: input.email }).lean();
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
    const error = new Error('Erro ao criar usuário no banco de dados.');
    (error as any).statusCode = 500;
    throw error;
   }
}

// LOGIN USER SERVICE
type LoginInput = z.infer<typeof loginUserSchema>['body'];

export async function loginUserService(input: LoginInput) {
  const user = await UserModel.findOne({ email: input.email }).select('+password');
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.password as string);

  if (!isPasswordValid) { 
    throw new Error('Invalid email or password');
   }

   const tokenPayload = {
    userId: user._id,
    name: user.name,
    email: user.email,
   }

   const acessToken = signJwt(tokenPayload);
   return acessToken
}