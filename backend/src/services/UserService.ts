import bcrypt from 'bcryptjs';
import UserModel from '../models/User.model';
import { CreateUserInput } from '../schemas/user.schema';

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